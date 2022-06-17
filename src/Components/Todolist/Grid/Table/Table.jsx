import { DeleteFilled } from "@ant-design/icons"
import { Button, Checkbox, Input, Modal } from "antd"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteTask, updateTask } from "../../todolist-reducer"
import s from "./Table.module.css"

const Table = (task) => {
	const [onChangeTaskName, setOnChangeTaskName] = useState(false)
	const [newName, setNewName] = useState(task.title)

	const spin = useSelector((state) => state.spin)

	const dispatch = useDispatch()
	const [isModalVisible, setModalIsOpen] = useState(false)
	const onChangeCheck = () => {
		const newTask = { ...task, isChecked: !task.isChecked }
		dispatch(updateTask(newTask))
	}
	const updateTaskName = () => {
		const newTask = { ...task, title: newName }
		setOnChangeTaskName(false)
		dispatch(updateTask(newTask))
	}
	const deleteHandler = () => {
		setModalIsOpen(true)
	}
	const handleOk = () => {
		dispatch(deleteTask(task.id))
		setModalIsOpen(false)
	}
	const handleCancel = () => {
		setModalIsOpen(false)
	}

	return (
		<div className={s.grid}>
			<Modal title="Delete task" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}></Modal>
			<div className={s.name}>
				{!onChangeTaskName ? (
					<p onDoubleClick={() => setOnChangeTaskName(true)}>{task.title}</p>
				) : (
					<section>
						<Input value={newName} autoFocus onChange={(e) => setNewName(e.currentTarget.value)} onBlur={updateTaskName} />
					</section>
				)}
			</div>
			<div className={s.data}>{task.date}</div>
			<div className={s.check}>
				<Checkbox disabled={spin} checked={task.isChecked} onChange={onChangeCheck} style={{ marginRight: 5 }} />
			</div>
			<div className={s.delete}>
				<Button disabled={spin} type="link" danger onClick={deleteHandler} style={{ padding: 2 }}>
					<DeleteFilled />
				</Button>
			</div>
		</div>
	)
}

export default Table
