import os
from typing import *
from flask import Flask, request, jsonify

def create_app(config :Union[Mapping, None]=None, config_file='config.py') -> Flask:
    app = Flask(__name__)
    if config:
        app.config.update(config)
    elif config_file:
        app.config.from_pyfile(config_file)

    @app.route('/')
    def index():
        return 'It works'

    @app.route('/hello')
    def hello():
        name = request.values.get('name', 'World')
        return jsonify(greet=f'Hello, {name}!')

    return app

if __name__ == '__main__':
    app = create_app(config_file='config.py')
    app.run(port=os.environ.get('SERVER_PORT', 4000))
