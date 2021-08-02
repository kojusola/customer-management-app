import { fetchInfinitData } from 'libs/apis';
import { useInfiniteQuery } from 'react-query';

const useInfiniteData = (key, limit) => {
	return useInfiniteQuery([key, limit], fetchInfinitData, {
		getNextPageParam(lastPage) {
			return lastPage.nextPage;
		},
		getPreviousPageParam(firstPage) {
			return firstPage.previousPage;
		},
	});
};

export default useInfiniteData;
