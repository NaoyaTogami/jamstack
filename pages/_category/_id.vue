<template>
    <v-container :style="style">
        <v-sheet tile :color="color.bg">
            <v-row no-gutters>
                <v-col cols="12">
                    <v-card flat tile :color="color.title.bg">
                        <v-card-title :class="`title px-2 ${color.title.txt}`">
                            {{ originalPost.title }}
                        </v-card-title>
                    </v-card>
                </v-col>
            </v-row>
            
            <Post :post="post" :color="color" />
        </v-sheet>
    </v-container>
</template>

<script>
import Post from '~/components/post.vue';

export default {
    components: {
        Post
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
    async asyncData ({ app, params }) {
        var originalPost = await app.$axios.$get(`https://appo.microcms.io/api/v1/content/${params.id}`, {
            headers: { 'X-API-KEY': '773389cb-ee15-43bb-ac24-0b97255ed891' }
        })
        return {
            originalPost: originalPost,
        }
    },
    computed: {
        post () {
            var res = []
            this.originalPost.content.filter((x, i) => {
                if (x.item === 'i') {
                    res = [...res, {
                        id: i,
                        type: x.item,
                        xs: (x.xs)? x.xs : 12,
                        sm: (x.sm)? x.sm : 12,
                        md: (x.md)? x.md : 12,
                        content: x.content.slice(13, x.content.length - 10)
                    }]  
                }
                else {
                    res = [...res, {
                        id: i,
                        type: x.item,
                        xs: (x.xs)? x.xs : 12,
                        sm: (x.sm)? x.sm : 12,
                        md: (x.md)? x.md : 12,
                        content: x.content
                    }]
                }
            })
            return res
        },
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