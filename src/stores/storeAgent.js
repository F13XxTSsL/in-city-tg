import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";
import {useStorage} from "@vueuse/core";

const httpNo = axios.create({
    baseURL: 'https://chatbot.incitystroy.ru/api',
    headers: {
        'Content-Type': 'application/json',
    }
})

const http = axios.create({
    baseURL: 'https://chatbot.incitystroy.ru/api',
    headers: {
        'Content-Type': 'application/json',
        'ICB2-API-Key': '$2b$12$AIiOK4PZfKXJxl9NZyCMZui6fINZoWWshI'
    }
})

export const useAgentStore = defineStore('agent', () => {

    const token = useStorage('token', '')
    const agent = useStorage('agent', {})
    const showCodeSubmit = ref(false)
    const loaderSubmit = ref(false)
    const curators = ref([])
    const clients = ref([])

    // const authAgent = async () => {
    //     const data = await httpNo.post(`/v1/auth/token`, {
    //         username: 'api_webapp',
    //         password: 'QWeAU!5594301'
    //     })
    //     console.log(data)
    // }
    
    const createAgent = async (params) => {
        try {
            await http.post('/v1/agent', {
                ...params.value,
                telegram_id: '',
                status: 'AWAITING_CURATOR'
            })
        } catch (e) {
            console.log(e, 'createAgent')
        }
    }
    const getAgent = async () => {
        const { data } = await http.get(`/v1/agent/tg-id/tgid-test`)
        agent.value = data
    }
    const createFixation = async (client) => {
        loaderSubmit.value = true

        try {
            delete client.agreement



            await http.post(`/v1/fixation`, {
                agent_telegram_id: 'tgid-test',
                client: {
                    ...client
                }
            })

            setTimeout(() => {
                loaderSubmit.value = false
                showCodeSubmit.value = true
            }, 2000)
        } catch (e) {
            console.log(e, 'createFixation')
            loaderSubmit.value = false
        }

    }
    const getAgentClients = async () => {
        const { data } = await http.get(`/v1/fixation`)
        clients.value = data
    }
    const getCurators = async () => {
        const { data } = await http.get(`/v1/curator`)

        curators.value = data
    }



    return {
        agent,
        curators,
        clients,
        showCodeSubmit,
        loaderSubmit,
        getAgent,
        createAgent,
        getCurators,
        createFixation,
        getAgentClients
    }
})
