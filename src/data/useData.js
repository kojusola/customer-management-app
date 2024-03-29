import { useRef } from 'react';
import { fetchData } from 'libs/apis';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { useErrorHandler } from 'helpers';

const useData = (key) => {
	const { data, error, isError, isLoading } = useQuery(key, fetchData);

	const { handleError } = useErrorHandler();

	const errorHandlerRef = useRef(handleError);

	useEffect(() => {
		if (isError) {
			errorHandlerRef.current(error);
		}
	}, [isError, error]);
	return { data, isLoading };
};

export default useData;
