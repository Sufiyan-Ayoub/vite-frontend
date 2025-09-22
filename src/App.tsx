import type { FC } from "react"
import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from "react-router-dom"
import { RouterProvider } from "react-router-dom"
import { NotFoundError } from "./errors/not-found-error"
import createStore from "@pex-craft/store"
import { AppStore, Store } from "@/store"
import { SidebarProvider, SidebarTrigger } from "@/ui/sidebar"
import Sidebar from "@/comps/sidebar"
import { Landing } from "@/pages"
import { LayoutProvider } from "@/context"


const Root = () => {
	const { Provider } = createStore(Store.App, AppStore.App)

	return (
		<Provider>
			<LayoutProvider>
				<SidebarProvider>
					<Sidebar />
				
					<SidebarTrigger />
					<Outlet />
				</SidebarProvider>
			</LayoutProvider>
		</Provider>
	)
}

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<Root />} errorElement={<NotFoundError />}>
			<Route path={`/`} element={<Landing />} />
		</Route>
	)
)

const App : FC = () => <RouterProvider router={router} />;

export default App