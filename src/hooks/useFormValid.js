import { useEffect, useState } from "react"

export const useFormValid = (value, isTouched, validations = []) => {
	const [error, setError] = useState("1")
	const minLength = 8
	const maxLength = 32

	useEffect(() => {
		validations.forEach((validation) => {
			switch (validation) {
				case "minLength":
					value.length < minLength && isTouched && setError(`Password should be from ${minLength} to ${maxLength} symbols`)
					break
				case "maxLength":
					value.length > maxLength && isTouched && setError(`Password should be from ${minLength} to ${maxLength} symbols`)
					   break
				case "isEmail": {
					const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					value && isTouched && !re.test(String(value).toLowerCase()) && setError("Email is not correct")
					break
				}
				case "isEmpty": {
					!value && isTouched && setError("Field could not be empty")
					break
				}
				default:
					break
			}
		})
		if (!isTouched) setError("")
	}, [value, isTouched])

	return { error, setError }
}
