from flask import Flask, request, jsonify
import torch
from PIL import Image
from flask_cors import CORS
from transformers import ResNetForImageClassification
from torchvision import transforms

app = Flask(__name__)
CORS(app)

model = ResNetForImageClassification.from_pretrained('microsoft/resnet-50')
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)  # type: ignore

preprocess = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225]),
])


@app.route('/')
def index():
    return "Image Classification API"


@app.route('/classify', methods=['POST'])
def classify():
    if 'image' not in request.files or request.files['image'].filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        image = Image.open(request.files['image'].stream).convert("RGB")
        inputs = preprocess(image).unsqueeze(0).to(device)  # type: ignore
        outputs = model(inputs)
        logits = outputs.logits
        predicted_class_idx = logits.argmax(-1).item()
        predicted_class = model.config.id2label[predicted_class_idx]
        confidence = torch.nn.functional.softmax(
            logits, dim=1)[0][predicted_class_idx].item()

        if confidence < 0.6:
            return jsonify({'predicted_class': 'Class not predicted due to low confidence.'})

        return jsonify({'predicted_class': predicted_class})

    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)
