<script setup>
  // composables
  const { startRecording, stopRecording, isRecording, isReady, isSaving,  getStream} = useRecording()

  await getStream()

</script>
<style>
.huge {
  margin-top: 50px;
  width:200px;
  height:200px;
}
</style>
<template>
  <PWARefresh></PWARefresh>

  <v-card v-if="isReady && !isRecording && !isSaving">
    <v-card-title>Ready to record</v-card-title>
    <v-card-text>Press the red record button when you're ready to start recording</v-card-text>
  </v-card>
  <v-btn v-if="isReady && !isRecording && !isSaving" class="huge" icon="mdi-record" color="red" @click="startRecording()"></v-btn>

  <v-card  v-if="isReady && isRecording && !isSaving ">
    <v-card-title>Recording in progress...</v-card-title>
    <v-card-text>Press the blue stop button when you've finished</v-card-text>
  </v-card>
  <v-btn v-if="isReady && isRecording && !isSaving" class="huge" icon="mdi-stop" color="blue" @click="stopRecording()"></v-btn>

  <v-progress-linear v-if="isSaving" indeterminate></v-progress-linear>

  <v-alert v-if="!isReady">Looking for permission to use audio devices</v-alert>
</template>
