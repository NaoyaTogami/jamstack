<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <div>event</div>
    <v-btn
        v-for="event in events"
        :key="event.id"
        :to="{name: 'event-id', params: {id: event.id}}"
    >
        {{ event.title }}
    </v-btn>
  </v-layout>
</template>

<script>
export default {
  layout: 'test',
  data() {
    return {
        events: [
            {id: 1, title: 'event1'}
        ]
    }
  }
}
</script>