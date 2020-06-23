<template>
    <div>
    <v-app-bar
        fixed
        :color="(!scroll)? 'transparent' : layout.header.bgColor"
        :flat="!scroll"
    >
        <v-toolbar-items>
            <v-btn
                text
                class="px-0"
                aria-label="to-home"
                @click="$vuetify.goTo(0)"
            >
                <v-img
                    v-if="layout.header.pic"
                    :src="`${layout.header.pic.url}?fit=clip&h=56`"
                    alt=""
                    aspect-ratio
                ></v-img>
              
                <v-toolbar-title
                    v-if="layout.header.title"
                    :class="`${layout.header.txtColor}--text`"
                >
                    {{ layout.header.title }}
                </v-toolbar-title>
            </v-btn>
        </v-toolbar-items>
      
        <v-spacer></v-spacer>
        
        <v-menu
            v-if="$vuetify.breakpoint.xs"
            right
            nudge-right
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :color="layout.header.txtColor"
              aria-label="menu"
              v-bind="attrs"
              v-on="on"
              icon
            >
                <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(menu,i) in menus"
                :key="i"
                @click="move(menu.id)"
            >
              <v-list-item-title>{{ menu.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        
        <v-toolbar-items v-else>
            <v-btn
                v-for="(menu,i) in menus"
                :key="i"
                @click="move(menu.id)"
                color="transparent"
                :small="$vuetify.breakpoint.sm"
                :class="`${layout.header.txtColor}--text`"
                depressed
            >
                <span>{{ menu.name }}</span>
            </v-btn>
        </v-toolbar-items>
        
    </v-app-bar>
    <v-content v-scroll="onScroll">
        <template v-for="(content, i) in contents">
            <div v-if="content.menu" :id="`menu${i}`"></div>
            <v-img
                :src="(content.contents[0].bgPic)? content.contents[0].bgPic.url : undefined"
                :height="(content.contents[0].type=='トップ')? '100vh' : undefined"
            >
                <v-sheet
                    :color="(content.contents[0].bgColor)? content.contents[0].bgColor : 'transparent'"
                    height="100%"
                    tile
                >
                <v-container class="py-10" style="height:100%;min-height:50vh">
                    <v-row style="height:100%;" class="justify-center align-center">
                        <v-col
                            v-if="content.contents[0].contents"
                            v-html="content.contents[0].contents"
                            cols="12"
                            sm="10"
                        ></v-col>
                        <template v-if="content.contents[0].type=='3カード'">
                            <v-col
                                cols="12"
                                sm="8"
                                md="4"
                                v-for="(item,i) in content.contents[0].items"
                                :key="i"
                                class="align-self-stretch"
                            >
                                <v-card
                                    v-if="item.contents"
                                    color="transparent"
                                    height="100%"
                                >
                                    <v-img :src="(item.bgPic)? item.bgPic.url : undefined" width="100%" height="100%">
                                        <v-sheet
                                            v-html="item.contents"
                                            :color="(item.bgColor)? item.bgColor : undefined"
                                            width="100%"
                                            height="100%"
                                            class="pa-10"
                                        >
                                            
                                        </v-sheet>
                                    </v-img>
                                </v-card>
                            </v-col>
                        </template>
                        <template v-else-if="content.contents[0].type=='2カラム'">
                            <v-col
                                cols="12"
                                sm="6"
                                v-for="(item,i) in content.contents[0].items"
                                :key="i"
                                class="px-3 px-sm-0 py-0 align-self-stretch"
                            >
                                <v-img :src="(item.bgPic)? item.bgPic.url : undefined" width="100%" height="100%">
                                <v-sheet
                                    :color="(item.bgColor)? item.bgColor : undefined"
                                    height="100%"
                                    width="100%"
                                    class="d-flex"
                                    tile
                                >
                                    <v-card
                                        v-if="item.contents"
                                        v-html="item.contents"
                                        color="transparent"
                                        class="ma-auto"
                                        flat
                                        tile
                                    >
                                    </v-card>
                                </v-sheet>
                                </v-img>
                            </v-col>
                        </template>
                        <template v-else-if="content.contents[0].type=='3カラム'">
                            <v-col
                                cols="12"
                                md="4"
                                v-for="(item,i) in content.contents[0].items"
                                :key="i"
                                class="px-3 px-sm-0 py-0 align-self-stretch"
                            >
                                <v-img :src="(item.bgPic)? item.bgPic.url : undefined" width="100%" height="100%">
                                <v-sheet
                                    :color="(item.bgColor)? item.bgColor : undefined"
                                    height="100%"
                                    width="100%"
                                    class="d-flex"
                                    tile
                                >
                                    <v-card
                                        v-if="item.contents"
                                        v-html="item.contents"
                                        color="transparent"
                                        class="ma-auto"
                                        flat
                                        tile
                                    >
                                    </v-card>
                                </v-sheet>
                                </v-img>
                            </v-col>
                        </template>
                        <template v-else-if="content.contents[0].type=='カルーセル'">
                            <v-col cols="12" sm="8" md="6">
                                <v-carousel hide-delimiters cycle interval="3000" height="auto">
                                    <v-carousel-item
                                        v-for="(pic,i) in content.contents[0].pics"
                                        :key="i"
                                        :src="pic.pic.url"
                                    ></v-carousel-item>
                                </v-carousel>
                            </v-col>
                        </template>
                        <template v-else-if="content.contents[0].type=='動画'">
                            <v-col v-if="content.contents[0].movie" cols="12" sm="8" md="6">
                                <div style="width: 100%;padding-bottom: 56.25%;height: 0px;position: relative;">
                                    <iframe
                                        style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);-webkit-transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%);"
                                        width="100%"
                                        height="100%"
                                        title="Movie"
                                        :src="`https://www.youtube.com/embed/${content.contents[0].movie}`"
                                        frameborder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen
                                    ></iframe>
                                </div>
                            </v-col>
                        </template>
                        <template v-else>
                        </template>
                        <v-col
                            v-if="content.contents[0].btnLabel&&content.contents[0].btnLink"
                            cols="12"
                            sm="10"
                            class="d-flex justify-center"
                        >
                            <v-btn
                                :to="content.contents[0].btnLabel"
                            >
                                {{ content.contents[0].btnLabel }}
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
                </v-sheet>
            </v-img>
        </template>
    </v-content>
    <v-footer padless :color="layout.footer.bgColor">
        <v-sheet tile width="100%" color="transparent">
            <v-row class="mx-0 justify-center">
                <v-col cols="auto" :class="`${layout.footer.txtColor}--text caption`">
                    {{ layout.footer.copyright }}
                </v-col>
            </v-row>
        </v-sheet>
    </v-footer>
    </div>
