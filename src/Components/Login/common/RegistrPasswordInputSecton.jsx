import { Input } from "antd"
import s from "./RegistrInputSecton.module.css"
import React from "react"

const RegistrPasswordInputSecton = (input) => {
	return (
		<section className={s.inputSection}>
			<Input.Password status={input.nameInput.error && "error"} placeholder={input.placeholder} size="large" value={input.nameInput.value} onChange={input.nameInput.valueChange} onBlur={input.nameInput.isTouchedOn} onFocus={input.nameInput.isTouchedOff} />
			{input.nameInput.error ? <div className={s.inputError}>{input.nameInput.error}</div> : <div className={s.notErrorBlock}></div>}
		</section>
	)
}

export default RegistrPasswordInputSecton
