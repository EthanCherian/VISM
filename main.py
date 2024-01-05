import parseXML
import subprocess
import os

def convertInput():
    # scan input to find .mscz files
    for filename in os.scandir("input"):
        if filename.is_file():
            # use MuseScore API to convert .mscz to .musicxml
            # important note: these lines work only on Windows, Mac/Linux do something else
                # shouldn't matter, since on the cloud, I can pick use a Linux VM and change these lines to what they should be on Linux, but these work on my Windows machine for testing
            subprocess.run("MuseScore4.exe input/" + filename.name + " -o middle/" + filename.name[:-5] + ".musicxml", shell=True)
            
            # use MuseScore API to convert .mscz to .pdf, as bonus :)
            subprocess.run("MuseScore4.exe input/" + filename.name + " -o output/" + filename.name[:-5] + ".pdf", shell=True)
            pass

def main():
    print("Beginning by converting MSCZ to MusicXML")
    convertInput()
    print("Now, parsing MusicXML")
    parseXML.convertMusicXML()

main()