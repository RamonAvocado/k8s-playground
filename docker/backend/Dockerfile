FROM python:3.11-slim

WORKDIR /app

RUN pip install uv
COPY uv.lock pyproject.toml .

RUN uv sync --frozen

COPY . .

CMD ["uv", "run", "uvicorn", "servers.app:app", "--host", "0.0.0.0", "--port", "8000"]
# CMD ["tail", "-f", "/dev/null"]

