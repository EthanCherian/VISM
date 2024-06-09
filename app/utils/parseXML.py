from xml.dom.minidom import parse
from utils.constants import BRAILLE_DOT, ASCII_TO_BRAILLE

def is_rest(note):
    return len(note.getElementsByTagName("rest")) > 0

def getNotes(dom):
    # get notes from musicxml (ignore rests for now)
    notes = dom.getElementsByTagName("note")
    notes = filter(lambda note: not is_rest(note), notes)

    intervalsArr = []
    notesArr = []
    alterArr = []
    durationArr = []

    # isolate aspects of each note and consolidate into arrays
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
    
    # return a tuple for each note
    return zip(notesArr, intervalsArr, alterArr, durationArr)

# used to determine when a dotted note is present
def is_power_of_2(n):
    # powers of 2 are greater than 0 and only have 1 bit set
    return n > 0 and (n & (n - 1)) == 0

def convertMusicXML(musicxml_path, brf_output_path):
    print(f"Parsing MusicXML {musicxml_path}")
    dom = parse(musicxml_path)

    totalNotesArr = getNotes(dom)
    
    print(f"Writing Braille {brf_output_path}")
    # open braille output file
    with open(brf_output_path, "w+", encoding="utf-8") as f:
        measures = 0
        # write each note to braille
        for note, octave, alter, duration in totalNotesArr:
            # braille sheet music written in this order
            f.write(ASCII_TO_BRAILLE[octave])
            f.write(ASCII_TO_BRAILLE[alter])

            # need to get ASCII code in form A2, F8, etc. for conversion using dictionary
            # dotted notes have a duration of 3, 6, 12, etc., so apply braille dot separately
            dur = int(duration)
            if is_power_of_2(dur):
                f.write(ASCII_TO_BRAILLE[note + str(duration)])
            else:
                newdur = int(dur * 2 / 3)
                f.write(ASCII_TO_BRAILLE[note + str(newdur)])
                f.write(BRAILLE_DOT)

            # write a new line every measure
            measures += dur
            if measures % 16 == 0:          # measures counted in intervals of 16
                f.write('\n')