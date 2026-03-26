<script setup>
  const route = useRoute()
  const id = route.params.id
  const {playbackURL, setRecKey} = useRecording()
  setRecKey(id)
</script>
<template>
  <h3>Here is your Audiomark recording</h3>
  <audio controls :src="playbackURL"></audio>
</template>
