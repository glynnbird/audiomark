<script setup>
  // composables
  const auth = useAuth()
  auth.value.authenticated = false
  localStorage.removeItem('audiomarkapikey')
  await navigateTo('/login')

</script>
