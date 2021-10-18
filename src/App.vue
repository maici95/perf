<template>
    <div>

        <div
            style='
            position: absolute;
            top: 50px;
            left: 200px;
            z-index: 100000;
            background: rgba(255, 255, 255, .5);
            padding: 10px;
        '>
            <button
                @click='points = []'
            >drop points
            </button>

            <button
                @click='addPoint'
            >
                add marker
            </button>

            ini time: {{ iniTime }}
            <br>

            <div
                v-for='(patch, index) in points'
                :key='"patchthing"+index'
            >
                {{ index }} : {{ patch.length }} : show? {{ showPatch[index].show }}
                <button @click='togglePatch(index)'>toggle show</button>
            </div>
        </div>

        <l-map
            style='height: 100vh'
            :center='center'
            :zoom='zoom'
            ref='main'
            :maxZoom='12'
        >

            <l-tile-layer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />

                <marker-cluster
                    v-for='(patch, index) in points'
                    :key='"patch"+index'
                    :options='{
                        maxClusterRadius: 200
                    }'
                >
                    <template
                        v-if='showPatch[index].show'
                    >

                        <template
                            v-for='(point, index2) in patch'
                        >
                            <test-marker
                                :latLng='point.latLng'
                                :key='"point"+index2'
                                :color='getColor(index)'
                            />
                        </template>
                        
                    </template>
                </marker-cluster>



            <l-layer-group/>


            <template
                v-if='showPatch[0].show'
            >
                <marker-cluster
                    :options='{
                        maxClusterRadius: 150,
                        ...clusterOptions
                    }'
                >
                    <l-geo-json
                        :geojson='geojson'

                        :options='{
                            pointToLayer: pointToLayer,
                        }'

                    />
                </marker-cluster>
            </template>

            <l-polyline
                :latLngs='polylines'
            />

<!--             <marker-cluster v-once>
                <test-marker
                    v-for='(p, i) in geojson.features'
                    :key='"io"+i'
                    :latLng='p.geometry.coordinates'
                />
            </marker-cluster> -->


            <l-marker
                :latLng='highlightLatLng'
                :style='{zIndex: 10000}'
            >
                <l-popup>
                    point
                </l-popup>
            </l-marker>


        </l-map>


    </div>
</template>

<script>
import { LMap, LTileLayer, LLayerGroup, LGeoJson, LCircleMarker, LMarker, LPopup, LPolyline } from 'vue2-leaflet';

import Vue2LeadletMarkerCluster from 'vue2-leaflet-markercluster';
import TestMarker from './components/TestMarker.vue';
import L from 'leaflet';
import { DivIcon } from 'leaflet';
L;
LGeoJson;
LCircleMarker;

export default {
    components: {
        LPolyline,
        LPopup,
        TestMarker,
        'marker-cluster': Vue2LeadletMarkerCluster,
        LMap,
        LTileLayer,
        LLayerGroup,
        LGeoJson,
        LMarker
    },

    beforeUpdate() {
        //console.log('yepa');
    },

    created() {
        this.geojson = require('../test.json');

        console.log(this.geojson.features.length);

        const ps = [];

        for (let i = 0; i < 10; i++) {
            let lat = 62 + Math.random();
            let lng = 30 + Math.random();
            let a = [];
            for (let j = 0; j < 500; j++) {
                a.push([lat, lng]);
                lat += (Math.random() - 0.5) / 50;
                lng += (Math.random() - 0.5) / 100;
            }
            ps.push(a);
        }

        console.log(ps);

        this.polylines = ps;

/*         const N = 25000;
        this.geojson.features = Array(N).fill(0).map((e, i) => 
                    ({
                        "type": "Feature",
                        "properties": {
                            fill_level: Math.random() * 120,
                            id: i + 1
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                Math.random() * 3 + 27,
                                Math.random() * 1.5 + 62
                            ]
                        }
                    })
                ); */
    },

    data() {
        return {
            center: [62, 30],
            zoom: 10,

            points: Array(1).fill(0).map(() => Array(0).fill(0).map(() => ({
                    latLng: [(Math.random() * 0.5 + 62), (Math.random() * 1 + 30)],
                }))),
            iniTime: 0,

            polylines: [],

            colors: ['red', 'yellow', 'blue', 'purple', 'green'],

            showPatch: Array(1).fill(0).map(() => ({ show: true })),

            clusterOptions: {
                iconCreateFunction: (cluster) => {
                    let childCount = cluster.getChildCount();

                    return new DivIcon({
                        html: "<div class='marker-cluster'>" + childCount + "</div>",
                        className: 'dummy'
                    })
                }
            },
            
            highlightLatLng: [0, 0],

            geojson: {
                type: 'FeatureCollection',
                features: []
            }
        }
    },

    methods: {
        addPoint() {
            this.geojson.features.push({
                type: 'Feature',
                properties: {
                    fill_level: 66,
                    id: 2222222,
                },
                geometry: {
                    type: 'Point',
                    coordinates: [
                        Math.random() * 3 + 27,
                        Math.random() * 1.5 + 62
                    ]
                }
            });

        },

        getColor(index) {
            return this.colors[index];
        },

        togglePatch(index) {
            this.showPatch[index].show = !this.showPatch[index].show;
        },

        markerClickHandler(a) {
            console.log(a);
        },

        pointToLayer(a, b) {
            const el = L.marker(b, {
                icon: L.divIcon({
                    html: '<div class="marker" style="background: '+ (a.properties.fill_level > 40 ? "red" : "green") +'" >'+parseInt(a.properties.fill_level)+'%</div>',
                    className: 'dummy'
                })
            });

            el.on('click', () => this.testFunc(a.geometry.coordinates, a.properties))

            return el;
        },

/*         onEachFeature(data) {
            data;
        }, */


        testFunc(latLng, props) {
            console.log(props);
            this.highlightLatLng = [latLng[1], latLng[0]];
/*             console.log('id clicked => ', id);
            console.log(this.geojson.features[id - 1].properties.fill_level += 10); */
        },


    }

}
</script>

<style>
* {
    padding: 0;
    margin: 0;
}

.marker {
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: rgba(1,181,212, 0.75);
    border-radius: 100%;
}

.marker-cluster {
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-radius: 100%;
    background: rgba(20, 65, 132, 0.75);
    border: 5px solid rgba(20, 65, 132, 1);
    color: #fff;
}
</style>
