import React from "react"
import { DatePicker, Space } from "antd"

const DataPiker = ({ data, setData }) => {
	const onChange = (date, dateString) => {
		 setData(dateString)
	}
	return (
		<Space direction="vertical">
			<DatePicker onChange={onChange} />
		</Space>
	)
}

export default DataPiker
