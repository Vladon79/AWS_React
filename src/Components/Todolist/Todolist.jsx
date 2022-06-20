import React from "react"
import { Button, Spin } from "antd"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getTasks } from "./todolist-reducer"
import { setFilterAC, setNameSortAC, findByNameAC, setGridPageAC } from "./Grid/grid-reducer"
import s from "./Todolist.module.css"
import { LoadingOutlined, SyncOutlined } from "@ant-design/icons"
import Grid from "./Grid/Grid"
import ModalAddTask from "./common/ModalAddTask/ModalAddTask"

const Todolist = () => {
	const dispatch = useDispatch()

	const spin = useSelector((state) => state.spin)
	const todolist = useSelector((state) => state.todolist)
	const page = useSelector((state) => state.grid.page)
	const pageCount = useSelector((state) => state.grid.pageCount)
	const filter = useSelector((state) => state.grid.filter)
	const sort = useSelector((state) => state.grid.sort)
	const findByName = useSelector((state) => state.grid.findByName)

	const [isModalVisible, setIsModalVisible] = useState(false)

	const showModal = () => {
		setIsModalVisible(true)
	}

	const rerenderPage = () => {
		dispatch(setFilterAC("All"))
		dispatch(setNameSortAC(""))
		dispatch(findByNameAC({ name: "", method: "" }))
		dispatch(setGridPageAC(1))
	}

	const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />

	useEffect(() => {
		dispatch(getTasks(pageCount, page, filter, sort, findByName))
	}, [page, pageCount, filter, sort, findByName])

	return (
		<div className={s.todolistContainer}>
			<ModalAddTask isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
			<section className={s.buttonContainer}>
				<Button type="link" onClick={rerenderPage} style={{ fontSize: 20, marginBottom: 10 }}>
					<SyncOutlined />
				</Button>
			</section>
			<section className={s.h2ButtonContainer}>
				<h2>Todolist</h2>
			</section>
			<div style={{height: 30}}>
				<Spin spinning={spin} indicator={antIcon} />
			</div>
			<section className={s.inputButtonSection}>
				<Button disabled={spin} type="primary" onClick={showModal}>
					Add new task
				</Button>
			</section>
			<Grid todolist={todolist} />
		</div>
	)
}

export default Todolist
