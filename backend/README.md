# ProductPoker Backend

This is the backend for the ProductPoker application, built with FastAPI and Supabase.

## Setup

1. Make sure you have Python 3.7+ installed.

2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Set up your Supabase project and obtain the URL and API key.

4. Create a `.env` file in the `backend` directory with the following content:
   ```
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_api_key
   ```
   Replace `your_supabase_project_url` and `your_supabase_api_key` with your actual Supabase project URL and API key.

## Running the Backend

To run the backend server:

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Run the FastAPI server:
   ```
   uvicorn app.main:app --reload
   ```

The server will start, and you can access the API at `http://localhost:8000`.

## API Documentation

Once the server is running, you can view the automatic API documentation at:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Testing

(Add information about running tests once they are implemented)

## Project Structure

- `app/`: Contains the main application code
  - `main.py`: The main FastAPI application
- `tests/`: Contains test files (to be implemented)
- `requirements.txt`: List of Python dependencies
- `.env`: Environment variables (not tracked in git)

## Contributing

(Add contribution guidelines if applicable)

## License

(Add license information if applicable)