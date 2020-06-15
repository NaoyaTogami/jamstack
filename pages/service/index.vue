<template>
  <v-container>
    <v-row>
        <v-col cols="12">
            <v-card flat>
                <v-card-title class="title">サービス</v-card-title>
            </v-card>
        </v-col>
    </v-row>
    <v-row no-gutter>
        <v-col cols="12" class="py-0">
            <v-breadcrumbs :items="breadcrumbs" class="pa-0" exact>
                <template v-slot:item="{ item }">
                  <v-breadcrumbs-item
                    :to="item.to"
                    :disabled="item.disabled"
                    exact
                    nuxt
                  >
                      <v-icon>{{ item.icon }}</v-icon>
                      <span>{{ item.text }}</span>
                  </v-breadcrumbs-item>
                </template>
            </v-breadcrumbs>
        </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="item in items"
        :key="item.id"
        cols="12"
        sm="12"
        md="4"
        lg="4"
      >
        <v-card
            :to="{name: 'service-id', params: {id: item.param}}"
            shaped
            nuxt
        >
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-text>{{ item.content }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'test',
  data() {
    return {
      items: []
    }
  },
  async asyncData ({ app }) {
    const response = await app.$axios.$get('https://appo.microcms.io/api/v1/groups', {
      headers: { 'X-API-KEY': '773389cb-ee15-43bb-ac24-0b97255ed891' }
    })
    return {
      items: response.contents
    }
  },
  computed: {
    breadcrumbs () {
            return [
                {text: 'ホーム', icon: 'mdi-home', disabled: false, to: '/'},
                {text: 'サービス', icon: 'mdi-handshake', disabled: false, to: '/service'},
                ]
        }
  }
}
</script>
