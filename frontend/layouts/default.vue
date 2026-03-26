<script setup>
// composables
const { auth } = useAuth()
const route = useRoute()
const { progs } = useProgsList()
const { queue } = useShowAlert()
const { busy } = useBusy()

// local page items
const drawer = ref(false)

async function home() {
  await navigateTo('/')
  window.scrollTo(0, 0)
}
</script>
<template>
  <v-app theme="light">
    <v-app-bar density="compact" color="#3367D6" extension-height="50" extended>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title @click="home()" style="user-select:none;">Audiomark</v-app-bar-title>
      <template v-slot:append>
        <v-progress-circular v-if="busy" style="margin-right: 10px;" size="small" color="blue" indeterminate></v-progress-circular>
        <v-chip size="small" label color="white">{{ progs.length }}</v-chip>
        <v-btn v-if="route.name === 'index'" icon="mdi-plus" @click="navigateTo('/add')"></v-btn>
        <v-btn v-if="route.name !== 'index'" icon="mdi-chevron-left" @click="$router.back()"></v-btn>
      </template>
      <template v-slot:extension v-if="route.name !== 'archive'">
        <!-- Tab navigation-->
        <TabNav></TabNav>
      </template>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" location="left">
      <v-list>
        <v-list-item prepend-icon="mdi-home" title="Home" @click="navigateTo('/')"></v-list-item>
        <v-list-item prepend-icon="mdi-archive" title="Archive" @click="navigateTo('/archive')"></v-list-item>
        <v-list-item prepend-icon="mdi-information" title="About" @click="navigateTo('/about')"></v-list-item>
        <v-list-item v-if="auth.authenticated" prepend-icon="mdi-logout" title="Logout"
          @click="navigateTo('/logout')"></v-list-item>
        <v-list-item v-if="!auth.authenticated" prepend-icon="mdi-login" title="Login"
          @click="navigateTo('/login')"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <v-snackbar-queue v-model="queue" timeout="2000" color="error" />
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
