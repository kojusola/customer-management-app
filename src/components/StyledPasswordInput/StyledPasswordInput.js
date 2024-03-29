import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useState } from 'react';
import { forwardRef } from 'react';

const useStyles = makeStyles({
	root: {
		marginBottom: 20,
	},
	iconButton: {
		'&:hover': {
			background: 'inherit',
		},
	},
});

const StyledPasswordInput = forwardRef((props, ref) => {
	const classes = useStyles();
	const [showPassword, setShowPassword] = useState(false);

	const toggleShowPassword = () => {
		setShowPassword((show) => !show);
	};

	return (
		<TextField
			classes={{
				root: classes.root,
			}}
			ref={ref}

			fullWidth
			label='Password'
			required
			variant="outlined"
			margin="dense"
			size="small"
			{...props}
			type={showPassword ? 'text' : 'password'}

			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onMouseDown={(e) => e.preventDefault()}
							onClick={toggleShowPassword}
							edge="end"
							className={classes.iconButton}
						>
							{showPassword ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);
})

export default StyledPasswordInput;