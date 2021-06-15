import { useRef } from 'react';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
	root: {
		background: 'gainsboro',
		cursor: 'pointer',
		border: `dashed 2px ${theme.palette.primary.main}`,
		padding: '5px',
		marginTop: 5,
		height: 60,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: '100%',
		height: '100%',
		objectFit: 'contain',
	},
}));

export default function ImageUpload({
	name,
	...rest
}) {
	const inputRef = useRef(null);


	const classes = useStyles();



	return (
		<Box className={classes.root} onClick={() => inputRef.current.click()} {...rest}>
			<input name={name} ref={inputRef}  type="file" accept="image/*" hidden />
		</Box>
	);
}