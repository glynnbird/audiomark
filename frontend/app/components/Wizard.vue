<script setup>
  const { breadcrumbItems } = useRecording()
</script>
<template>
  <v-breadcrumbs class="noprint" :items="breadcrumbItems">
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
  </v-breadcrumbs>
</template>
