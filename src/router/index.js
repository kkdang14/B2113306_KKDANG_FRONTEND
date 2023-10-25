import { createRouter, createWebHistory } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";
import ContactAdd from "@/views/ContactAdd.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
    {
        path: "/",
        name: "contactbook",
        component: ContactBook
    },

    {
        path:"/add",
        name: "contact.add",
        component: ContactAdd
    },

    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;

