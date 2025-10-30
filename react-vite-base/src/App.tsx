import { FC, useEffect } from 'react';
import { AppLayout } from '@/layouts/index';
import {
	createBrowserRouter,
	createMemoryRouter,
	createRoutesFromElements,
	Outlet,
	Route,
	RouterProvider
} from 'react-router-dom';
import { GeneralError } from '@/comps/errors';
import Oauth from './pages/oauth';
import OauthLayout from './layouts/OauthLayout';
import { Toaster } from '@/comps';
import { _removeAppLoader } from '@/cores';
import MainLayout from './layouts/MainLayout';
import { ProductList, AddProduct } from './pages/products';
import ProductProvider from './pages/products/Provider';
import BranchProvider from './pages/branches/Provider';
import BranchList from './pages/branches/List';
import AddBranch from './pages/branches/AddBranch';
import Main from './pages/Landing/Main';
import Authenticate from './pages/oauth/Oauth';

const Root = () => {
	useEffect(() => {
		_removeAppLoader()
	}, [])

	return <>
		<Outlet />
		<Toaster />
	</>
}

const createAppRouter = (url?: string) => {
	const routes = createRoutesFromElements(
		<Route element={<Root />} errorElement={<GeneralError />}>
			<Route path={`/`} element={<AppLayout />}>
				<Route index element={<Main />} />
			</Route>
			
			<Route path={`/u`} element={<OauthLayout />}>
				<Route path={`:section`} element={<Oauth />}>
					<Route path={`:token`} element={<Oauth />} />
				</Route>
			</Route>

					{/* <Route path=":id" element={<ProductsDetail />} />
				<Route path=":id/edit" element={<ProductsEdit />} /> */}
			<Route path={`/dashboard`} element={<MainLayout />}>
				{/* <Route path="products" element={<ProductProvider><Outlet /></ProductProvider>}>
					<Route index element={<ProductList />} />
					<Route path="create" element={<AddProduct />} />
				</Route>
				<Route path='branches' element={<BranchProvider><Outlet /></BranchProvider>}>
					<Route index element={<BranchList />} />
					<Route path="create" element={<AddBranch />} />
				</Route> */}
			</Route>

			{/* <Route path={`/admin`} elemen={} errorElement={<ErrorRoot />} >
		</Route> */}


		</Route>
	);

	if (import.meta.env.SSR) {
		return createMemoryRouter(routes, { initialEntries: [url || `/`] })
	}

	return createBrowserRouter(routes)
}

const App: FC<{ url?: string }> = ({ url }) => <RouterProvider router={createAppRouter(url)} />;

export default App;