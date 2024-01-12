import os
from xml.dom.minidom import parse

# ------------------- Constants required for final Braille creation -------------------
# ASCII representations of notes
asciicodes = [  'C1', 'C2', 'C4', 'C8',                 # notes + durations
                'D1', 'D2', 'D4', 'D8', 
                'E1', 'E2', 'E4', 'E8', 
                'F1', 'F2', 'F4', 'F8', 
                'G1', 'G2', 'G4', 'G8', 
                'A1', 'A2', 'A4', 'A8', 
                'B1', 'B2', 'B4', 'B8',
                '1', '2', '3', '4', '5', '6', '7',      # octaves
                '-1', '0', '1' ]                        # accidentals

# Braille representations of notes
brailles = [    '⠙','⠹','⠝','⠽',                # C1-8
                '⠑','⠱','⠕','⠵',                # D1-8
                '⠋','⠫','⠏','⠯',                # E1-8
                '⠛','⠻','⠟','⠿',                # F1-8
                '⠓','⠳','⠗','⠷',                # G1-8
                '⠊','⠪','⠎','⠮',                # A1-8
                '⠚','⠺','⠞','⠾',                # B1-8
                '⠈','⠘','⠸','⠐','⠨','⠰','⠠',   # octave marks
                '⠣','','⠩' ]                     # accidentals
braille_dot = '⠄'                               # dot

# map ASCII codes to Braille codes
convert = {asciicodes[i]: brailles[i] for i in range(len(asciicodes))}
# ----------------- End constants required for final Braille creation -----------------

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
    print("Parsing MusicXML...")
    dom = parse(musicxml_path)

    totalNotesArr = getNotes(dom)
    
    print("Writing Braille...")
    # open braille output file
    with open(brf_output_path, "w+", encoding="utf-8") as f:
        measures = 0
        # write each note to braille
        for note, octave, alter, duration in totalNotesArr:
            # braille sheet music written in this order
            f.write(convert[octave])
            f.write(convert[alter])

            # need to get ASCII code in form A2, F8, etc. for conversion using dictionary
            # dotted notes have a duration of 3, 6, 12, etc., so apply braille dot separately
            dur = int(duration)
            if is_power_of_2(dur):
                f.write(convert[note + str(duration)])
            else:
                newdur = int(dur * 2 / 3)
                f.write(convert[note + str(newdur)])
                f.write(braille_dot)

            # write a new line every measure
            measures += dur
            if measures % 16 == 0:          # measures counted in intervals of 16
                f.write('\n')