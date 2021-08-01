import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { forwardRef } from 'react';

const useStyles = makeStyles((theme) => ({
	root: {
		marginBottom: 10,
		fontFamily: theme.custom.typography,
	},
}));

const StyledTextFieldMui = forwardRef((props, ref) => {
	const classes = useStyles();

	return (
		<TextField
			classes={{
				root: classes.root,
			}}
			ref={ref}
			variant="outlined"
			margin="dense"
			fullWidth
			required
			autoComplete="off"
			size="small"
			{...props}
		/>
	);
})

export default StyledTextFieldMui;