<template>
    <div>
        <button
            @click='updateList'
        >
            update list
        </button>

        <button @click='checkData'>
            check
        </button>

        <ul>
<!--             <equipment-list-item
                v-for='(item, index) in data'
                :key='"equipment"+index'
                :click='increase'
                :value='item.value'
                :index='index'
                :show='item.show'
                :toggleShow='toggleShow'
            /> -->
            <li
                v-for='(item, index) in data'
                :key='index'
                :style='{
                    background: item.value % 2 === 0 ? "rgba(255, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.25)",
                    opacity: item.show ? 1 : 0.25
                }'
                @click='increase(index)'
            >
                {{item.value}}
                <button @click='toggleShow(index)' >
                    toggle {{ item.show }}
                </button>
            </li>
        </ul>
    </div>
</template>

<script>


export default {
    components: {

    },

    data() {
        return {
            data: [],
        }
    },
    
    mounted() {
        console.log('equipment list mounted');
        this.updateList();
    },

    methods: {
        updateList() {
            console.log('updating list');
            this.data = Array(50000).fill(0).map((e, i) => ({
                id: i,
                value: 0,
                show: true
            }));
        },

        increase(index) {
            this.data[index].value++;

            this.data.push({ id: 1, value: 1, show: false });
        },

        checkData() {
            console.log(this.data);
        },

        toggleShow(index) {
            this.data[index].show = !this.data[index].show;
        }

    }
}
</script>

<style scoped>
li {
    width: 100%;
    padding: 10px;
    margin-bottom: 5px;
    cursor: pointer;
}
li:hover {
    background: #555;
    color: #ddd;
}
</style>
