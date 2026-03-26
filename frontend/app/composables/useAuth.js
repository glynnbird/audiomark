
const AUTH_LOCAL_STORAGE_KEY = 'audiomarkapikey'

export default function () {
  // the authentication state
  // authenticated - true if you are logged in
  // apiKey - the saved API key for logged in users
  const auth = useState('auth', () => { return { authenticated: false, apiKey: '' } })

  function loadFromLocalStorage() {
    const v = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
    if (v) {
      auth.value = {
        authenticated: true,
        apiKey: v
      }
    }
  }

  async function login(apiKey) {
    // log the user in
    auth.value.authenticated = true
    auth.value.apiKey = apiKey
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, apiKey)
    await navigateTo('/')
  }

  async function logout() {
    // log the user out
    auth.value.authenticated = false
    auth.value.apiKey = ''
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
    await navigateTo('/login')
  }

  function isLoggedIn() {
    return auth.value && auth.value.authenticated && auth.value.apiKey
  }

  // return auth object and functions to log in and out
  return { auth, login, logout, isLoggedIn, loadFromLocalStorage }
}
