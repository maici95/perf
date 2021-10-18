<template>
    <l-marker
        :latLng='latLng'
        @click='clickHandler'
    >
        <l-icon>
            <div
                :style='{
                    width: "25px",
                    height: "25px",
                    borderRadius: "100%",
                    textAlign: "center",
                    lineHeight: "25px",
                    background: color
                }'
            >
                123
            </div>
        </l-icon>
    </l-marker>
    
<!--     <l-circle-marker
        :latLng='latLng'
        :fillColor='color'
        :color='color'
    /> -->

</template>

<script>
import { LMarker, LIcon, /* LCircleMarker */ } from 'vue2-leaflet';

export default {
    components: {
        LMarker,
        LIcon,
        /* LCircleMarker, */
    },

    props: {
        latLng: Array,
        color: {
            type: String,
            default: () => 'red'
        }
    },

    beforeUpdate() {
        console.log('marker updated...');
    },

    methods: {
        clickHandler() {
            console.log('marker clicked...');
        },

    }

}
</script>
