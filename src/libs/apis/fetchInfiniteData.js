import { axiosClient } from 'libs';
import { NUMBER_OF_DATA_PER_PAGE } from 'helpers/constants';

const fetchInfinitData = ({ queryKey, pageParam = 1 }) => {
	const getPage = (url) => {
		const page = url?.split('=')?.[1];
		return page ? +page : page;
	};
	const [_key, limit] = queryKey;

	return axiosClient()
		.get(`/${_key}/?page=${pageParam}&limit=${limit || NUMBER_OF_DATA_PER_PAGE}`)
		.then((res) => {
			return {
				items: res.data?.data,
				nextPage: getPage(res.data?.meta?.next_page_url),
				previousPage: getPage(res.data?.meta?.previous_page_url),
				total: res.data?.meta?.total,
			};
		});
};

export default fetchInfinitData;
