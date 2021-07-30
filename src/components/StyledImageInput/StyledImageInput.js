import { useRef } from 'react';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';

const useStyles = makeStyles((theme) => ({
	root: {
		background: 'gainsboro',
		cursor: 'pointer',
		border: 'dashed 2px #9783A3 ',
		padding: '5px',
		marginTop: 5,
		marginBottom: 5,
		height: 85,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: '100%',
		height: '100%',
		objectFit: 'contain',
	},
	text: {
		marginBottom:'2px',
		fontSize: '15px'
	},
	svg:{
		margin:'5px'
	},
}));

export default function ImageUpload({
	name,
	...rest
}) {
	const inputRef = useRef(null);


	const classes = useStyles();



	return (
		<Box className={classes.root} px={8} color='#9783A3' onClick={() => inputRef.current.click()} {...rest}>
			<Box alignItems='center' color='#9783A3' >
				<Box ml={10}>
					<InsertDriveFileOutlinedIcon/>
				</Box>
				<Box ml={3}>
					<Typography className={classes.Text}>Upload Company</Typography>
				</Box>
				<Typography className={classes.Text}>registration Document</Typography>
			</Box>
			<input name={name} ref={inputRef}  type="file" accept="image/*" hidden />
		</Box>
	);
}