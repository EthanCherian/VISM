from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os

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

@app.route('/api/data')
def get_data(): 
    return jsonify({ "message": "Hello World!" })

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
    
@app.route('/')
def convert_mscz():
    pass

if __name__ == '__main__':
    app.run(debug=True)
