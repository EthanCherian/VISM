from flask import Flask, request, send_from_directory, render_template, redirect, url_for
import os
from main import convert_files

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
OUTPUT_FOLDER = 'output'
ALLOWED_EXTENSIONS = {'mscz'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload and output directories exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        if file and allowed_file(file.filename):
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(filepath)
            convert_files(filepath)  # Call the conversion function from main.py
            return redirect(url_for('list_files'))

    return render_template('upload.html')  # A simple HTML form for file upload

@app.route('/downloads/', methods=['GET'])
def list_files():
    files = os.listdir(OUTPUT_FOLDER)
    return render_template('list_files.html', files=files)  # List available files for download

@app.route('/downloads/<filename>')
def download_file(filename):
    return send_from_directory(OUTPUT_FOLDER, filename)

if __name__ == '__main__':
    app.run(debug=True)