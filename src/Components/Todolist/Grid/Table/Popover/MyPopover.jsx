import { FilterFilled, FilterOutlined } from "@ant-design/icons"
import { Button, Popover } from "antd"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import ContentForMyPopover from "./ContentForMyPopover"

const MyPopover = () => {
	const findByName = useSelector((state) => state.grid.findByName.name)
	const [visible, setVisible] = useState(false)

	const handleVisibleChange = (newVisible) => {
		setVisible(newVisible)
	}
	return (
		<Popover content={<ContentForMyPopover setVisible={setVisible} />} title="Filtering" trigger="click" visible={visible} onVisibleChange={handleVisibleChange}>
			<Button type="link">
				{findByName ? <FilterFilled /> : <FilterOutlined />}
			</Button>
		</Popover>
	)
}

export default MyPopover
