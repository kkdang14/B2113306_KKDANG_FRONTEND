<template>
    <div class="page">
        <h4>Thêm liên hệ mới</h4>
        <ContactForm :contact="{}" @submit:contact="createContact"/>
        <p>{{ message }}</p>
    </div>
</template>
<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";
export default {
    components: {
        ContactForm,
    },
    data() {
        return {
            message: "",
        };
    },
    methods: {   
        async createContact(data) {
            try {
                await ContactService.create(data);
                this.message = alert("Liên hệ mới đã được tạo thành công.");
                this.$router.push({ name: "contactbook" });
            } catch (error) {
                console.log(error);
            }
        },  
    }
};

</script>