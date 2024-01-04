import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	city: undefined,
};

const citySlice = createSlice({
	name: 'city',
	initialState: initialState,
	reducers: {
		updateCity(state, action) {
			state.city = action.payload
		}
	}
})

export const {
	updateCity
} = citySlice.actions;

export default citySlice.reducer;