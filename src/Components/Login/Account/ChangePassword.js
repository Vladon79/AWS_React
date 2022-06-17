import React, { useState, useContext } from "react"
import { AccountContext } from "./Account"

const ChangePassword = () => {
	const [password, setPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")

	const { getSession } = useContext(AccountContext)

	const onSubmit = (e) => {
		e.preventDefault()
		getSession().then(({ user }) => {
			user.changePassword(password, newPassword, (err, result) => {
				if (err) {
					console.error(err)
				} else {
					console.log(result)
				}
			})
		})
	}
	return (
		<div>
			<form onSubmit={onSubmit}>
				<label>Current password</label>
				<input value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
				<label>New password</label>
				<input value={newPassword} onChange={(e) => setNewPassword(e.currentTarget.value)} />
				<button type="submit">SignUp</button>
			</form>
		</div>
	)
}

export default ChangePassword
