import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { store } from "./store/store"
import App from "./app/App"
import { Account } from "./Components/Login/Account/Account"
import 'antd/dist/antd.css'

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<Account>
				<App />
			</Account>
		</BrowserRouter>
	</Provider>
)
