import { BN_APP_AUTH_USER } from 'helpers/constants';

export const getAuthUser = () => {
	const user = localStorage.getItem(BN_APP_AUTH_USER);
	return user ? JSON.parse(user) : '';
};

export const setAuthUser = (user) => {
	localStorage.setItem(BN_APP_AUTH_USER, JSON.stringify(user));
};
export const removeAuthUser = () => {
	localStorage.removeItem(BN_APP_AUTH_USER);
};

export const isEmailVerified = () => getAuthUser()?.merchant?.is_email_verified;

export const updateMerchantField = (merchant) => {
	const user = { ...getAuthUser(), merchant };
	setAuthUser(user);
}

export const completedOnboarding = () => getAuthUser()?.merchant?.stores?.length;

export const getAuthUserRole = () => getAuthUser()?.role?.name;



