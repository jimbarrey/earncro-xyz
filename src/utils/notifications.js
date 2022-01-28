import { reactive } from 'vue'

/**
 * @typedef Notification
 * @prop { 'lock-closed'|'x-circle'|'check'|'wave' } icon hard coded icons for now
 * @prop { string } title
 * @prop { string } description
 */

const store = {
    state: reactive({
        notifications: [],
    }),

    /**
     * @param {Notification} notif 
     */
    addNotification(notif) {
        this.state.notifications.push(notif)
        if (this.state.notifications.length > 3) {
            this.state.notifications.shift()
        }
        setTimeout(() => {
            this.closeNotification(notif)
        }, 6000)
    },

    showError(input, description) {
        if (typeof input === 'string') {
            this.addNotification({
                icon: 'x-circle',
                title: input,
                description,
            })
            return
        }

        let title = 'Error'

        if (typeof input === 'object') {
            console.error(input)
            const vmException = "Error: VM Exception while processing transaction: reverted with reason string "
            const msg = input?.data?.message || input?.message
            title = description || 'Transaction failed'
            
            if (msg?.startsWith(vmException)) {
                description = msg.substring(vmException.length)
                if (description.startsWith("'") && description.endsWith("'")) {
                    description = description.substring(1, description.length - 1)
                }
            } else {
                description = msg
            }
        }

        this.addNotification({
            icon: 'x-circle',
            title,
            description,
        })
    },

    showSuccess(title, description) {
        this.addNotification({
            icon: 'check',
            title,
            description,
        })
    },

    /**
     * @param {Notification} notif
     */
    closeNotification(notif) {
        const index = this.state.notifications.indexOf(notif)
        if (index > -1) {
            this.state.notifications.splice(index, 1)
        }
    },
}

export default store