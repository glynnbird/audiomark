<script setup>
  const route = useRoute()
  const id = route.query.id
  const {playbackURL, setRecKey} = useRecording()
  setRecKey(id)
</script>
<style>
.note {
  margin-bottom: 30px;
}
</style>
<template>
  <v-alert
    class="note"
    title="Audio Recording"
    text="Note: This recording will be removed after 30 days."
    type="info"
    variant="tonal"
  ></v-alert>
  <audio preload="auto" controls :src="playbackURL"></audio>
</template>
