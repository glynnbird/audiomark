export default function () {
  // the authentication state
  // authenticated - true if you are logged in
  // apiKey - the saved API key for logged in users
  const recKey = useState('recKey', () => { return '' })
  
  function setRecKey(rk) {
    recKey.value = rk
  }

  function clearRecKey() {
    recKey.value = ''
  }
  
  return { recKey, setRecKey, clearRecKey}
}
