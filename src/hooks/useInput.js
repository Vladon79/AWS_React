import { useState } from "react"
import { useFormValid } from "./useFormValid"

export const useInput = (initValue, validations) => {
	const [value, setValue] = useState(initValue)
	const [isShow, setIsShow] = useState(false)
	const [isTouched, setIsTouched] = useState(false)
	const valid = useFormValid(value, isTouched, validations)

	const valueChange = (e) => {
		setValue(e.currentTarget.value)
	}
	const isShowChange = () => {
		setIsShow(!isShow)
	}
	const isTouchedOn = () => {
		setIsTouched(true)
	}
	const isTouchedOff = () => {
		setIsTouched(false)
	}

	return { value, isShow, isTouched, valueChange, isShowChange, isTouchedOn, isTouchedOff, ...valid }
}
