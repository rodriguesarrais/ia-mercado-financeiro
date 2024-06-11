from flask import Flask, request, jsonify, render_template
import os
import base64
import time

app = Flask(__name__)

# Caminho para salvar as imagens
IMAGE_FOLDER = os.path.join(os.getcwd(), 'training')
if not os.path.exists(IMAGE_FOLDER):
    os.makedirs(IMAGE_FOLDER)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    data = request.json
    img_data = data['image']
    student_name = data['student'].replace(' ', '_')

    img_data = img_data.replace('data:image/png;base64,', '')
    img_data = base64.b64decode(img_data)
    
    file_name = f"{student_name}.png"
    file_path = os.path.join(IMAGE_FOLDER, file_name)

    with open(file_path, 'wb') as f:
        f.write(img_data)
    
    return jsonify({"message": "Image saved successfully", "fileName": file_name})

if __name__ == '__main__':
    app.run(debug=True)
