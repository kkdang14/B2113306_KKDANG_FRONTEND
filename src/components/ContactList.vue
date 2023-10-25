<template>
    <ul class="list-group">
        <li
        class="list-group-item"
        v-for="(contact, index) in contacts"
        :key="contact._id"
        :class="{active: index === activeIndex}"
        @click="updateActiveIndex(index)"
        >
        {{ contact.name }}
        </li>
    </ul>
</template>

<script>
export default{
    props:{
        contacts: Array,
        activeIndex: Number
    },

    emits: ["update:activeIndex"],
    methods:{
        updateActiveIndex(index){
            this.$emit("update:activeIndex", index);
        }
    }
}
</script>

<style>
    
</style>