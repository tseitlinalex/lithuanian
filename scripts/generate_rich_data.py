import json
import fitz

# Load PDFs
doc1 = fitz.open('/tmp/file_attachments/Books/Sekmes_1_knyga_Kalba.pdf')
doc2 = fitz.open('/tmp/file_attachments/Books/Sekmes_2_knyga_Kalba.pdf')

print("Generating rich lessons data...")
