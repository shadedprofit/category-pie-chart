## Running the Backend Locally

cd into the backend:
- `cd backend/`

Install packages using Poetry:
- `poetry install`

Activate virtual environment:
- `poetry env activate`

cd into the charts folder:
- `cd charts/`

Start the server:
- `python manage.py runserver`

You should now be able to call the Pie chart API at:
- `http://localhost:8000/api/pie-chart?start-date=<YYYY-MM-DD>&end-date=<YYYY-MM-DD>`