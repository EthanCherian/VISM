import parseXML  # Import the parseXML module
import subprocess
import os

def convert_files(file_path):
    # Assuming file_path is the full path to the uploaded .mscz file
    # Extract the file name from the path
    filename = os.path.basename(file_path)
    
    # Define output paths
    musicxml_output_path = "output/" + filename[:-5] + ".musicxml"
    pdf_output_path = "output/" + filename[:-5] + ".pdf"
    brf_output_path = "output/" + filename[:-5] + ".brf"

    # Convert .mscz to .musicxml
    print("Creating MusicXML...")
    subprocess.run("MuseScore4.exe " + file_path + " -o " + musicxml_output_path, shell=True)
    
    # Convert .mscz to .pdf
    print("Creating PDF...")
    subprocess.run("MuseScore4.exe " + file_path + " -o " + pdf_output_path, shell=True)
    
    # Call the function from parseXML.py to process the MusicXML file
    parseXML.convertMusicXML(musicxml_output_path, brf_output_path)