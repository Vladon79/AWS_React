import { Button } from "antd"
import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useInput } from "../../../hooks/useInput"
import RegistrInputSecton from "../common/RegistrInputSecton"
import s from "./LoginPage.module.css"
import RegistrPasswordInputSecton from "../common/RegistrPasswordInputSecton"
import { AccountContext } from "../Account/Account"

const LoginPage = () => {
	const navigate = useNavigate()
	const registrPageOnClick = () => {
		navigate("/registration")
	}

	const email = useInput("", ["isEmail", "isEmpty"])
	const password = useInput("", ["minLength", "maxLength", "isEmpty"])

	const { authenticate } = useContext(AccountContext)

	const onSubmit = (event) => {
		event.preventDefault()
		authenticate(email.value, password.value)
			.then((data) => {
				console.log("Logged in!", data)
			})
			.catch((err) => {
				console.error("Faileed to login", err)
			})
	}
	const formIsValid = !!(email.value && !email.error && password.value && !password.error)
	return (
		<div className={s.loginPageContainer}>
			<h2>Login</h2>
			<form onSubmit={onSubmit} className={s.emailPasswordContainer}>
				<label htmlFor="email">Email:</label>
				<RegistrInputSecton placeholder={"Email"} nameInput={email} />
				<label htmlFor="password">Password:</label>
				<RegistrPasswordInputSecton className={s.lablePassword} placeholder={"Password"} nameInput={password} />
				<section className={s.buttonContainer}>
					<Button className={s.registrationButton} type="link" size="large" onClick={registrPageOnClick}>
						Registration
					</Button>
					<Button disabled={!formIsValid} htmlType="submit" type="primary">
						SignIn
					</Button>
				</section>
			</form>
		</div>
	)
}

export default LoginPage
