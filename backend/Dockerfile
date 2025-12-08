# Use a Python base image
FROM python:3.12

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /app/backend

# Install Poetry
RUN pip install poetry \
    && poetry config virtualenvs.create false --local \
    && pip install poetry-plugin-export

# Copy and install dependencies using Poetry
COPY pyproject.toml poetry.lock ./app/backend/
RUN cd ./app/backend/ \
    && poetry install --no-root --only main \
    && poetry export --format requirements.txt --output requirements.txt \
    && poetry env activate \
    && cd /

# Copy the rest of the application code
COPY . /app/backend/

# Run migrations and seed database
RUN cd ./app/backend/ \
    && pip install -r requirements.txt \
    && cd /app/backend/charts/ \
    && python manage.py migrate \
    && python manage.py seed

# Set Python path
ENV PYTHONPATH=/app/backend/

# Set WORKDIR to charts/ folder so we can run the `manage.py` scripts
WORKDIR /app/backend/charts

# Expose the port Django runs on
EXPOSE 8000