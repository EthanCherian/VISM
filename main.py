from parseXML import temp
import subprocess
import os

def convertInput():
    print("in convertInput()")
    for filename in os.scandir("input"):
        if filename.is_file():
            print(filename.name)
            subprocess.run("MuseScore4.exe input/" + filename.name + " -o middle/" + filename.name[:-5] + ".musicxml", shell=True)
            print("Created middle/" + filename.name[:-5] + ".musicxml")
    print("Done convertInput()")

def convertMusicXML():
    print("in convertMusicXML()")
    for filename in os.scandir("middle"):
        if filename.is_file():
            print(filename.name)
    print("Done convertMusicXML()")
    

def main():
    print("Hello World")
    convertInput()
    print("Onto the next")
    convertMusicXML()

main()