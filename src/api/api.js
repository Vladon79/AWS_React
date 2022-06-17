import axios from "axios"

export const instance = axios.create({
	baseURL: "https://6kdlel44gd.execute-api.eu-central-1.amazonaws.com/Todolist/"
	// withCredentials: true прикреплять куку он ее ждет а я не отдаю
})

export const tasksAPI = {
	getTasks(pageCount, page, filter, sort, findByName, findMethod) {
		return instance.get(`task`, {
			params: {
				page,
				pageCount,
				filter,
				sort,
				findByName,
				findMethod
			}
		})
	},
	addTask(title, date) {
		return instance.post("task", { title, date, isChecked: false, type: "task" })
	},
	addFile(file) {
		return instance.post("task/file", file)
	},
	updateTask(task) {
		return instance.put("task", task)
	},
	deleteTask(id) {
		return instance.delete(`task?id=${id}`)
	}
}
