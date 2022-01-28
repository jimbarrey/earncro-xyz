import { reactive } from 'vue'

const store = {
    state: reactive({
        progress: 0,
    }),

    /**
     * 
     * @param { import('axios').AxiosInstance } instance 
     */
    setInterceptors(instance) {
        instance.defaults.onUploadProgress = (progressEvent) => {
            this.state.progress = progressEvent.loaded
        }
        instance.defaults.onDownloadProgress = (progressEvent) => {
            this.state.progress = progressEvent.loaded
        }

        instance.interceptors.request.use((config) => {
            // Do something before request is sent
            this.state.progress = 0.05
            return config
        }, (error) => {
            this.state.progress = 0.05
            return Promise.reject(error)
        })

        // Add a response interceptor
        instance.interceptors.response.use((response) => {
            this.state.progress = 0
            return response
        }, (error) => {
            this.state.progress = 0
            return Promise.reject(error)
        })
    },
}

export default store