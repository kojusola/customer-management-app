import axios from 'axios';
import { BASE_URL } from 'helpers/constants';
import { getAuthUser } from './auth';

const client = () => {
	const authUserData = getAuthUser();
	const token = authUserData?.token || '';
	return axios.create({
		baseURL: BASE_URL,
		headers: {
			authorization: `bearer ${token}`,
			Accept: 'application/json',
		},
	});
};
export default client;
