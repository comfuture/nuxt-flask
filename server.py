from typing import *
from flask import Flask

def create_app(config :Union[Mapping, None]=None, config_file='config.py') -> Flask:
    app = Flask(__name__)
    if config:
        app.config.update(config)
    elif config_file:
        app.config.from_pyfile(config_file)

    @app.route('/')
    def index():
        return 'It works'

    return app

if __name__ == '__main__':
    app = create_app(config_file='config.py')
    app.run(port=4000, debug=True)
