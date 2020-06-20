<template>
    <v-sheet class="py-0" tile>
        <template v-for="post in posts.content">
            <v-sheet tile :color="color.post.title.bg">
                <v-list-item
                    :key="post.id"
                    two-line
                    @click="$router.push(`/${post.params}/${post.id}/`)"
                    :disabled="post.content==''"
                >
                    <v-list-item-content>
                        <v-list-item-subtitle
                            v-if="posts.listItems <= 1"
                            :class="`${color.post.sub.txt}`"
                        >
                            {{ post.date | format-date }}
                        </v-list-item-subtitle>
                        
                        <v-list-item-title :class="`${color.post.title.txt}  font-weight-bold`">{{ post.title }}</v-list-item-title>
                        
                        <v-list-item-subtitle v-if="post.overview" :class="`${color.post.txt}`">{{ post.overview }}</v-list-item-subtitle>
                    </v-list-item-content>
                    
                    <v-list-item-action v-if="posts.listItems == 0 || posts.listItems == 2">
                        <v-chip
                            v-if="post.category"
                            :small="!$vuetify.breakpoint.xs"
                            :x-small="$vuetify.breakpoint.xs"
                            :color="post.color"
                            text-color="white"
                        >
                            {{ post.category }}
                        </v-chip>
                    </v-list-item-action>
                </v-list-item>
            </v-sheet>
            <v-divider></v-divider>
        </template>
    </v-sheet>
</template>

<script>
export default {
    props: ['posts', 'color']
}
</script>