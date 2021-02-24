# nuxt-flask

```python
@app.route('/hello')
def hello():
    name = request.values.get('name', 'World')
    return jsonify(greet=f'Hello, {name}!')
```

```vue
<template>
  <div>{{ greet }}</div>
</template>
<script>
export default {
  asyncData({app, route:{fullPath}}) {
    return app.$api(fullPath)
  }
}
</script>
```

## Getting started

[Getting stared](https://github.com/comfuture/nuxt-flask/blob/main/content/getting-started.md)

## Pre requirements

- Python 3.x (with virtualenv)


## Development

```bash
# install npm dependencies
$ npm install

# install python dependencies
$ poetry install

# serve with hot reload at localhost:3000
$ npm run dev
```

API Server that made with flask will be launched automacally.


----

Copyright &copy; 2021 comfuture under MIT License