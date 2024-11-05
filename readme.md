##Backend Setup:

- Navigate to the backend directory.
- Create and activate a virtual environment.
- Install dependencies: `pip install -r requirements.txt`
- Create a `.env` file and add the environment variables.
- Run database migrations (if using Alembic or similar).
- Start the server: `uvicorn app.main:app --reload`

##Frontend Setup:

- Navigate to the frontend directory.
- Install dependencies: npm install
- Create a `.env` file and add the environment variables.
- Start the app: npm start