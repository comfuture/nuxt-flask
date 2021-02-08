<template>
  <div>
    Greeting from server: {{ greet }}
  </div>
</template>
<script>
export default {
  name: 'hello',
  asyncData({app, route: {fullPath}}) {
    return app.$api(fullPath)
  }
}
</script>
