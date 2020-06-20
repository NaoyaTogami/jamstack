<template>
    <v-row class="px-4">
        <v-col
            v-for="item in post"
            :key="item.id"
            :cols="(item.xs)? item.xs : 12"
            :sm="(item.sm)? item.sm : 12"
            :md="(item.md)? item.md : 12"
            class="align-self-center"
        >
            <template v-if="item.type === 'st'">
                <v-sheet tile :color="color.item.title.bg">
                    <div v-html="item.content" :class="`title ${color.item.title.txt}`"></div>
                </v-sheet>
            </template>
            
            <template v-if="item.type === 'c'">
                <v-sheet tile :color="color.item.bg">
                    <div v-html="item.content"></div>
                </v-sheet>
            </template>
            
            <template v-if="item.type === 'i'">
                <v-sheet tile :color="color.item.bg">
                    <v-img :src="item.content"></v-img>
                </v-sheet>
            </template>
            
            <template v-if="item.type === 't'">
                <v-sheet tile :color="color.item.bg">
                    <v-row no-gutters>
                        <v-col cols="auto">
                            <v-simple-table>
                                <template v-slot:default>
                                    <table v-html="item.content"></table>
                                </template>
                            </v-simple-table>
                        </v-col>
                    </v-row>
                </v-sheet>
            </template>
            
            <template v-if="item.type === 'tg'">
                <v-sheet tile :color="color.item.bg">
                    <v-simple-table>
                        <template v-slot:default>
                            <table v-html="item.content"></table>
                        </template>
                    </v-simple-table>
                </v-sheet>
            </template>
            <template v-if="item.type === 'o'">
                <v-sheet tile :color="color.item.bg">
                    <div v-html="item.content"></div>
                </v-sheet>
            </template>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props: ['post', 'color']
}
</script>