import { Button } from "antd"
import React from "react"
import { useNavigate } from "react-router-dom"
import { useInput } from "../../../hooks/useInput"
import UserPool from "../Account/UserPool"
import RegistrInputSecton from "../common/RegistrInputSecton"
import RegistrPasswordInputSecton from "../common/RegistrPasswordInputSecton"
import s from "./RegistrPage.module.css"

const RegistrPage = () => {
	const email = useInput("", ["isEmail", "isEmpty"])
	const password = useInput("", ["minLength", "maxLength", "isEmpty"])
	const confirmPasswordlInput = useInput("", ["minLength", "maxLength", "isEmpty"])
	const navigate = useNavigate()

	const loginPageOnClick = () => {
		navigate("/login")
	}

	const formIsValid = !(email.value && !email.error && !password.error && password.value && confirmPasswordlInput.value && !confirmPasswordlInput.error)

	const onSubmit = (event) => {
		event.preventDefault()
		UserPool.signUp(email.value, password.value, [], null, (err, data) => {
			if (err) {
				console.error(err)
			}
			console.log(data)
		})
	}

	return (
		<div className={s.loginPageContainer}>
			<h2>Registration</h2>
			<form onSubmit={onSubmit} className={s.emailPasswordContainer}>
				<label htmlFor="email">Email:</label>
				<RegistrInputSecton placeholder={"Email"} nameInput={email} />
				<label htmlFor="password">Password:</label>
				<RegistrPasswordInputSecton placeholder={"Password"} nameInput={password} />
				<label htmlFor="Confirm password">Confirm password:</label>
				<RegistrPasswordInputSecton placeholder={"Confirm password"} nameInput={confirmPasswordlInput} />
				<section className={s.buttonContainer}>
					<Button type="link" size="large" onClick={loginPageOnClick}>
						Login
					</Button>
					<Button htmlType="submit" disabled={formIsValid} type="primary" style={{ marginTop: 50 }} size="large" block>
						Registration
					</Button>
				</section>
			</form>
		</div>
	)
}

export default RegistrPage
