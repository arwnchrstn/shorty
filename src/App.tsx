import { Route, Routes } from "react-router-dom"
import Home from '@/pages/Home'
import UrlTracker from '@/pages/UrlTracker'
import ErrorDialog from "./components/ErrorDialog"
import UrlRedirect from "./pages/UrlRedirect"
import Url404 from "./pages/Url404"

function App() {
	return (
		<>
			<ErrorDialog />
			<Routes>
				<Route path="/" element={<Home />}/>
				<Route path="/url-tracker" element={<UrlTracker />}/>
				<Route path="/:tag" element={<UrlRedirect />}/>
				<Route path="/invalid-url" element={<Url404 />}/>
			</Routes>
		</>
	)
}

export default App
