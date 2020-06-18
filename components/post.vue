<template>
    <v-row class="px-4">
        <v-col
            v-for="item in post"
            :key="item.id"
            :cols="item.xs"
            :sm="item.sm"
            :md="item.md"
            class="align-self-center"
        >
            <template v-if="item.type === 'st'">
                <v-sheet tile :color="color.item.title.bg">
                    <div v-html="item.content" :class="`title ${color.item.title.txt}`"></div>
                </v-sheet>
            </template>
            
            <template v-if="item.type === 'c'">
                <div v-html="item.content"></div>    
            </template>
            
            <template v-if="item.type === 'i'">
                <v-img :src="item.content"></v-img> 
            </template>
            
            <template v-if="item.type === 't'">
                <v-row no-gutters>
                    <v-col cols="auto">
                        <v-simple-table>
                            <template v-slot:default>
                                <table v-html="item.content"></table>
                            </template>
                        </v-simple-table>
                    </v-col>
                </v-row>
            </template>
            
            <template v-if="item.type === 'tg'">
                <v-simple-table>
                    <template v-slot:default>
                        <table v-html="item.content"></table>
                    </template>
                </v-simple-table>
            </template>
            <template v-if="item.type === 'tg'" v-html="item.content"></template>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props: ['post', 'color']
}
</script>