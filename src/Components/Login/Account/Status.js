import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { useContext } from "react"
import { AccountContext } from "./Account"
import { isAuthAC } from "../../Components/Login/auth-reducer"

const Status = () => {

	const [status, setStatus] = useState(false)
	const dispatch = useDispatch()

	const { getSession, logOut } = useContext(AccountContext)

	useEffect(() => {
		getSession().then((session) => {
			console.log("Session", session)
			dispatch(isAuthAC(true))
			setStatus(true)
		})
	}, [])
	return <div>{status ? <button onClick={logOut}>LogOut</button> : <h2>"Please login"</h2>}</div>
}

export default Status
