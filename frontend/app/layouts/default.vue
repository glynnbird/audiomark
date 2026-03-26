<script setup>
  import '~/assets/css/global.css'
  
  // composables
  const { queue } = useShowAlert()

</script>
<template>   
  <v-app theme="light">
    <v-app-bar density="compact" class="noprint">
      <v-app-bar-title @click="navigateTo('/')">Audiomark</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-snackbar-queue v-model="queue" timeout="2000" color="error" class="noprint" />
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
