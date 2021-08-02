import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import Box from '@material-ui/core/Box';
import { Spinner } from 'components';
import { ROLES } from 'helpers/constants';

import { Suspense, lazy } from 'react';
import { withAppContext, useAppContext } from "store/AppContext";

const AuthRoutes = lazy(() => import('pages/auth/auth-routes'));
const MerchantRoutes = lazy(() => import('pages/merchants/merchant-routes'))



const theme = createMuiTheme({
	custom: {
		secondary: {
			main: '#E89925',
		},
	},
	palette: {
		primary: {
			main: '#513166',
			background: '#281833'
		},
			secondary: {
				main: '#513166',
				info: '#4C6EF5',
				background: '#EEEBF0',
				danger: '#ED5556'
			},
		success: {
			main: '#00b577',
			background: '#281833'
		},
		button: {
			main: '#513166',
			background: '#EDF1FE',
			progress: '#9783A3'
		}
	},
	typography: {
		fontFamily: 'Poppins',
	},
});

function App() {


	const queryClient = new QueryClient();

	const { appState: { authUser } } = useAppContext();

	const isMerchant = () => authUser?.role?.name === ROLES.MERCHANT;

	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<SnackbarProvider
						maxSnack={3}
						anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
						preventDuplicate={true}
					>
						<Suspense
							fallback={<Box display="flex" justifyContent="center" mt={4}>
								<Spinner />
							</Box>}
						>
							{isMerchant() ? <MerchantRoutes /> : <AuthRoutes />}
						</Suspense>

					</SnackbarProvider>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default withAppContext(App);
