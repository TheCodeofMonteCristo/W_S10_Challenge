import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    size: 'All',
}

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.size = action.payload
        }
    }
})

export const {
    setFilter
} = ordersSlice.actions

export default ordersSlice.reducer
