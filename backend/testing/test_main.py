from fastapi.testclient import TestClient
from app.main import app
from app.config import settings
from app.schemas import schemas

client = TestClient(app)


async def test_read_users_me():
    response = client.get(f"{settings.root_path}/users/me", headers={""})
    print(response)
    assert response.status_code == 200
    assert response.json() == {"id": 1, "email": "normie@example.com", "name": "Normie", "roles": [1234]}
