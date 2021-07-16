import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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
				background: '#EEEBF0',
				danger: '#ED5556'
			},
			success: {
				main: '#00b577',
				background: '#281833'
			},
			button:{
				main: '#513166',
				background: '#EDF1FE',
				progress: '#9783A3'
			}
		},
		typography: {
			fontFamily: 'Poppins',
		},
	});

	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<SnackbarProvider
					maxSnack={3}
					anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
					preventDuplicate={true}
				>
					<div className="App">
						<Routes/>
					</div>
				</SnackbarProvider>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
