<template>
    <component :is="component" :posts="posts" :color="color"></component>
</template>

<script>
import Boxes from '~/components/list/boxes.vue';
import Cards from '~/components/list/cards.vue';
import Lines from '~/components/list/lines.vue';
import Toggles from '~/components/list/toggles.vue';

export default {
    components: {
        Boxes,
        Cards,
        Lines,
        Toggles,
    },
    computed: {
        component () {
            switch (this.posts.layout) {
                case 'b':
                    return 'Boxes';
                    break;
                case 'c':
                    return 'Cards';
                    break;
                case 'l':
                    return 'Lines';
                    break;
                case 't':
                    return 'Toggles';
                    break;
                default:return null;
            }
        }
    },
    props: ['posts', 'color']
}
</script>