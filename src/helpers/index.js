import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';


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
