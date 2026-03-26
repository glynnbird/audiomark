<script setup>
  const { qrURL } = useRecording()
  if (qrURL == '') {
    await navigateTo('/')
  }
  function print() {
    window.print()
  }
</script>
<style>
.spacer {
  margin-bottom: 20px; 
}
</style>
<template>
  <Wizard></Wizard>
  <v-card class="noprint spacer">
    <v-card-title>Print this QR code</v-card-title>
    <v-card-text>
      Print this QR code share your recording with someone. Recordings are kept for 30 days.
    </v-card-text>
    <v-card-actions>
      <v-btn color="secondary" @click="print()">Print</v-btn>
      <v-btn color="error" to="/">Back</v-btn>
    </v-card-actions>
  </v-card>
  <Qrcode :value="qrURL" />
</template>
