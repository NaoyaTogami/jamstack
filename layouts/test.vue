<template>
  <v-app>
    <v-app-bar
      fixed
    >
      <v-toolbar-items>
        <v-btn
          text
          @click="$router.push('/')"
          class="px-0"
          nuxt
        >
          <img src="~assets/logo.svg" width="56px" height="56px">
          
          <v-toolbar-title
            class="d-none d-md-flex"
          >
            奥三河OUTDOOR
          </v-toolbar-title>
        </v-btn>
      </v-toolbar-items>
      
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn
          v-for="menu in headerMenu"
          :key="menu.id"
          :to="`/${menu.params}`"
          class="d-none d-sm-flex"
          nuxt
        >
          <v-icon>{{ menu.icon }}</v-icon>
          <span>{{ menu.title }}</span>
        </v-btn>
      </v-toolbar-items>

      <v-btn
        color="primary"
        large
        rounded
        class="ml-2"
      >
        <v-icon class="d-none d-sm-flex">mdi-frequently-asked-questions</v-icon>
        <span>お問い合わせ</span>
      </v-btn>
    </v-app-bar>
    
    <div style="margin-top: 56px;"></div>
    
    <v-content>
      <nuxt />
    </v-content>
    
    <v-btn
      fab
      fixed
      bottom
      right
      @click="$vuetify.goTo(0)"
    >
      <v-icon>
        mdi-chevron-up
      </v-icon>
    </v-btn>
    
    <v-footer padless>
      <v-row>
        <v-col></v-col>
      </v-row>
      <v-card
        width="100%"
      >
        <v-card-text>
          <v-btn
            v-for="menu in footerMenu"
            :key="menu.id"
            :to="`/${menu.params}`"
            text
            rounded
            nuxt
          >
            {{ menu.title }}
          </v-btn>
        </v-card-text>
        
        <v-divider></v-divider>
        
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            icon
          >
            <v-icon>{{ icon }}</v-icon>
          </v-btn>
        </v-card-text>
        
        <v-divider></v-divider>
        
        <v-card-text>&copy; {{ new Date().getFullYear() }} 一般社団法人奥三河高原アウトドア協会</v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      icons: [
        'mdi-twitter',
        'mdi-youtube',
        'mdi-instagram'
      ]
    }
  },
  computed: {
    ...mapGetters(['headerMenu', 'footerMenu'])
  }
}
</script>
