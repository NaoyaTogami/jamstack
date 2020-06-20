<template>
    <v-app>
        <v-app-bar
            fixed
            :color="($route.path == '/' && !scroll)? 'transparent' : color.header.bg"
            :flat="($route.path == '/')? !scroll : false"
        >
            <v-toolbar-items>
                <v-btn
                    text
                    @click="$router.push('/')"
                    class="px-0"
                    aria-label="to-home"
                    nuxt
                    exact
                >
                    <v-img
                        :src="iconImg"
                        width="56px"
                        height="56px"
                        alt=""
                    ></v-img>
                  
                    <v-toolbar-title
                        :class="`d-none d-md-flex ${color.header.txt}`"
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
                    :to="`/${menu.params}/`"
                    color="transparent"
                    :class="`d-none d-sm-flex ${color.header.txt}`"
                    nuxt
                    depressed
                >
                    <v-icon>{{ menu.icon }}</v-icon>
                    <span>{{ menu.title }}</span>
                </v-btn>
            </v-toolbar-items>
    
            <v-btn
                :to="{name: 'contact'}"
                large
                rounded
                outlined
                :class="`ml-2 ${color.header.txt}`"
                nuxt
            >
                <v-icon class="d-none d-sm-flex">mdi-frequently-asked-questions</v-icon>
                <span>お問い合わせ</span>
            </v-btn>
        </v-app-bar>
    
        <v-content v-scroll="onScroll">
            <nuxt />
        </v-content>
    
        <v-btn
            fab
            fixed
            bottom
            right
            @click="$vuetify.goTo(0)"
            v-show="scroll"
        >
            <v-icon>
                mdi-chevron-up
            </v-icon>
        </v-btn>
    
        <v-footer padless :color="color.footer.bg">
            <v-sheet tile width="100%" color="transparent">
                <v-row no-gutters class="py-4 justify-center">
                    <v-col cols="auto"
                        v-for="menu in footerMenu"
                        :key="menu.id"
                    >
                        <v-btn
                            
                            :to="`/${menu.params}/`"
                            :color="color.footer.bg"
                            :class="`${color.footer.txt}`"
                            text
                            rounded
                            nuxt
                        >
                            {{ menu.title }}
                        </v-btn>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row no-gutters class="py-4 justify-center">
                    <v-col
                        cols="auto"
                        v-for="icon in icons"
                        :key="icon"
                        class="px-2"
                    >
                        <v-btn
                            to="/"
                            :color="color.footer.bg"
                            :class="`${color.footer.txt}`"
                            :aria-label="icon"
                            icon
                            large
                        >
                            <v-icon>{{ icon }}</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row no-gutters class="justify-center">
                    <v-col cols="auto" :class="`${color.footer.txt} caption`">
                        &copy; {{ new Date().getFullYear() }} 一般社団法人奥三河高原アウトドア協会
                    </v-col>
                </v-row>
            </v-sheet>
        </v-footer>
    </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            iconImg: require("@/assets/logo.svg"),
            color: {
                header: {bg: 'headerBg', txt: 'headerTxt--text'},
                footer: {bg: 'footerBg', txt: 'footerTxt--text'},
            },
            icons: [
                'mdi-twitter',
                'mdi-youtube',
                'mdi-instagram'
            ],
            scroll: false,
        }
    },
    computed: {
        ...mapGetters(['headerMenu', 'footerMenu'])
    },
    methods: {
        onScroll (e) {
            var top = window.pageYOffset ||e.target.scrollTop || 0
            if(top >= window.innerHeight) {
                this.scroll = true
            }
            else {
                this.scroll = false
            }
        }
    }
}
</script>
