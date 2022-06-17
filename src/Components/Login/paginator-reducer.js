export const paginatorReducer = (paginator = true, action) => {
	switch (action.type) {
		case "SET_PAGINATOR": {
			return action.paginator
		}
		default:
			return paginator
	}
}
export const setPaginatorAC = (paginator) => {
	return {
		type: "SET_PAGINATOR",
		paginator
	}
}