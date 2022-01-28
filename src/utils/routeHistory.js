import { reactive } from "vue"

const MAX_HISTORY_SIZE = 20

export const history = reactive([])

export function addRouteToHistory(to) {
    history.unshift(to)
    if (history.length > MAX_HISTORY_SIZE) {
        history.pop()
    }
}



/**
 * Returns the most recently used route
 * 
 * @param {String[]} argPathArray  [ '/people/:id', '/calendar' ]
 * @param {String} fallbackRoute  '/fallback'
 * @returns {String} The full path '/people/123'
 */
 export function getMostRecentMatchingPath (argPathArray, fallbackRoute) {
    if (!Array.isArray(argPathArray)) {
        throw new Error('argPathArray should be an array')
    }

    if (!fallbackRoute) {
        throw new Error('fallbackRoute needs to be defined')
    }

    for (const historyPath of history) {
        for (const argPath of argPathArray) {
            const pathname = historyPath.matched[0].path
            if (pathname === argPath) {
                return historyPath.fullPath || fallbackRoute
            }
        }
    }

    return fallbackRoute
}
