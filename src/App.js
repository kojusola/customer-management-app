import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
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
				background: '#EEEBF0'
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

	const queryClient = new QueryClient();

	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<SnackbarProvider
						maxSnack={3}
						anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
						preventDuplicate={true}
					>
						<div className="App">
							<Routes />
						</div>
					</SnackbarProvider>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
