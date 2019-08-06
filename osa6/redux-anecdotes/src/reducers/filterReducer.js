const initialState = { value: '' }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return { value: action.data }
        default:
            return state
    }
}

export const setFilter = (filter) => ({
    type: 'SET_FILTER',
    data: filter
})

export const clearFilter = () => ({
    type: 'SET_FILTER',
    data: ''
})

export default reducer