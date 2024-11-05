import boto3
from dotenv import load_dotenv
import os

load_dotenv()

AWS_REGION = os.getenv("AWS_REGION")
dynamodb = boto3.resource('dynamodb', region_name=AWS_REGION)
table = dynamodb.Table('HighPriorityTasks')

async def save_task_to_dynamodb(task):
    table.put_item(
        Item={
            'id': task.id,
            'title': task.title,
            'status': task.status.value,
            'due_date': str(task.due_date),
        }
    )
