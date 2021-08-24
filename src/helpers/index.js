import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export const useMediaQueries = () => {
	const theme = useTheme();
	const smAndDown = useMediaQuery(theme.breakpoints.down('sm'));
	const smAndUp = useMediaQuery(theme.breakpoints.up('sm'));
	const xsAndDown = useMediaQuery(theme.breakpoints.down('xs'));
	const xsAndUp = useMediaQuery(theme.breakpoints.up('xs'));
	const mdAndUp = useMediaQuery(theme.breakpoints.up('md'));
	const mdAndDown = useMediaQuery(theme.breakpoints.down('md'));
	const lgAndUp = useMediaQuery(theme.breakpoints.up('lg'));
	const lgAndDown = useMediaQuery(theme.breakpoints.down('lg'));


	return { smAndDown, smAndUp, xsAndDown, mdAndDown, mdAndUp, lgAndDown, lgAndUp, xsAndUp }
}

export const validateFileSize = (file, enqueueSnackbar, size = 5,) => {

	const isJpgOrPng = file?.type === 'image/jpeg' || file?.type === 'image/jpg' || file?.type === 'image/png' || file?.type === 'application/pdf';
	if (!isJpgOrPng) {
		enqueueSnackbar('You can only upload either a PDF or image file!', { variant: 'error' });
	}
	const isLt10M = file?.size / 1024 / 1024 < size;
	if (!isLt10M) {
		enqueueSnackbar('Image must be smaller than 5MB!', { variant: 'error' });
	}
	return isJpgOrPng && isLt10M;
};
export const useDebounce = (value, delay) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);
		return () => {
			clearTimeout(handler);
		};
		// eslint-disable-next-line
	}, [value]);

	return debouncedValue;
};
export const useDisclosures = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(open => !open);
	return { isOpen, toggle }
}
export const debounce = (fn, delay) => {
	const timers = [];
	return function delayedFn(...args) {
		const timer = setTimeout(() => {
			fn(...args);
		}, delay);
		if (timers.length > 0) {
			clearTimeout(timers.pop());
		}
		timers.push(timer);
	};
};


export const useErrorHandler = () => {
	const { enqueueSnackbar } = useSnackbar();

	const getErrorMessage = (error) => {
		console.log(error.response)
		if (error.response && error.response.data) {
			const { message } = error.response.data;
			if (message) {
				return Array.isArray(message) ? message.join(',') : message;
			}
			return error.response.data;
		}
		if (error.response) {
			return error.response.statusText || 'Error occurred';
		}
		return error.message;
	};

	const handleError = (error) => {
		// console.log('error', getErrorMessage(error));
		if (!error.response) {
			return enqueueSnackbar(error.message, { variant: 'error', preventDuplicate: true });
		}
		enqueueSnackbar(getErrorMessage(error), { variant: 'error' });
	};

	return { handleError };
};
export const moneyFormatter = (value) => {
	value = ('' + value).replace(/,/gi, '');
	if (value.length < 4) return value;
	let result = '';
	if (value.substr(1).length % 3 === 0) {
		result = value.charAt(0);
	} else {
		result = value.substr(0, (value.substr(1).length % 3) + 1);
	}
	for (let i = result.length; i < value.length; i = i + 3) {
		result += `,${value.substr(i, 3)}`;
	}
	return result;
};