import os
from xml.dom.minidom import parse

def is_rest(note):
    return len(note.getElementsByTagName("rest")) > 0

def getNotes(dom):
    notes = dom.getElementsByTagName("note")
    notes = filter(lambda note: not is_rest(note), notes)

    intervalsArr = []
    notesArr = []
    alterArr = []
    durationArr = []

    for note in notes:
        stepNode = note.getElementsByTagName("step")[0]
        notesArr.append(str(stepNode.childNodes[0].nodeValue))

        stepNode = note.getElementsByTagName("octave")[0]
        intervalsArr.append(str(stepNode.childNodes[0].nodeValue))

        alters = note.getElementsByTagName("alter")
        if len(alters) == 0:
            alterArr.append('0')
        else:
            alterArr.append(str(alters[0].childNodes[0].nodeValue))
        
        stepNode = note.getElementsByTagName("duration")[0]
        durationArr.append(str(stepNode.childNodes[0].nodeValue))
    
    return zip(notesArr, intervalsArr, alterArr, durationArr)

def convertMusicXML():
    for filename in os.scandir("middle"):
        if filename.is_file():
            dom = parse("middle/" + filename.name)

            totalNotesArr = getNotes(dom)
            
            for n in totalNotesArr:
                print(n)