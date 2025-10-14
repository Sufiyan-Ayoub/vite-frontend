import { FC, useEffect } from 'react';
import { AppLayout } from '@/layouts/index';
import { 
	createBrowserRouter, 
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

const Root = () => {
	
	useEffect(() => {
		_removeAppLoader()
	}, [])

	return <>
		<Outlet />
		<Toaster />
	</>
}

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<Root />} errorElement={<GeneralError />}>
			<Route path={`/`} element={<AppLayout />}>
			
			</Route>

			<Route path={`/u`} element={<OauthLayout />}>
				<Route path={`:section`} element={<Oauth />}>
					<Route path={`:token`} element={<Oauth />} />
				</Route>
			</Route>
			
			<Route path={`/dashboard`} element={<MainLayout />}>
				
			</Route>

			{/* <Route path={`/admin`} elemen={} errorElement={<ErrorRoot />} >
			</Route> */}
		</Route>
	)
)

const App : FC = () => <RouterProvider router={router} />;

export default App;