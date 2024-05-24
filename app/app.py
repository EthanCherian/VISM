from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
import subprocess
import os

from utils.parseXML import convertMusicXML

app = Flask(__name__)
CORS(app)
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

if __name__ == '__main__':
    app.run(debug=True)
