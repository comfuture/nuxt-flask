import pytest

def test_index_page(client):
    rv = client.get('/')
    assert rv.status_code == 200
    assert b'It works' in rv.data

def test_hello_api(client):
    # invoke without query
    rv = client.get('/hello', content_type='application/json')
    assert rv.status_code == 200
    data = rv.get_json()
    assert data.get('greet') == 'Hello, World!'

    # invoke with query `name`
    rv = client.get('/hello?name=comfuture', content_type='application/json')
    assert rv.status_code == 200
    data = rv.get_json()
    assert data.get('greet') == 'Hello, comfuture!'
