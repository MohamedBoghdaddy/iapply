# text_extraction.py
import textract
from docx import Document
from pdfminer.high_level import extract_text as extract_pdf_text
from pdfminer.pdfparser import PDFSyntaxError

def parse_pdf(file_path):
    try:
        txt = extract_pdf_text(file_path).strip()
        if not txt:
            raise ValueError("Empty PDF content")
        return txt
    except FileNotFoundError:
        raise FileNotFoundError("File not found or path is incorrect")
    except PDFSyntaxError:
        raise PDFSyntaxError("Not a valid PDF file")

def parse_docx(file_path):
    try:
        doc = Document(file_path)
        txt = "\n".join([paragraph.text for paragraph in doc.paragraphs]).strip()
        if not txt:
            raise ValueError("Empty DOCX content")
        return txt
    except FileNotFoundError:
        raise FileNotFoundError("File not found or path is incorrect")
    except Exception as e:
        raise Exception(f"Error parsing DOCX file: {e}")

def parse_doc(file_path):
    try:
        txt = textract.process(file_path).decode("utf-8").strip()
        if not txt:
            raise ValueError("Empty DOC content")
        return txt
    except FileNotFoundError:
        raise FileNotFoundError("File not found or path is incorrect")
    except Exception as e:
        raise Exception(f"Error parsing DOC file: {e}")

def extract_text(file_path):
    if file_path.endswith(".pdf"):
        return parse_pdf(file_path)
    elif file_path.endswith(".docx"):
        return parse_docx(file_path)
    elif file_path.endswith(".doc"):
        return parse_doc(file_path)
    else:
        raise ValueError("Unsupported file format")
