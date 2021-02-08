import pytest

def test_index_page(client):
    rv = client.get('/')
    assert rv.status_code == 200
    assert b'It works' in rv.data
