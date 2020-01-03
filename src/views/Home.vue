<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  created() {
    let modal = this.$success()
    modal.update({
      title: 'success',
      content: 'loading success',
      centered: true
    })
    setTimeout(() => {
      modal.destroy()
    }, 1500)
  }
}
</script>
