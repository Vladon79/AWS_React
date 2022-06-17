import React from "react"
import { Account, AccountContext } from "../Components/Login/Account/Account"
import { Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "../Components/Login/LoginPage/LoginPage"
import s from "./App.module.css"
import RegistrPage from "../Components/Login/RegistrPage/RegistrPage"
import Todolist from "../Components/Todolist/Todolist"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { PageHeader, Button } from "antd"
import { useContext } from "react"
import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"
import { isAuthAC, setEmail } from "../Components/Login/auth-reducer"
import { message } from "antd"

const AppTest = () => {
	const isAuth = useSelector((state) => state.auth.isAuth)
	const email = useSelector((state) => state.auth.email)
	console.log(isAuth)
	const dispatch = useDispatch()

	const antIcon = <LoadingOutlined style={{ fontSize: 200, margin: 50 }} spin />
	const pagination = useSelector((state) => state.paginator)

	const { getSession, logOut } = useContext(AccountContext)

	useEffect(() => {
		getSession().then((session) => {
			if (session.email_verified === "true") {
				// console.log("Session", session)
				message.success(`Hello ${session.email}`)
				dispatch(isAuthAC(true))
				dispatch(setEmail(session.email))
			} else {
				dispatch(isAuthAC("email_verified"))
				dispatch(setEmail(session.email))
				message.error(`You email not verified. Please go to your email ${session.email}`)
			}
		})
	}, [])
	console.log("111111111111111")
	return (
		<div className={s.App}>
			<PageHeader
				className={s.pageHeader}
				ghost={false}
				title="Senama_Soft Todolist"
				extra={[
					isAuth && (
						<div style={{ display: "flex" }}>
							<h3 style={{ color: "#FFF", margin: 0, marginRight: 50, fontSize: 20 }}>{email}</h3>
							<Button type="primary" danger style={{ color: "#f9f9f9" }} onClick={logOut}>
								logOut
							</Button>
						</div>
					)
				]}
			/>
			{isAuth === "email_verified" && <h3>You must go to your mail {email} and verify your account</h3>}
			{pagination ? (
				<Spin indicator={antIcon} spinning={pagination} />
			) : (
				(isAuth===true && (
					<Account>
						<Routes>
							<Route path="*" element={<Navigate to="/todolist" />} />
							<Route path="/todolist" element={<Todolist />} />
						</Routes>
					</Account>
				)) ||
				(!isAuth && (
					<Account>
						<h5>test@test.com</h5>
						<h5>vla3ik@gmail.com</h5>
						<h5>Password1!</h5>
						<Routes>
							<Route path="*" element={<Navigate to="/login" />} />
							<Route path="/login" element={<LoginPage />} />
							<Route path="/registration" element={<RegistrPage />} />
						</Routes>
					</Account>
				))
			)}
		</div>
	)
}

export default AppTest
