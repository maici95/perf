<template>
    <li
        @click='click(index)'
        :style='{
            background: value % 2 === 0 ? "rgba(255, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.25)",
            opacity: show ? 1 : 0.25
        }'
    >
        {{ value }}

        <button @click='show = !show'>
            {{ show }}
        </button>
    </li>
</template>

<script>


export default {
    props: {
        click: Function,
        update: Function,
        value: [String, Number],
        index: [String, Number],
        //show: Boolean,
        //toggleShow: Function
    },

    data() {
        return {
            show: true,
            
        }
    },

    beforeUpdate() {
        console.log(123)
        //this.update(this.item.index, new Date().getTime());
    },

    methods: {

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
