from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from .. import schemas, models, database, auth
from ..utils import dynamodb_utils

router = APIRouter(
    prefix="/api/tasks",
    tags=["tasks"],
)

@router.post("/", response_model=schemas.TaskOut)
async def create_task(
    task: schemas.TaskCreate,
    db: AsyncSession = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    new_task = models.Task(
        title=task.title,
        description=task.description,
        due_date=task.due_date,
        status=task.status,
        owner_id=current_user.id,
        assigned_to_id=task.assigned_to_id,
    )
    db.add(new_task)
    await db.commit()
    await db.refresh(new_task)
    if task.status == models.TaskStatus.pending:
        await dynamodb_utils.save_task_to_dynamodb(new_task)
    return new_task

@router.get("/", response_model=List[schemas.TaskOut])
async def read_tasks(
    skip: int = 0,
    limit: int = 10,
    db: AsyncSession = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    tasks = await db.execute(select(models.Task).offset(skip).limit(limit))
    return tasks.scalars().all()

# Implement update_task and delete_task similarly
