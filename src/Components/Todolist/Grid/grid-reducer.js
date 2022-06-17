const defaultState = {
	numberOfPages: 1,
	page: 1,
	pageCount: 5,
	tasksCount: 0,
	filter: "ALL",
	sort: "",
	findByName: {
		name: "",
		method: ""
	}
}

export const gridReducer = (state = defaultState, action) => {
	switch (action.type) {
		case "GET_GRID_OPTION": {
			return { ...state, numberOfPages: Math.ceil(action.tasksCount / action.pageCount), tasksCount: action.tasksCount }
		}
		case "SET_GRID_OPTION": {
			return { ...state, pageCount: action.pageCount, page: action.page }
		}
		case "SET_GRID_PAGE": {
			return { ...state, page: action.page }
		}
		case "SET_FILTER": {
			return { ...state, filter: action.filter }
		}
		case "SET_NAME_SORT": {
			return { ...state, sort: action.sort }
		}
		case "FIND_BY_NAME": {
			return { ...state, findByName: action.findByName }
		}
		default:
			return state
	}
}

export const getGridOptionAC = (tasksCount, pageCount, page) => {
	return {
		type: "GET_GRID_OPTION",
		tasksCount,
		page
	}
}

export const setGridOptionsAC = (pageCount, page) => {
	return {
		type: "SET_GRID_OPTION",
		pageCount,
		page
	}
}

export const setGridPageAC = (page) => {
	return {
		type: "SET_GRID_PAGE",
		page
	}
}

export const setFilterAC = (filter) => {
	return {
		type: "SET_FILTER",
		filter
	}
}

export const setNameSortAC = (sort) => {
	return {
		type: "SET_NAME_SORT",
		sort
	}
}

export const findByNameAC = (findByName) => {
	return {
		type: "FIND_BY_NAME",
		findByName
	}
}
