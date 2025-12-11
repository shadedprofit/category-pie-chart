# Category Pie Chart

This app is set up to export a Category Pie Chart component that can be imported in any React application if published to `npm`. An example demo using the component is also provided, consisting of a React frontend and a Django backend for the API server.


## Project Organization

The component library is contained in the `frontend/lib` folder.  Vite has specifically been set up to only build and export this component.  The frontend code relevant to the demo, on the other hand, is contained within the `src` folder.  The Django API server located in the `backend` folder is only meant to be used with the demo application.

A demo app using the component has also been setup, which either can be run in a Docker container or locally by running both the backend and frontend servers in separate terminal windows.


## Running the Demo App in a Docker Container

First, make sure you have installed Docker and have started your local Docker Engine.  Then, from the project root, run:

- `docker-compose up --build`

This will run both the backend and frontend in a Docker container, and seed the database with 1000 records over the past year.  Once the app is running, you can navigate to:

- `http://0.0.0.0:5173`

There, you will find a Pie Chart displaying a count of purchases for every category over the selected date range.  You can select different date ranges to see how the percentages differ over time.


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


## Running the Frontend Locally

cd into the frontend:
- `cd frontend/`

Install packages using Yarn (`npm i -g yarn` if you need to install yarn):
- `yarn install`

Run dev server:
- `yarn dev`

Navigate to the page at:
- `http://localhost:5173`


## Other Chart Examples

Storybook has been set up in the frontend to provide other examples of how to style the Pie Chart component.

First, you should build storybook by navigating into the frontend folder and running:
- `yarn build-storybook`

To run Storybook, cd into the frontend folder and run:
- `yarn storybook`


## Running Unit Tests

### Backend Tests

cd into backend/charts/ and run:
- `python manage.py test`

### Frontend Tests

cd into frontend/ and run:
- `yarn test`


## Project Architecture

### Frontend Architecture

For the demo, I chose to use React, TypeScript, TanStack Query, and Tailwind CSS as the primary libraries.  TypeScript is used to help document the code, eliminate bugs during development, and enable other developers to get up to speed more easily.  I chose TanStack Query to handle the data management from API requests primarily because it gives developers a lot of flexibility with API requests and because it makes data management for components very simple.  Tailwind, I believe, also enables developers to step into a codebase and more easily understand what is happening with every component or page.  This stack, collectively, enables a codebase to scale for a larger organization.

Vite is used for the build tool and dev server.  The `<CategoryPieChart />` component is structured so that only the peer dependencies for `react`, `react-dom`, and `recharts` are required for it to be utilized.  For that reason, the code specifically pertaining to the component is in the `lib/` folder, and the code for the demo is in the `src` folder.

### Backend Architecture

The primary dependencies for the backend are Django, Django Rest Framework, and Django Cors Headers. The backend uses a SQLite database.  The primary API route `api/pie-charts?start_date=&end_date=` is structured as a GET request from an API view.

Because Django is an MVC framework, I have tried to follow MVC principles as closely as possible.  As such, views primarily deal with requests and responses, and services deal with logic as it pertains to database models.

The route setup is structured so that other API routes can easily be added.