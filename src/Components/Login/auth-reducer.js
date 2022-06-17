const defaultState = {
	email: "EMAIL",
	isAuth: false
}

export const authReducer = (state = defaultState, action) => {
	switch (action.type) {
		case "SET_IS_AUTH": {
			return {
				...state,
				isAuth: action.isAuth
			}
		}
		case "SET_EMAIL": {
			return {
				...state,
				email: action.email
			}
		}
		default:
			return state
	}
}

export const isAuthAC = (isAuth) => ({ type: "SET_IS_AUTH", isAuth })
export const setEmail = (email) => ({ type: "SET_EMAIL", email })
