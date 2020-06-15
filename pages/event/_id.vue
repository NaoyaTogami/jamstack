<template>
  <v-layout
    column
    justify-center
    align-center
  >
    {{ $route.params.id }}
  </v-layout>
</template>

<script>
export default {
  layout: 'test',
  data() {
    return {
    }
  }
}
</script>