</template>

<script>

export default {
    layout: 'test',
    async asyncData ({ app }) {
        var layout = await app.$axios.$get(`https://appo.microcms.io/api/v1/layout?depth=3`, {
            headers: { 'X-API-KEY': '773389cb-ee15-43bb-ac24-0b97255ed891' }
        })
        var contents = layout.contents[0].layout
        layout = {
            header: {
                title: layout.contents[0].title,
                pic: layout.contents[0].pic,
                bgColor: layout.contents[0].bgColorH,
                txtColor: layout.contents[0].txtColorH
            },
            footer: {
                copyright: layout.contents[0].copyright,
                bgColor: layout.contents[0].bgColorF,
                txtColor: layout.contents[0].txtColorF
            }
        }
        var menu = contents.map((x, i) => {
            if (x.menu) {
                return {
                    id: i,
                    name: x.contents[0].name
                }
            }
        })
        return {
            contents: contents,
            menu: menu,
            layout: layout
        }
    },
    data() {
        return {
            scroll: false,
            drawer: false
        }
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
        },
        move (id) {
            return this.$vuetify.goTo(`#menu${id}`, this.option)
        }
    },
    computed: {
        menus () {
            return this.menu.filter(x => x)
        },
        option () {
            if (this.$vuetify.breakpoint.mdAndUp) {
                return {offset: 64}
            }
            else {
                return {offset: 56}
            }
        }
    }
}
</script>
