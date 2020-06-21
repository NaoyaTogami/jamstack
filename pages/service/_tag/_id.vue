<template>
    <v-container :style="style">
        <v-sheet tile :color="color.bg">
            <v-row no-gutters>
                <v-col cols="12">
                    <v-card flat tile :color="color.title.bg">
                        <v-card-title :class="`title px-2 ${color.title.txt}`">
                            {{ posts.tag.name }}
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
                            <span class="d-none d-md-flex">{{ item.now }}</span>
                            <span>{{ item.text }}</span>
                          </v-breadcrumbs-item>
                        </template>
                    </v-breadcrumbs>
                </v-col>
            </v-row>
            <v-card tile color="tabBg">
                <v-tabs
                    v-model="tab"
                    :vertical="$vuetify.breakpoint.xs"
                    background-color="transparent"
                    color="tabTxt"
                    grow
                >
                    <v-tab
                        v-for="categoryPosts in posts.content"
                        :key="categoryPosts.category.id"
                    >
                        {{ categoryPosts.category.name }}
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item
                        v-for="categoryPosts in posts.content"
                        :key="categoryPosts.category.id"
                    >
                        <v-row class="px-2">
                            <v-col
                                v-for="post in categoryPosts.content"
                                :key="post.id"
                                cols="12"
                                md="6"
                            >
                                <v-card
                                    :color="color.post.bg"
                                    flat
                                    tile
                                >
                                    <v-sheet tile :color="color.post.title.bg">
                                        <v-card-title :class="`${color.post.title.txt}`">{{ post.title }}</v-card-title>
                                    </v-sheet>
                                    
                                    <v-divider></v-divider>
                                    
                                    <v-card-text
                                        v-if="post.overview"
                                        class="`${color.post.txt}`"
                                    >
                                        {{ post.overview }}
                                    </v-card-text>
                                    
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
        </v-sheet>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            tab: null,
            color: {
                bg:'postBg',
                title: {bg: 'postTitleBg', txt: 'postTitleTxt--text'},
                item: {
                    bg: 'postItemBg',
                    title: {bg: 'postItemTitleBg', txt: 'postItemTitleTxt--text'}
                },
                post: {
                    bg: 'listPostBg',
                    txt: 'listPostText--text',
                    title: {
                        bg: 'listPostTitleBg',
                        txt: 'listPostTitleText--text'
                    }
                }
            },
        }
    },
    async asyncData ({ app, payload, store, params, route }) {
        if(payload){
            store.commit('setMenu', payload.menu)
            return {posts: payload.contents}
        }
        else{
            var tag = await app.$axios.$get(`https://appo.microcms.io/api/v1/tag?filters=params[equals]${params.tag}`, {
                headers: { 'X-API-KEY': '773389cb-ee15-43bb-ac24-0b97255ed891' }
            })
            tag = tag.contents[0]
            var menuParams = route.path
            
            menuParams = menuParams.slice(1, menuParams.length - params.tag.length - 1)
            
            var posts = await app.$axios.$get(`https://appo.microcms.io/api/v1/content?filters=tag[contains]${tag.id}`, {
                headers: { 'X-API-KEY': '773389cb-ee15-43bb-ac24-0b97255ed891' }
            })
            posts = posts.contents.filter(a => a.menu.params == menuParams)
            
            var categories = posts.map(x => x.category).flat()
            
            categories = [...new Map(categories.map(x => [x.id, x])).values()]
            
            var categoryPosts = []
            var categoriesPosts = categories.map(y => {
                categoryPosts = []
                categoryPosts.category = y
                categoryPosts.content = posts.filter(z => z.category.name == y.name)
                return categoryPosts
            })
            
            return {
                posts: {
                    content:categoriesPosts,
                    categories: categories,
                    tag:tag
                }
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
                {text: this.posts.content[0].content[0].menu.title, icon: this.posts.content[0].content[0].menu.icon, disabled: false, to: `/${this.posts.content[0].content[0].menu.params}`},
                {now: this.posts.tag.name, icon: this.posts.tag.icon, disabled: true, to: `${this.$route.path}`},
                ]
        }
    }
}
</script>