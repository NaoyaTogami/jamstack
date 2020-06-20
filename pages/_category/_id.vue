<template>
    <v-container :style="style">
        <v-sheet tile :color="color.bg">
            <v-row no-gutters>
                <v-col cols="12">
                    <v-card flat tile :color="color.title.bg">
                        <v-card-title :class="`title px-2 ${color.title.txt}`">
                            {{ post.title }}
                        </v-card-title>
                    </v-card>
                </v-col>
            </v-row>
            
            <Post :post="post.content" :color="color" />
        </v-sheet>
    </v-container>
</template>

<script>
import Post from '~/components/post.vue';

export default {
    components: {
        Post
    },
    async asyncData ({ app, payload, store, params }) {
        if(payload){
            store.commit('setMenu', payload.menu)
            return {post: payload.contents}
        }
        
    },
    data() {
        return {
            color: {
                bg:'postBg',
                title: {bg: 'postTitleBg', txt: 'postTitleTxt--text'},
                item: {
                    bg: 'postItemBg',
                    title: {bg: 'postItemTitleBg', txt: 'postItemTitleTxt--text'}
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
        }
        
    }
}
</script>