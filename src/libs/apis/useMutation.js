import { useEffect, useRef } from 'react';
import { useMutation } from 'react-query';
import { useErrorHandler } from 'helpers';

const useCustomMutation = (mutateFunction) => {
	const { mutate, isError, error, isLoading } = useMutation(mutateFunction);
	const { handleError } = useErrorHandler();

	//This is to make sure that React doesn't consider "handleError",
	//as useEffect dependencies
	const handleErrorRef = useRef(handleError);

	useEffect(() => {
		if (isError) {
			handleErrorRef.current(error);
		}
	}, [isError, error]);
	return { mutate, isLoading };
};
export default useCustomMutation;
