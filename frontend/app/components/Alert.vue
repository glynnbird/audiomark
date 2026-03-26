<script setup>
  // composables
  const alert = useAlert()

  // local refs
  const timer = ref(0)
  setInterval(() => { timer.value++ }, 1000)

  // methods
  const showAlert = computed(() => {
    timer.value
    const now = new Date().getTime()
    const a = alert.value
    return a && a.message && a.ts && a.ts + 2000 >= now ? true : false
  })
</script>
<template>
  <v-alert density="compact" color="yellow" v-show="showAlert">{{ alert.message }}</v-alert>
</template>