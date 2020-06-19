<template>
    <v-row class="px-2">
        <v-col
            v-for="post in posts.content"
            :key="post.id"
            cols="12"
            sm="6"
            md="4"
        >
            <v-card
                :to="(post.content == '') ? undefined : `/${post.params}/${post.id}/`"
                :color="color.post.bg"
                nuxt
            >
                <v-sheet tile :color="color.post.title.bg">
                    <v-card-title :class="`${color.post.title.txt}`">{{ post.title }}</v-card-title>
                    <v-card-subtitle
                        v-if="posts.listItems <= 1"
                        :class="`${color.post.sub.txt}`"
                    >
                        {{ post.date | format-date }}
                    </v-card-subtitle>
                </v-sheet>
                
                <v-divider></v-divider>
                
                <v-card-text
                    v-if="post.overview"
                    class="`${color.post.txt}`"
                >
                    {{ post.overview }}
                </v-card-text>
                
                <v-card-actions v-if="posts.listItems == 0 || posts.listItems == 2">
                    <v-spacer></v-spacer>
                    <v-chip
                        v-if="post.category"
                        :small="!$vuetify.breakpoint.xs"
                        :x-small="$vuetify.breakpoint.xs"
                        :color="post.color"
                        text-color="white"
                        class="mb-2 mr-2"
                    >
                        {{ post.category }}
                    </v-chip>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props: ['posts', 'color']
}
</script>