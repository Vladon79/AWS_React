import React, { createContext } from "react"
import Pool from "./UserPool"
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js"
import { useDispatch } from "react-redux"
import { isAuthAC, setEmail } from "../auth-reducer"
import { setPaginatorAC } from "../paginator-reducer"
import { message } from "antd"

const AccountContext = createContext()

const Account = (props) => {
	const dispatch = useDispatch()
	const getSession = async () => {
		dispatch(setPaginatorAC(true))
		return await new Promise((res, rej) => {
			const user = Pool.getCurrentUser()

			if (user) {
				user.getSession(async (err, session) => {
					if (err) {
						dispatch(setPaginatorAC(false))
						rej(err)
					} else {
						const attributes = await new Promise((res, rej) => {
							user.getUserAttributes((err, attributes) => {
								if (err) {
									dispatch(setPaginatorAC(false))
									rej(err)
								} else {
									const results = {}
									for (let attribute of attributes) {
										const { Name, Value } = attribute
										results[Name] = Value
									}
									dispatch(setPaginatorAC(false))
									res(results)
								}
							})
						})
						dispatch(setPaginatorAC(false))
						res({ user, ...session, ...attributes })
					}
				})
			} else {
				rej()
				dispatch(setPaginatorAC(false))
			}
		})
	}
	const authenticate = async (Username, Password) => {
		return await new Promise((resolve, reject) => {
			dispatch(setPaginatorAC(true))
			const user = new CognitoUser({ Username, Pool })
			const authDetails = new AuthenticationDetails({ Username, Password })
			user.authenticateUser(authDetails, {
				onSuccess: (data) => {
					console.log("onSuccess: ", data)
					dispatch(setPaginatorAC(false))
					if (data.idToken.payload.email_verified === false) {
						message.error(`You email not verified. Please go to your email ${data.idToken.payload.email}`)
						reject({ message: "Error. You email not verified" })
					} else {
						dispatch(setEmail(data.idToken.payload.email))
						dispatch(isAuthAC(true))
						resolve(data)
					}
				},
				onFailure: (err) => {
					console.error("onFailure: ", err)
					dispatch(setPaginatorAC(false))
					reject(err)
				},
				newPasswordRequired: (data) => {
					console.log("newPasswordRequired: ", data)
					dispatch(setPaginatorAC(false))
					resolve(data)
				}
			})
		})
	}

	const logOut = () => {
		const user = Pool.getCurrentUser()
		dispatch(setPaginatorAC(true))
		if (user) {
			user.signOut()
			dispatch(isAuthAC(false))
			dispatch(setPaginatorAC(false))
		}
	}
	return <AccountContext.Provider value={{ authenticate, getSession, logOut }}>{props.children}</AccountContext.Provider>
}

export { Account, AccountContext }
