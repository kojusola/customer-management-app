import * as yup from 'yup';

export const loginSchema = yup.object().shape({
	email: yup.string().email().trim().required().label('Email'),
	password: yup.string().trim().required().label('Password'),
});

export const forgotPasswordSchema = yup.object().shape({
	email: yup.string().email().trim().required().label('Email'),
});

export const verifyEmailSchema = yup.object().shape({
	otp: yup.string().email().trim().required().label('OTP'),
});

export const resetPasswordSchema = yup.object().shape({
	otp: yup.string().required().label('OTP'),
	newPassword: yup.string().required().label('New password'),
	comfirmNewPassword: yup
		.string()
		.required()
		.oneOf([yup.ref('newPassword'), null])
		.label('Confirm password'),
});

export const registerMerchantAccountSchema = yup.object().shape({
	firstName: yup.string().required().label('First name'),
	lastName: yup.string().required().label('Last name'),
	email: yup.string().required().label('Email'),
	phoneNumber: yup.string().required().label('Phone number'),
	password: yup.string().required().label('Password'),
});
export const createBranchInfo = yup.object().shape({
	numberOfEmployees: yup.number().integer().required().default(0).label('Number of employees'),
	numberOfBranches: yup.number().integer().positive().required().label('Number of branches'),
});
export const createBVNDetails = yup.object().shape({
	bvn: yup.string().trim().required().length(11).label('BVN'),
	agreedToTerms: yup.boolean().isTrue().required().label('Agree to terms'),
});
export const createBusinessBranchSchema = yup.object().shape({
	address: yup.string().required().label('Branch address'),
	name: yup.string().required().label('Branch name'),
	lga: yup.string().required().label('Branch LGA'),
	state: yup
		.object({
			value: yup.string().trim().required().label('State'),
		})
		.label('State')
		.required()
		.nullable(),
});

export const createBusinessInfoSchema = yup.object().shape({
	businessName: yup.string().trim().required().label('Business name'),
	address: yup.string().trim().required().label('Business address'),
	lga: yup.string().trim().required().label('LGA'),
	state: yup
		.object({
			value: yup.string().trim().required(),
		})
		.required()
		.nullable().label('State'),
	categoryId: yup
		.object({
			value: yup.number().required(),
		})
		.required()
		.nullable()
		.label('Business category'),
});

