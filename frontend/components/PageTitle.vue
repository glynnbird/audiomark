<script setup>
  const { title } = defineProps(['title'])
</script>
<template>
  <v-row>
    <v-col><h2>{{ title }}</h2></v-col>
    <v-col><Alert /></v-col>
  </v-row>
</template>
