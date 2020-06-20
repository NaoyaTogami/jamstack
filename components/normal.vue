<template>
    <v-row no-gutters>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="6" md="4" class="px-2 pt-4">
            <v-select
              v-model="selected"
              :items="postsGroups.categories"
              item-text="name"
              item-value="name"
              label="カテゴリ指定"
              multiple
              outlined
              dense
            >
            </v-select>
        </v-col>
        <v-col cols="12">
            <Change :posts="filterdPosts" :color="color" />   
        </v-col>
    </v-row>
</template>

<script>
import Change from '~/components/change.vue';

export default {
    components: {
        Change
    },
    data() {
        return {
            selected: '',
        }
    },
    computed: {
        filterdPosts () {
            var posts = this.postsGroups
            var selected = this.selected
            
            if(selected != ''){
                posts.content = posts.content.filter(x => selected.includes(x.category.name))
            }
            
            return posts
        }
    },
    props: ['postsGroups', 'color']
}
</script>