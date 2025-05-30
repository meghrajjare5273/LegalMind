from fastapi import FastAPI, UploadFile, File
from pdf_utils.pdf_functions import extract_text_from_pdf

app = FastAPI()

@app.post("/extract_text")
async def extract_text(file: UploadFile = File(...)):
    """
    Endpoint to upload a PDF file and extract its text.
    
    Args:
        file (UploadFile): The uploaded PDF file.
    
    Returns:
        dict: The extracted text or an error message.
    """
    if file.content_type != "application/pdf":
        return {"error": "File is not a PDF"}
    
    content = await file.read()
    try:
        text = extract_text_from_pdf(content)
        return {"text": text}
    except Exception as e:
        return {"error": str(e)}
    

async def analyze_contract(contract: ContractInput):
    text = contract.text
    # Split text into sentences
    sentences = re.split(r'(?<=[.!?])\s+', text)
    analysis = []
    
    # Analyze each sentence for risks
    for sentence in sentences:
        for keyword in RISK_KEYWORDS:
            if keyword.lower() in sentence.lower():
                analysis.append({
                    "sentence": sentence,
                    "risk": f"Potential risk related to {keyword}",
                    "explanation": f"This sentence mentions '{keyword}', which can be a critical term in contracts.",
                    "negotiation_tip": f"Consider negotiating the terms related to {keyword} to minimize potential liabilities."
                })
                break
    
    # Handle case where no risks are found
    if not analysis:
        raise HTTPException(status_code=404, detail="No risks identified")
    
    return {"analysis": analysis}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)