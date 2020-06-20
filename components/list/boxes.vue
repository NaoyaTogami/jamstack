<template>
    <v-row no-gutters>
        <v-col
            v-for="post in posts.content"
            :key="post.id"
            cols="12"
            :color="color.post.bg"
            class="px-sm-4 pt-sm-4 pb-10"
        >
            <v-sheet tile :color="color.post.bg">
                <v-sheet tile :color="color.post.title.bg">
                    <v-row>
                        <v-col cols="auto">
                            <div :class="`mx-4 title ${color.post.title.txt}`">{{ post.title }}</div>
                        </v-col>
                        
                        <v-spacer></v-spacer>
                        
                        <v-col cols="auto" v-if="posts.menu.listItems <= 1" class="align-self-center">
                            <div :class="`mx-4 caption ${color.post.sub.txt}`">{{ post.date | format-date }}</div>
                        </v-col>
                    </v-row>
                </v-sheet>
                <v-row>
                    <v-col cols="12" v-if="post.overview">
                        <div :class="`mx-4 caption ${color.post.txt}`">{{ post.overview }}</div>
                    </v-col>
                </v-row>
                
                <Post :post="post.content" :color="color" />
                
                <v-row v-if="posts.menu.listItems == 0 || posts.menu.listItems == 2" class="px-4 pb-4" no-gutters>
                    <v-spacer></v-spacer>
                    <v-col cols="auto">
                        <v-chip
                            v-if="post.category"
                            :small="!$vuetify.breakpoint.xs"
                            :x-small="$vuetify.breakpoint.xs"
                            :color="post.category.color"
                            text-color="white"
                        >
                            {{ post.category.name }}
                        </v-chip>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
            </v-sheet>
        </v-col>
    </v-row>
</template>

<script>
import Post from '~/components/post.vue';

export default {
    components: {
        Post
    },
    props: ['posts', 'color']
}
</script>