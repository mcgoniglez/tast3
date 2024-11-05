import boto3
from dotenv import load_dotenv
import os

load_dotenv()

AWS_S3_BUCKET_NAME = os.getenv("AWS_S3_BUCKET_NAME")
s3_client = boto3.client('s3')

def upload_file_to_s3(file, filename):
    s3_client.upload_fileobj(file, AWS_S3_BUCKET_NAME, filename)
    return f"https://{AWS_S3_BUCKET_NAME}.s3.amazonaws.com/{filename}"
