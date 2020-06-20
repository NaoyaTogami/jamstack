<template>
    <v-card tile color="tabBg">
        <v-tabs
            v-model="tab"
            :vertical="$vuetify.breakpoint.xs"
            background-color="transparent"
            color="tabTxt"
            grow
        >
            <v-tab
                v-for="postsGroup in postsGroups"
                :key="postsGroup.category.id"
            >
                {{ postsGroup.category.name }}
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item
                v-for="postsGroup in postsGroups"
                :key="postsGroup.category.id"
            >
                <v-card tile flat :color="color.bg">
                    <Change :posts="postsGroup.content" :color="color" />
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>
import Change from '~/components/change.vue';

export default {
    components: {
        Change
    },
    data() {
        return {
            tab: null,
        }
    },
    props: ['postsGroups', 'color']
}
</script>