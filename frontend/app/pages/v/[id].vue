<script setup>
  const route = useRoute()
  const id = route.params.id
  const {playbackURL, setRecKey} = useRecording()
  setRecKey(id)
</script>
<style>
.note {
  margin-bottom: 30px;
}
</style>
<template>
  <v-card>
    <v-card-title>Audio Recording</v-card-title>
    <v-card-text>
      <div class="note">
        Note: This recording will be removed after 30 days.
      </div>
      <audio preload="auto" controls :src="playbackURL"></audio>
    </v-card-text>
  </v-card>
</template>
