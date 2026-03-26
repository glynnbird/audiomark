<script setup>
  const { playbackURL } = useRecording()
  if (playbackURL == '') {
    await navigateTo('/')
  }
</script>
<template>
  <v-alert class="noprint">Print this QR code to share your recording</v-alert>
  <Qrcode :value="playbackURL" />
  <v-btn class="noprint" to="/">Back</v-btn>
</template>
