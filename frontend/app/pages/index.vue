<script setup>
  // composables
  const { setRecKey, startRecording, stopRecording, isRecording, isReady, isSaving,  getStream} = useRecording()
  import visualiser from "~/assets/js/visualiser"

  const stream = await getStream()
  if (stream) {
    setTimeout(() => {
      const thevisualiser = new visualiser()
      thevisualiser.start(document.getElementById("visualiser"), stream)
    },10)
  }
  setRecKey('')

</script>
<style>
.huge {
  margin-top: 50px;
  width:200px;
  height:200px;
}
.vis {
  background-color: white;
  margin-top: 25px;
  width:100%;
  height:200px
}
</style>
<template>
  <PWARefresh></PWARefresh>
  <Wizard></Wizard>

  <v-alert v-if="isReady && !isRecording && !isSaving"
    text="Press the red record button when you're ready to start recording"
    title="Ready to record"
    type="info"
    variant="tonal"
  ></v-alert>

  <v-alert v-if="isReady && isRecording && !isSaving"
    text="Press the blue stop button when you've finished"
    title="Recording in progress"
    type="info"
    variant="tonal"
  ></v-alert>

  <v-alert v-if="isSaving"
    text="Uploading to the cloud"
    title="Saving in progress"
    type="info"
    variant="tonal"
  ></v-alert>

  <v-row>
    <v-col>
      <v-btn v-if="isReady && !isRecording && !isSaving" class="huge" icon="mdi-record" color="red" @click="startRecording()"></v-btn>
      <v-btn v-if="isReady && isRecording && !isSaving" class="huge" icon="mdi-stop" color="blue" @click="stopRecording()"></v-btn>
    </v-col>
    <v-col>
      <!-- level meter -->
      <canvas v-show="isReady && !isSaving" id="visualiser" class="vis"></canvas>
    </v-col>
  </v-row>

  <v-progress-linear v-if="isSaving" indeterminate></v-progress-linear>

  <v-alert v-if="!isReady">Looking for permission to use audio devices</v-alert>
</template>
