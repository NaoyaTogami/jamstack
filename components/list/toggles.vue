<template>
    <v-expansion-panels tile flat :color="color.post.bg">
        <v-expansion-panel
            v-for="post in posts.content"
            :key="post.id"
            
        >
            <v-sheet tile :color="color.post.title.bg">
                <v-expansion-panel-header class="py-0 px-4" flat>

                        <v-col cols="11" class="pa-0">
                            <v-list-item two-line class="pl-0 pr-sm-0">
                            <v-list-item-content>
                                <v-list-item-subtitle v-if="posts.menu.listItems <= 1" :class="`${color.post.sub.txt}`">{{ post.date | format-date }}</v-list-item-subtitle>
                                <v-list-item-title :class="`${color.post.title.txt} font-weight-bold`">{{ post.title }}</v-list-item-title>
                            </v-list-item-content>
                        
                            <v-list-item-action v-if="posts.menu.listItems == 0 || posts.menu.listItems == 2">
                                <v-chip
                                    v-if="post.category"
                                    :small="!$vuetify.breakpoint.xs"
                                    :x-small="$vuetify.breakpoint.xs"
                                    :color="post.category.color"
                                    text-color="white"
                                >
                                    {{ post.category.name }}
                                </v-chip>
                            </v-list-item-action>
                            </v-list-item>
                        </v-col>
                        
                        <template v-slot:actions>
                            <v-icon color="listPostSubTxt" large>mdi-menu-down</v-icon>
                        </template>
                </v-expansion-panel-header>
            </v-sheet>
            
            <v-sheet tile :color="color.post.bg">
                <v-expansion-panel-content>
                        <div v-if="post.overview" :class="`${color.post.txt}`">{{ post.overview }}</post></div>
                </v-expansion-panel-content>
            </v-sheet>
            
            <v-divider></v-divider>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
export default {
    props: ['posts', 'color']
}
</script>