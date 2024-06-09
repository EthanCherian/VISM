# ------------------- Constants required for final Braille creation -------------------
# ASCII representations of notes
ASCII_CODES = [ 'C1', 'C2', 'C4', 'C8',                 # notes + durations
                'D1', 'D2', 'D4', 'D8', 
                'E1', 'E2', 'E4', 'E8', 
                'F1', 'F2', 'F4', 'F8', 
                'G1', 'G2', 'G4', 'G8', 
                'A1', 'A2', 'A4', 'A8', 
                'B1', 'B2', 'B4', 'B8',
                '1', '2', '3', '4', '5', '6', '7',      # octaves
                '-1', '0', '1' ]                        # accidentals

# Braille representations of notes
BRAILLES = [    '⠙','⠹','⠝','⠽',                # C1-8
                '⠑','⠱','⠕','⠵',                # D1-8
                '⠋','⠫','⠏','⠯',                # E1-8
                '⠛','⠻','⠟','⠿',                # F1-8
                '⠓','⠳','⠗','⠷',                # G1-8
                '⠊','⠪','⠎','⠮',                # A1-8
                '⠚','⠺','⠞','⠾',                # B1-8
                '⠈','⠘','⠸','⠐','⠨','⠰','⠠',   # octave marks
                '⠣','','⠩' ]                     # accidentals
BRAILLE_DOT = '⠄'                               # dot

# map ASCII codes to Braille codes
ASCII_TO_BRAILLE = {ASCII_CODES[i]: BRAILLES[i] for i in range(len(ASCII_CODES))}
# ----------------- End constants required for final Braille creation -----------------