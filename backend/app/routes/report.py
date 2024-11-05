from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from .. import schemas, models, database, auth
from fastapi.responses import FileResponse
import csv
import pdfkit
import os

router = APIRouter(
    prefix="/api/reports",
    tags=["reports"],
)

@router.get("/export")
async def export_report(
    format: str,
    db: AsyncSession = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    if format == "csv":
        # Generate CSV
        filename = "report.csv"
        with open(filename, mode="w", newline='') as csv_file:
            fieldnames = ["id", "title", "status", "due_date"]
            writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
            writer.writeheader()
            # Fetch data and write rows
        return FileResponse(filename, media_type="text/csv")
    elif format == "pdf":
        # Generate PDF
        filename = "report.pdf"
        pdfkit.from_string("<h1>Report</h1>", filename)
        return FileResponse(filename, media_type="application/pdf")
    else:
        raise HTTPException(status_code=400, detail="Invalid format")
