import { message } from "antd"
import { tasksAPI } from "../../api/api"
import { getGridOptionAC } from "./Grid/grid-reducer"
import { setSpinAC } from "./spin-reducer"

export const todolistReducer = (state = [], action) => {
	switch (action.type) {
		case "GET_TASKS": {
			return action.tasks
		}
		case "DELETE_TASK": {
			return state.filter((t) => t.id !== action.id && t)
		}
		case "ADD_TASK": {
			return [action.task, ...state]
		}
		case "CHECK_TASK": {
			return state.map((t) => (t._id === action.task._id ? action.task : t))
		}
		case "UPDATE_TASK": {
			return state.map((t) => (t.id === action.task.id ? action.task : t))
		}
		default:
			return state
	}
}
export const getTasksAC = (tasks) => {
	return {
		type: "GET_TASKS",
		tasks
	}
}

export const deleteTaskAC = (id) => {
	return {
		type: "DELETE_TASK",
		id
	}
}

export const addTaskAC = (task) => {
	return {
		type: "ADD_TASK",
		task
	}
}

export const checkTaskAC = (task) => {
	return {
		type: "CHECK_TASK",
		task
	}
}
export const updateTaskAC = (task) => {
	return {
		type: "UPDATE_TASK",
		task
	}
}

export const getTasks = (pageCount, page, filter, sortName, findByName) => async (dispatch) => {
	try {
		dispatch(setSpinAC(true))
		const res = await tasksAPI.getTasks(pageCount, page, filter, sortName, findByName.name, findByName.method)
		if (res.status === 200) {
			dispatch(getTasksAC(res.data.body.todolist.Items))
			// console.log(res.data.body.)
			dispatch(getGridOptionAC(res.data.body.tasksCount, res.data.body.pageCount, res.data.body.page))
		} else {
			message.error("Error")
		}
	} catch (e) {
		return message.error(e.message)
	} finally {
		dispatch(setSpinAC(false))
	}
}

export const addTask = (title, date) => async (dispatch, getState) => {
	try {
		dispatch(setSpinAC(true))
		const res = await tasksAPI.addTask(title, date)
		if (res.status === 200) {
			message.success(`Task ${title} has been added`)
			// dispatch(addTaskAC(res.data))
			const state = getState()
			const gridState = state.grid
			await dispatch(getTasks(gridState.pageCount, gridState.page, gridState.filter, gridState.sort, gridState.findByName))
		} else {
			message.error("Error")
		}
	} catch (e) {
		return message.error(e.message)
	} finally {
		dispatch(setSpinAC(false))
	}
}
export const deleteTask = (id) => async (dispatch, getState) => {
	try {
		dispatch(setSpinAC(true))
		const res = await await tasksAPI.deleteTask(id)
		if (res.status === 200) {
			message.success(`Task has been removed`)
			dispatch(deleteTaskAC(id))
			const state = getState()
			const gridState = state.grid
			await dispatch(getTasks(gridState.pageCount, gridState.page, gridState.filter, gridState.sort, gridState.findByName))
		} else {
			message.error("Error")
		}
	} catch (e) {
		return message.error(e.message)
	} finally {
		dispatch(setSpinAC(false))
	}
}

export const updateTask = (task) => async (dispatch) => {
	try {
		dispatch(setSpinAC(true))
		const res = await tasksAPI.updateTask(task)
		if (res.status === 200) {
			dispatch(updateTaskAC(res.data.task))
		} else {
			message.error("Error")
		}
	} catch (e) {
		return message.error(e.message)
	} finally {
		dispatch(setSpinAC(false))
	}
}
