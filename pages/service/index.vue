<template>
    <v-container :style="style">
        <v-sheet tile :color="color.bg">
            <v-row no-gutters>
                <v-col cols="12">
                    <v-card
                        flat
                        tile
                        :color="color.title.bg"
                    >
                        <v-card-title
                            :class="`title px-2 ${color.title.txt}`"
                        >
                            {{ menu.title }}
                        </v-card-title>
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
                    v-for="tag in tags"
                    :key="tag.id"
                    cols="12"
                    sm="6"
                    md="4"
                >
                    <v-card
                        :to="`/${$route.name}/${tag.params}`"
                        nuxt
                    >
                        <v-sheet tile :color="color.post.title.bg">
                        <v-card-title :class="`${color.post.title.txt} body-1 font-weight-bold`">{{ tag.name }}</v-card-title>
                    </v-sheet>
                    
                    <v-divider></v-divider>
                    
                    <v-card-text
                        v-if="tag.content"
                        class="`${color.post.txt}`"
                    >
                        {{ tag.content }}
                    </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-sheet>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            color: {
                bg: 'listBg',
                title: {bg: 'listTitleBg', txt: 'listTitleTxt--text'},
                post: {
                    bg: 'listPostBg',
                    txt: 'listPostTxt--text',
                    title: {bg: 'listPostTitleBg', txt: 'listPostTitleTxt--text'},
                    sub: {txt: 'listPostSubTxt--text'}
                    
                },
            }
        }
    },
    async asyncData ({ app, payload, store, route }) {
        if(payload){
            store.commit('setMenu', payload.menu)
            return {tags: payload.contents}
        }
        else{
            var menu = await app.$axios.$get(`https://appo.microcms.io/api/v1/menu?filters=params[equals]${route.name}`, {
                headers: { 'X-API-KEY': '773389cb-ee15-43bb-ac24-0b97255ed891' }
            })
            menu = menu.contents[0]
            var posts = await app.$axios.$get(`https://appo.microcms.io/api/v1/content?filters=menu[equals]${menu.id}`, {
                headers: { 'X-API-KEY': '773389cb-ee15-43bb-ac24-0b97255ed891' }
            })
            var tags = posts.contents.map(x => x.tag).flat()
            tags = [...new Map(tags.map(x => [x.id, x])).values()]
            tags = tags.sort((a, b) => {
                return a.order - b.order
            })
            
            return {
                menu: menu,
                tags: tags
            }
        } 
    },
    computed: {
        style () {
            if (this.$vuetify.breakpoint.mdAndUp) {
                return 'margin-top:64px;'
            }
            else {
                return 'margin-top:56px;'
            }
        },
        breadcrumbs () {
            return [
                {text: 'ホーム', icon: 'mdi-home', disabled: false, to: '/'},
                {text: this.menu.title, icon: this.menu.icon, disabled: false, to: `${this.$route.path}`},
            ]
        }
    }
}
</script>
