from flask import Flask, request, jsonify, send_from_directory, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename
import subprocess
import os
import zipfile
import io

from utils.parseXML import convertMusicXML
from utils.dots_music import convert_dot_list

app = Flask(__name__)
CORS(app)

# ------------------- SETTINGS + INITIALIZATION -------------------
app.config['UPLOAD_FOLDER'] = 'uploads/'                # folder for uploaded files
app.config['TEMP_FOLDER'] = 'temp/'                     # folder for intermediate files
app.config['OUTPUT_FOLDER'] = 'output/'                 # folder for output files
app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000     # 16 MB limit for uploads

# create folders if they don't exist
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])
if not os.path.exists(app.config['TEMP_FOLDER']):
    os.makedirs(app.config['TEMP_FOLDER'])
if not os.path.exists(app.config['OUTPUT_FOLDER']):
    os.makedirs(app.config['OUTPUT_FOLDER'])
# ----------------- END SETTINGS + INITIALIZATION -----------------


# ------------------------- MSCZ_BRAILLE --------------------------
# check if file is allowed
def is_mscz(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() == 'mscz'

@app.route('/upload', methods=['POST'])
def upload_files():
    if 'files' not in request.files:
        return jsonify({ 'message': 'No file part in the request' }), 400
    files = request.files.getlist('files')

    for file in files:
        if file and is_mscz(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        else:
            return jsonify({ 'message': 'Invalid file type' }), 400
        
    return jsonify({ 'message': f'{len(files)} files uploaded successfully' }), 200

@app.route('/convert/mscz', methods=['POST'])
def convert_mscz():
    filenames = request.json.get('filenames', [])
    results = []

    for filename in filenames:
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        xmlpath = os.path.join(app.config['TEMP_FOLDER'], filename[:-5] + '.musicxml')
        try: 
            result = subprocess.run("MuseScore4.exe " + filepath + " -o " + xmlpath, shell=True)
            results.append({ 'filename': filename, 'result': xmlpath, 'status': 'success' })
        except subprocess.CalledProcessError as e:
            results.append({ 'filename': filename, 'error': str(e) })

    return jsonify({ 'results': results }), 200

@app.route('/convert/xml', methods=['POST'])
def convert_xml():
    filenames = request.json.get('filenames', [])
    results = []

    for filename in filenames:
        xmlpath = os.path.join(app.config['TEMP_FOLDER'], filename + ".musicxml")
        brfpath = os.path.join(app.config['OUTPUT_FOLDER'], filename + ".brf")
        try:
            convertMusicXML(xmlpath, brfpath)
            results.append({ 'filename': filename, 'result': brfpath, 'success': True })
        except Exception as e:
            results.append({ 'filename': filename, 'error': str(e), 'success': False })

    return jsonify({ 'results': results }), 200

@app.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    print("Downloading file: " + filename)
    return send_from_directory(app.config['OUTPUT_FOLDER'], filename)

@app.route('/download/multiple', methods=['POST'])
def download_multiple_files():
    file_names = request.json.get('filenames', [])
    print("Downloading multiple files: ", file_names)

    # Create a byte stream to hold the ZIP file
    zip_buffer = io.BytesIO()
    
    with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
        for filename in file_names:
            file_path = os.path.join(app.config['OUTPUT_FOLDER'], filename)
            if os.path.exists(file_path):
                # Add file to zip
                zip_file.write(file_path, arcname=filename)
            else:
                print(f"File not found: {filename}")

    # Move the pointer of the BytesIO object to the start
    zip_buffer.seek(0)

    # Send the ZIP file
    return send_file(zip_buffer, mimetype='application/zip', as_attachment=True, download_name="braille_files.zip")


# ---------------------- INTERACTIVE_BRAILLE ----------------------
@app.route('/dots_to_music', methods=['POST'])
def dots_to_music():
    dots_bool = request.json.get('dots', [])
    # print(dots_bool)
    
    result = convert_dot_list(dots_bool)
    print(result)
    return result

@app.route('/music_to_dots', methods=['POST'])
def music_to_dots():
    pass

if __name__ == '__main__':
    app.run(debug=True)
