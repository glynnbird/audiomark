<script setup>
  // composables
  const auth = useAuth()
  const recording = ref(0)
  recording.value = false
  const ready = ref(0)
  ready.value = false
  let stream = null
  let mediaRecorder = null
  let chunks = []

  const startRecording = async () => {
    recording.value = true
    mediaRecorder.start(500)
  }

  const stopRecording = async () => {
    recording.value = false
    mediaRecorder.stop()
    // wait for the last chunk
    setTimeout(() => {
      console.log('chunks length', chunks.length)
      const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" })
      console.log('blob', blob.type, blob)
      chunks = []
    }, 500)

  }

  // get an audio stream
  const getStream = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log("getUserMedia supported.")
      try {
        var constraints = {
          video: false,
          audio: { latency: 0.05, echoCancellation: false },
        }
        stream = await navigator.mediaDevices.getUserMedia(constraints) 
        mediaRecorder = new MediaRecorder(stream)
        mediaRecorder.ondataavailable = (e) => {
          console.log('got chunk')
          chunks.push(e.data);
        }
        ready.value = true
      } catch (err) {
        console.error(`The following getUserMedia error occurred: ${err}`)
        stream = null
      }
    } else {
      console.log("getUserMedia not supported on your browser!");
    }
  }

  await getStream()

 

</script>
<template>
  <h1>home</h1>
  <v-btn color="red" v-if="ready && !recording" @click="startRecording()"><v-icon>mdi-record</v-icon></v-btn>
  <v-btn color="red" v-if="ready && recording" @click="stopRecording()"><v-icon>mdi-pause</v-icon></v-btn>
</template>
