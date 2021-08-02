import { useRef, useState } from 'react';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
	root: {
		background: 'gainsboro',
		cursor: 'pointer',
		border: 'dashed 2px #9783A3 ',
		marginTop: 5,
		marginBottom: 5,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '15px 5px'
	},
	image: {
		width: '100%',
		height: '100%',
		objectFit: 'contain',
	},
	text: {
		marginBottom: '2px',
		textAlign: 'center'
	},
	svg: {
		margin: '5px'
	},
}));

export default function ImageUpload({ oldFile, setDocumentFile, setDocumentDataUrl, ...rest }) {

	const [file, setFile] = useState(oldFile);

	const inputRef = useRef(null);


	const classes = useStyles();

	const { enqueueSnackbar } = useSnackbar();

	const beforeUpload = (file) => {
		console.log({ file })
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'application/pdf';
		if (!isJpgOrPng) {
			enqueueSnackbar('You can only upload either a PDF or image file!', { variant: 'error' });
		}
		const isLt10M = file.size / 1024 / 1024 < 5;
		if (!isLt10M) {
			enqueueSnackbar('Image must be smaller than 5MB!', { variant: 'error' });
		}
		return isJpgOrPng && isLt10M;
	};
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (!beforeUpload(file)) return;
		setDocumentFile && setDocumentFile(file);
		setFile(file);
	};
	return (
		<Box className={classes.root} color='#9783A3' onClick={() => inputRef.current.click()} {...rest}>
			<Box alignItems='center' color='#9783A3' >
				{file ? <Typography>Selected: {file.name}</Typography> : <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
					<InsertDriveFileOutlinedIcon />
					<Typography className={classes.text}>Upload company registration document</Typography>
				</Box>}

			</Box>
			<input onChange={handleFileChange} ref={inputRef} type="file" accept="image/*,application/pdf" hidden />
		</Box>
	);
}