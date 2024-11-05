from fastapi import UploadFile, File

@router.post("/tasks/{task_id}/attachments")
async def upload_attachment(task_id: int, file: UploadFile = File(...)):
    s3_client = boto3.client('s3')
    s3_client.upload_fileobj(file.file, 'your-bucket-name', file.filename)
    # Save file info in the database
    return {"filename": file.filename}
