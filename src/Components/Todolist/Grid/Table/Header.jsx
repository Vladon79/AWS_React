import { Button, Select } from "antd"
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import s from "./Header.module.css"
import { setFilterAC, setNameSortAC } from "../grid-reducer"
import MyPopover from "./Popover/MyPopover"

const Header = () => {
	const spin = useSelector((state) => state.spin)
	const filter = useSelector((state) => state.grid.filter)

	const { Option } = Select
	const handleChange = (value) => {
		if (value === "Completed") {
			dispatch(setFilterAC("Completed"))
		} else if (value === "Active") {
			dispatch(setFilterAC("Active"))
		} else {
			dispatch(setFilterAC("All"))
		}
	}

	const sort = useSelector((state) => state.grid.sort)
	const dispatch = useDispatch()
	const nameSortClickHandler = () => {
		if (sort !== "AscName" && sort !== "DescName") {
			dispatch(setNameSortAC("AscName"))
		} else if (sort === "AscName") {
			dispatch(setNameSortAC("DescName"))
		} else {
			dispatch(setNameSortAC("AscName"))
		}
	}
	const dataSortClickHandler = () => {
		if (sort !== "AscData" && sort !== "DescData") {
			dispatch(setNameSortAC("AscData"))
		} else if (sort === "AscData") {
			dispatch(setNameSortAC("DescData"))
		} else {
			dispatch(setNameSortAC("AscData"))
		}
	}

	return (
		<header>
			<div className={s.name}>
				<Button style={{ color: "#fff" }} type="text" className={s.nameTitle} disabled={spin} onClick={nameSortClickHandler}>
					Name
					{sort === "AscName" && (
						<span className={s.arrow}>
							<ArrowUpOutlined />
						</span>
					)}
					{sort === "DescName" && (
						<span className={s.arrow}>
							<ArrowDownOutlined />
						</span>
					)}
				</Button>
				<MyPopover />
			</div>
			<div className={s.data}>
				<Button style={{ color: "#fff" }} type="text" disabled={spin} onClick={dataSortClickHandler}>
					Data
					{sort === "AscData" && (
						<span className={s.arrow}>
							<ArrowUpOutlined />
						</span>
					)}
					{sort === "DescData" && (
						<span className={s.arrow}>
							<ArrowDownOutlined />
						</span>
					)}
				</Button>
			</div>
			<div className={s.check}>
				<Select
					value={filter}
					style={{
						width: 100
					}}
					onChange={handleChange}
				>
					<Option value="All">All</Option>
					<Option value="Active">Active</Option>
					<Option value="Completed">Completed</Option>
				</Select>
			</div>
			<div className={s.delete}>Delete</div>
		</header>
	)
}

export default Header
