<script setup>
const { qrURL } = useRecording()
const { showAlert } = useShowAlert()
const { copy } = useClipboard()
if (qrURL == '') {
  await navigateTo('/')
}
function print() {
  window.print()
}
function copyURL() {
  copy(qrURL.value)
}
async function share() {
  if (!navigator.canShare) {
    showAlert('Sharing not supported')
    return
  }
  if (navigator.canShare({ url: qrURL.value })) {
    try {
      await navigator.share({
        url: qrURL.value,
        title: "Audiomark recording"
      });
      showAlert('Shared', 'green')
    } catch (error) {
    }
  }

}
</script>
<style>
.spacer {
  margin-top: 20px;
}
</style>
<template>
  <Wizard></Wizard>
  <v-alert class="noprint"
    title="Print QR Code or share link"
    text="Recordings are kept for 30 days"
    type="info"
    variant="tonal"
  ></v-alert>
  <v-text-field class="noprint spacer" append-inner-icon="mdi-content-copy" @click:append-inner="copyURL">{{ qrURL }}</v-text-field>
  <v-btn-group class="noprint spacer" variant="text" >
    <v-btn color="primary" @click="print()">Print</v-btn>
    <v-btn color="secondary" @click="share()">Share</v-btn>
  </v-btn-group>
  <Qrcode :value="qrURL" />
</template>
