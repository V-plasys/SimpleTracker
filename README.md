## Running the backend

Requirements: Python 3.10+

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r API/requirements.txt

python -m uvicorn app.main:app --reload --app-dir API --port 50777
```

API: http://127.0.0.1:50777
Swagger docs: http://127.0.0.1:50777/docs/

## Running the frontend

Requirements: Node.js 20.19+, pnpm

```bash
cd frontend
pnpm install
pnpm dev
```

App: http://localhost:5173