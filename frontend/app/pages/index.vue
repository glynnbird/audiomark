<script setup>
  // composables
  const recording = useRecording()
  const isRecording = ref(false)
  const ready = ref(0)
  ready.value = false
  let stream = null
  let mediaRecorder = null
  let chunks = []

  const startRecording = async () => {
    isRecording.value = true
    recording.clearRecKey()
    mediaRecorder.start(500)
  }

  async function cloudSaveVideo(key, blob) {
    const u = new URL('/api/audioput', apiHome)
    u.searchParams.append('key', key)
    await $fetch(u.toString(), {
      method: 'POST',
      body: blob,
      headers: {
        'content-type': 'audio/ogg',
        'content-length': blob.size
      }
    })
    await showAlert('Recording saved')
    return k
  }

  const generateKey = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890'.split('')
    const key = []
    for(let i = 0; i < 8; i++) {
      key.push(chars[Math.floor(Math.random()*chars.length)])
    }
    return key.join('')
  }

  const stopRecording = async () => {
    isRecording.value = false
    mediaRecorder.stop()
    // wait for the last chunk
    setTimeout(async () => {
      console.log('chunks length', chunks.length)
      const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" })
      console.log('blob', blob.type, blob)
      const key = generateKey()
      recording.setRecKey(key)
      await cloudSaveVideo(key, blob)
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
  <h1>Audiomark</h1>
  <v-btn color="red" v-if="ready && !isRecording" @click="startRecording()"><v-icon>mdi-record</v-icon></v-btn>
  <v-btn color="red" v-if="ready && isRecording" @click="stopRecording()"><v-icon>mdi-stop</v-icon></v-btn>
</template>
