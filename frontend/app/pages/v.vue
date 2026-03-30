<script setup>
  const route = useRoute()
  const id = route.query.id
  const {playbackURL, setRecKey} = useRecording()
  const showAudio = ref(true)
  setRecKey(id)

  function handleAudioError(e) {
    console.log('handle audio error', e)
    showAudio.value = false
  }
</script>
<style>
.note {
  margin-bottom: 30px;
}
</style>
<template>
  <v-alert
    v-if="showAudio"
    class="note"
    title="Audio Recording"
    text="Note: This recording will be removed after 30 days."
    type="info"
    variant="tonal"
  ></v-alert>
  <audio v-if="showAudio" @error="handleAudioError" preload="auto" controls :src="playbackURL"></audio>
  <v-alert
    v-if="!showAudio"
    class="note"
    title="Audio Recording Error"
    text="Could not play audio recording. Note: The recordings are be removed after 30 days."
    type="error"
    variant="tonal"
  ></v-alert>
</template>
