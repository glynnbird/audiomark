<script setup>
const { qrURL } = useRecording()
const { showAlert } = useShowAlert()
if (qrURL == '') {
  await navigateTo('/')
}
function print() {
  window.print()
}
async function share() {
  if (!navigator.canShare) {
    showAlert('Sharing not supported')
    return
  }
  if (navigator.canShare({ url: qrURL })) {
    try {
      await navigator.share({
        url: qrURL,
        title: "Audiomark recording"
      });
      showAlert('Shared', 'green')
    } catch (error) {
      showAlert('Shared failed', 'error')
    }
  }

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
      <v-btn color="green" @click="share()">Share</v-btn>
      <v-btn color="error" to="/">Back</v-btn>
    </v-card-actions>
  </v-card>
  <Qrcode :value="qrURL" />
</template>
