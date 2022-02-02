import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import Catalog from "@/components/Catalog/Catalog";

Vue.use(VueRouter)
export default new VueRouter({
        mode: 'history',
        routes: [
            {
                path: "/CurrentCategory/:id",
                name: "CurrentCategory",
                props: true,
                component :  Catalog
            }
        ],
    }
)

