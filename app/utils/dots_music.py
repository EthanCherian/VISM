from typing import List
from utils.constants import DURATIONS_POSITIONS, DURATIONS_MUSIC, NOTES_MUSIC, ACCIDENTALS_MUSIC, DURATIONS_DOT, NOTES_DOT, ACCIDENTALS_DOT, RESTS_DOT

def separate_list(dot_list_bool: List[bool]):
    # get IDs of active dots
    dot_list = [i + 1 for i, x in enumerate(dot_list_bool) if x]
    # print(f"Full list: {dot_list}")

    # separate dots denoting duration from those denoting note
    duration_dots = [num for num in dot_list if num in DURATIONS_POSITIONS]
    note_dots = [num for num in dot_list if num not in DURATIONS_POSITIONS]
    # print(f"Duration: {duration_dots}")
    # print(f"Note: {note_dots}\n")

    return dot_list, duration_dots, note_dots

def convert_dot_list(dot_list_bool: List[bool]):
    dot_list, duration_dots, note_dots = separate_list(dot_list_bool)

    # get index of each (duration, note, accidental, rest)

    duration_index = None
    try:
        duration_index = DURATIONS_DOT.index(duration_dots)
    except ValueError as e:
        # print("No duration found")
        pass

    note_index = None
    try:
        note_index = NOTES_DOT.index(note_dots)
    except ValueError as e:
        # print("No note found")
        pass
        
    accidental_index = None
    try:
        accidental_index = ACCIDENTALS_DOT.index(dot_list)
    except ValueError as e:
        # print("No accidental found")
        pass
    
    rest_index = None
    try:
        rest_index = RESTS_DOT.index(dot_list)
    except ValueError as e:
        # print("No rest found")
        pass

    # get values at indices
    duration = None
    note = None
    accidental = None
    rest = None

    if note_index is not None:
        note = NOTES_MUSIC[note_index]
        print(f"Note: {note}")

    if rest_index is not None:
        rest = DURATIONS_MUSIC[rest_index]
        print(f"Rest: {rest}")

    if duration_index is not None and note_index is not None:
        duration = DURATIONS_MUSIC[duration_index]
        print(f"Duration: {duration}")

    if accidental_index is not None:
        accidental = ACCIDENTALS_MUSIC[accidental_index]
        rest = None
        duration = None
        note = None
        print(f"Accidental: {accidental}")
    
    return {
        "duration": duration,
        "note": note,
        "accidental": accidental,
        "rest": rest
    }