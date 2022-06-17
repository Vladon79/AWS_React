import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { store } from "./store/store"
import AppTest from "./app/AppTest"
import { Account } from "./Components/Login/Account/Account"
import 'antd/dist/antd.css'

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<Account>
				<AppTest />
			</Account>
		</BrowserRouter>
	</Provider>
)
