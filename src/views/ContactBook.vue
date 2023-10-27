<template>
    <div class="page row justify-content-between">
        <div class="col-md-11">
            <input-search v-model="searchText" />
        </div>
        <div class="mt-3 col-md-7">
            <h4>
                Danh bạ
                <i class="fas fa-contact-book"></i>
            </h4>
            <contact-list 
                v-if="filtedContactsCount > 0"
                :contacts="filtedContacts"
                :active-index="activeIndex"
                @update:active-index="updateActiveIndex"
            />
            <p v-else>Không có liên hệ nào</p>

            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="goToAddContact">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button
                class="btn btn-sm btn-danger"
                @click="removeAllContacts"
                >
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-5">
            <div v-if="activeContact">
                <h4>
                    Chi tiết Liên hệ 
                    <i class="fas fa-address-card"></i>
                </h4>
                <ContactCard :contact="activeContact" />
                
                <router-link
                    :to="{
                        name: 'contact.edit',
                        params: { id: activeContact._id },
                    }"
                >
                    <span class="mt-2 badge badge-warning">
                    <i class="fas fa-edit"></i> Hiệu chỉnh</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import ContactList from '../components/ContactList.vue'
import InputSearch from '../components/InputSearch.vue'
import ContactCard from '../components/ContactCard.vue';
import ContactService from "@/services/contact.service";
export default{
    components: { InputSearch, ContactList, ContactCard },

    data(){
        return{
            contacts: [],
            activeIndex: -1,
            searchText: ""
        }
    },

    watch: {
        searchText(){
            this.activeIndex = -1
        }
    },

    computed: {
        // Chuyển các đối tượng contact thành chuỗi
        contactStrings(){
            return this.contacts.map((contact) => {
                const { name, email, address, phone } = contact
                return [ name, email, address, phone ].join("");
            })
        },

        filtedContacts(){
            if(!this.searchText) return this.contacts
            return this.contacts.filter((_contact, index) =>
                this.contactStrings[index].includes(this.searchText)
            )
        },

        activeContact(){
            if(this.activeIndex < 0) return null
            return this.filtedContacts[this.activeIndex]
        },

        filtedContactsCount(){
            return this.filtedContacts.length
        }
    },

    methods:{
        async retrieveContacts(){
            try{
                this.contacts = await ContactService.getAll()
            }catch(error){
                console.log(error)
            }
        },

        updateActiveIndex(newIndex) {
            this.activeIndex = newIndex;
        },

        refreshList(){
            this.retrieveContacts()
            this.activeIndex = -1
        },

        async removeAllContacts(){
            if(confirm("Bạn muốn xóa liên lạc này?")){
                try{
                    this.contacts = await ContactService.deleteAll()
                    this.refreshList()
                }catch(error){
                    console.log(error)
                }
            }
        },

        goToAddContact(){
            this.$router.push({name: "contact.add"});
        },
    },

    mounted(){
        this.refreshList()
    },
};  
</script>

<style>
    .page{
        text-align: left;
        max-width: 750px;
    }
</style>