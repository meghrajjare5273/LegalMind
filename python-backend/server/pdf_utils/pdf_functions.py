import fitz  # PyMuPDF

def extract_text_from_pdf(file_content: bytes) -> str:
    """
    Extracts text from a PDF file using Fitz (PyMuPDF).
    
    Args:
        file_content (bytes): The content of the PDF file.
    
    Returns:
        str: The extracted text from the PDF.
    """
    doc = fitz.open("pdf", file_content)
    text = ""
    for page in doc:
        text += page.get_text()
    return text