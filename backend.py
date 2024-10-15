
# from flask import Flask, request, jsonify
# from werkzeug.utils import secure_filename
# import os
# from transformers import VisionEncoderDecoderModel, ViTImageProcessor, AutoTokenizer
# import torch
# from PIL import Image
# from flask_cors import CORS

# # Initialize the Flask application
# app = Flask(__name__)
# CORS(app)

# # Configure the upload folder
# UPLOAD_FOLDER = './uploads'
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# # Create the upload folder if it doesn't exist
# if not os.path.exists(UPLOAD_FOLDER):
#     os.makedirs(UPLOAD_FOLDER)


# # Load the pre-trained model and tokenizer

# model = VisionEncoderDecoderModel.from_pretrained(
#     "nlpconnect/vit-gpt2-image-captioning")
# feature_extractor = ViTImageProcessor.from_pretrained(
#     "nlpconnect/vit-gpt2-image-captioning")
# tokenizer = AutoTokenizer.from_pretrained(
#     "nlpconnect/vit-gpt2-image-captioning")

# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
# model.to(device)

# max_length = 30
# num_beams = 10
# gen_kwargs = {"max_length": max_length, "num_beams": num_beams}


# def predict_caption(image_path):
#     i_image = Image.open(image_path)
#     if i_image.mode != "RGB":
#         i_image = i_image.convert(mode="RGB")

#     pixel_values = feature_extractor(
#         images=[i_image], return_tensors="pt").pixel_values
#     pixel_values = pixel_values.to(device)

#     output_ids = model.generate(pixel_values, **gen_kwargs)

#     preds = tokenizer.batch_decode(output_ids, skip_special_tokens=True)
#     print(f"Generated caption: {preds[0]}")  # Debugging line
#     return preds[0]


# @app.route('/')
# def index():
#     return "Image Captioning API"


# @app.route('/caption', methods=['POST'])
# def caption():
#     if 'image' not in request.files:
#         return jsonify({'error': 'No image part'}), 400
#     file = request.files['image']
#     if file.filename == '':
#         return jsonify({'error': 'No selected file'}), 400
#     if file:
#         filename = secure_filename(file.filename)
#         file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#         file.save(file_path)

#         print(f"Image saved to {file_path}") 

#         caption = predict_caption(file_path)
#         print(f"Caption sent to client: {caption}")
#         return jsonify({'caption': caption})


# if __name__ == '__main__':
#     app.run(debug=True)


from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
import torch
from PIL import Image
from flask_cors import CORS
from transformers import ViTImageProcessor, ViTForImageClassification

# Initialize the Flask application
app = Flask(__name__)
CORS(app)

# Configure the upload folder
UPLOAD_FOLDER = './uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Create the upload folder if it doesn't exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Load the pre-trained ViT model and processor
processor = ViTImageProcessor.from_pretrained('google/vit-base-patch16-224')
model = ViTForImageClassification.from_pretrained('google/vit-base-patch16-224')

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

def predict_class(image_path):
    i_image = Image.open(image_path)
    if i_image.mode != "RGB":
        i_image = i_image.convert(mode="RGB")

    # Process the image
    inputs = processor(images=i_image, return_tensors="pt").to(device)

    # Make prediction
    with torch.no_grad():
        outputs = model(**inputs)

    # Get the predicted class index
    logits = outputs.logits
    predicted_class_idx = logits.argmax(-1).item()

    # Map the predicted class index to class label
    predicted_class_label = model.config.id2label[predicted_class_idx]
    return predicted_class_label

@app.route('/')
def index():
    return "Image Classification API"


@app.route('/classify', methods=['POST'])
def classify():
    if 'image' not in request.files:
        return jsonify({'error': 'No selected file'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        image = Image.open(file.stream)
        inputs = processor(images=image, return_tensors="pt").to(device)
        outputs = model(**inputs)
        logits = outputs.logits
        predicted_class_idx = logits.argmax(-1).item()
        predicted_class = model.config.id2label[predicted_class_idx]
        confidence = torch.nn.functional.softmax(
            logits, dim=1)[0][predicted_class_idx].item()

        # Set a threshold for prediction confidence
        confidence_threshold = 0.6  # Adjust as needed
        if confidence < confidence_threshold:
            return jsonify({'predicted_class': 'Class not predicted due to low confidence.'})

        return jsonify({'predicted_class': predicted_class})

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
