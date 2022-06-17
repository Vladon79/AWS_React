export const spinReducer = (spin = false, action) => {
	switch (action.type) {
		case "SET_SPIN": {
			return action.spin
		}
		default:
			return spin
	}
}
export const setSpinAC = (spin) => {
	return {
		type: "SET_SPIN",
		spin
	}
}
