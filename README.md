# image-classification-project

This is a Flask-based API for image classification using a pre-trained ResNet model from the Hugging Face Transformers library. It allows users to upload images and receive predictions about the contents of those images.

## Features

- Upload images for classification
- Returns predicted class and confidence level
- Supports CORS for cross-origin requests

## Requirements

- Python 3.x
- Flask
- PyTorch
- Pillow
- Transformers
- torchvision
- Flask-CORS

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/image-classification-api.git
   cd image-classification-api

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`

3. Install the required packages:
   ```bash
   pip install Flask torch torchvision transformers pillow flask-cors

## Usage

1. Run the Flask application:
   ```bash
   python3 backend.py

2. The API will be available at http://127.0.0.1:5000.

3. To classify an image, send a POST request to the /classify endpoint with the image file included in the form-data under the key image. You can use tools like Postman or cURL to test the API. Here’s an example using cURL:
   'curl -X POST -F "image=@path_to_your_image.jpg" http://127.0.0.1:5000/classify'

## Acknowledgments

- Made by [Akbarali Nabiev](https://github.com/akbaralinabiev) and [Bekhzod Allaev](https://github.com/bekhzodallaev) for the Machine Learning class project.
- Hugging Face Transformers: A library providing state-of-the-art machine learning models.
- PyTorch: An open-source machine learning library used for tensor computation and deep learning.
- Flask: A lightweight WSGI web application framework for Python.
