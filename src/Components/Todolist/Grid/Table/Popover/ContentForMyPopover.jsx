import { Button, Input, Radio } from "antd"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { findByNameAC } from "../../grid-reducer"
import s from "./MyPopover.module.css"

const ContentForMyPopover = ({ setVisible }) => {
	const findByName = useSelector((state) => state.grid.findByName)
	const dispatch = useDispatch()
	const [name, setName] = useState(findByName.name)
	const onChangeInputValue = (e) => {
		setName(e.currentTarget.value)
	}
	const [method, setMethod] = useState("")

	const onChangeRadioValue = (e) => {
		setMethod(e.target.value)
	}

	const findHandler = () => {
		dispatch(findByNameAC({ name, method }))
		setVisible(false)
	}
	const resetHandler = () => {
		dispatch(findByNameAC({ name: "", method: "" }))
		setVisible(false)
		setName("")
		setMethod("")
	}

	return (
		<div className={s.containerFormyPopover}>
			<Input className={s.input} value={name} onChange={onChangeInputValue} />
			<section className={s.radioGroup}>
				<Radio.Group onChange={onChangeRadioValue} value={method}>
					<Radio value={"Equals"}>Equals</Radio>
					<Radio value={"Contains"}>Contains</Radio>
				</Radio.Group>
			</section>
			<Button disabled={name === "" || method === ""} type="primary" onClick={findHandler} style={{ padding: 5, marginBottom: 10 }}>
				Find
			</Button>
			<Button type="primary" danger onClick={resetHandler} style={{ padding: 5 }}>
				Reset
			</Button>
		</div>
	)
}

export default ContentForMyPopover
