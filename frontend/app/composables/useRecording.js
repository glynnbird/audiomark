const config = useRuntimeConfig()
const apiHome = config.public['apiBase'] || window.location.origin
const { showAlert } = useShowAlert()

export default function () {
  // the authentication state
  // authenticated - true if you are logged in
  // apiKey - the saved API key for logged in users
  const recKey = useState('recKey', () => { return '' })
  const isRecording = useState('isRecording', () => { return false })
  const isReady = useState('isReady', () => { return false })
  const isSaving = useState('isSaving', () => { return false })
  let mediaRecorder = null
  let chunks = []
  let stream = null
  const bcItems = useState('bcItems', () => { return [
    {
      title: 'Home',
      disabled: false,
      to: '/'
    },
    {
      title: 'Record',
      disabled: true
    },
    {
      title: 'Upload',
      disabled: true
    },
    {
      title: 'Share',
      disabled: true
    },
  ]})

  function setRecKey(rk) {
    recKey.value = rk
  }

  function clearRecKey() {
    recKey.value = ''
  }

  const playbackURL = computed(() => {
    if (recKey.value === '') {
      return ''
    }
    const u = new URL(apiHome)
    u.pathname = `/api/audioget`
    u.searchParams.set('key', recKey.value)
    const audioURL = u.toString()
    return audioURL
  })

  const qrURL = computed(() => {
    if (recKey.value === '') {
      return ''
    }
    const u = new URL(apiHome)
    u.pathname = `/v/${recKey.value}`
    const qURL = u.toString()
    return qURL
  })

  const startRecording = async () => {
    isSaving.value = false
    isRecording.value = true
    clearRecKey()
    mediaRecorder.start(500)
  }

  const generateKey = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890'.split('')
    const key = []
    for(let i = 0; i < 8; i++) {
      key.push(chars[Math.floor(Math.random()*chars.length)])
    }
    return key.join('')
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
  }

  const stopRecording = async () => {
    isSaving.value = true
    setTimeout(() => {
      mediaRecorder.stop()
    }, 1)
    // wait for the last chunk
    setTimeout(async () => {
      console.log('chunks length', chunks.length)
      const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" })
      console.log('blob', blob.type, blob)
      const key = generateKey()
      setRecKey(key)
      await cloudSaveVideo(key, blob)
      console.log('Recording saved. Key=', key)
      chunks = []
      await navigateTo('/qr')
      isSaving.value = false
      isRecording.value = false
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
        isReady.value = true
      } catch (err) {
        console.error(`The following getUserMedia error occurred: ${err}`)
        stream = null
      }
    } else {
      console.log("getUserMedia not supported on your browser!");
    }
  }

  const breadcrumbItems = computed(() => {
    bcItems.value[1].disabled = true
    bcItems.value[2].disabled = true
    bcItems.value[3].disabled = true
    if (isRecording.value) {
      bcItems.value[1].disabled = false
    }
    if (isSaving.value) {
      bcItems.value[1].disabled = true
      bcItems.value[2].disabled = false
    }
    if (recKey.value) {
      bcItems.value[3].disabled = false
    }
    return bcItems.value
  })

  return { recKey, setRecKey, clearRecKey, startRecording, stopRecording, getStream, isRecording, isReady,isSaving, qrURL, playbackURL, breadcrumbItems}
}
