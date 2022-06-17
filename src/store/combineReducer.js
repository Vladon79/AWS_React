import { combineReducers } from "redux"
import { authReducer } from "../Components/Login/auth-reducer"
import { paginatorReducer } from "../Components/Login/paginator-reducer"
import { gridReducer } from "../Components/Todolist/Grid/grid-reducer"
import { spinReducer } from "../Components/Todolist/spin-reducer"
import { todolistReducer } from "../Components/Todolist/todolist-reducer"

export const combineReducer = combineReducers({
	todolist: todolistReducer,
	grid: gridReducer,
	auth: authReducer,
	spin: spinReducer,
	paginator: paginatorReducer
})
