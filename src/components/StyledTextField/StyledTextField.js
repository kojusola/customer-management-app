import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) =>({
	root: {
		marginBottom:10,
        fontFamily: theme.custom.typography,
	},
}));

export default function StyledTextFieldMui({ ...rest }) {
	const classes = useStyles();

	return (
		<TextField
			classes={{
				root: classes.root,
			}}
			variant="outlined"
			margin="dense"
			fullWidth
			required
			autoComplete="off"
			size="small"
			{...rest}
		/>
	);
}