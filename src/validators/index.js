import * as yup from 'yup';

const errorMessage = (fieldName) => `${fieldName} is required`

export const loginSchema = yup.object().shape({
	email: yup.string().email().trim().required(errorMessage('Email')),
	password: yup.string().trim().required(errorMessage('Password')),
});

export const forgotPasswordSchema = yup.object().shape({
	email: yup.string().email().trim().required(errorMessage('Email'))
});

export const verifyEmailSchema = yup.object().shape({
	otp: yup.string().email().trim().required().label('OTP'),
});

export const resetPasswordSchema = yup.object().shape({
	otp: yup.string().required(errorMessage('OTP')),
	newPassword: yup.string().required(errorMessage('New password')),
	comfirmNewPassword: yup
		.string()
		.oneOf([yup.ref('newPassword'), null], 'Confirm password must match with new password')

});

export const registerMerchantAccountSchema = yup.object().shape({
	firstName: yup.string().required(errorMessage('First name')),
	lastName: yup.string().required(errorMessage('Last name')),
	email: yup.string().required(errorMessage('Email')),
	phoneNumber: yup.string().required(errorMessage('Phone number')),
	password: yup.string().required(errorMessage('Password')),
});
export const createBranchInfo = yup.object().shape({
	numberOfEmployees: yup.number().integer().required(errorMessage('Number of employees')).default(0),
	numberOfBranches: yup.number().integer().positive().required(errorMessage('Number of branches')),
});
export const createBVNDetails = yup.object().shape({
	bvn: yup.string().trim().required(errorMessage('BVN')).length(11).label('BVN'),
	agreedToTerms: yup.boolean().isTrue().required(errorMessage('Agree to terms')).label('Agree to terms'),
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
export const selectCustomerSchema = yup.object().shape({
	customerId: yup
		.object({
			value: yup.number().required(),
		})
		.required("Customer is required")
		.nullable()
});
export const createProductSchema = yup.object().shape({
	name: yup.string().required(errorMessage('Product name')),
	unitPrice: yup.string().required(errorMessage('Unit price')),
	quantity: yup.string().required(errorMessage('Quantity')),
	color: yup.string().notRequired(),
	size: yup.string().notRequired(),
	weight: yup.string().notRequired(),
	height: yup.string().notRequired(),
	width: yup.string().notRequired(),
	length: yup.string().notRequired(),
	description: yup.string().notRequired(),
	branch: yup
		.object({
			value: yup.string().required(),
		})
		.required("Branch is required")
		.nullable()
});
export const createQuoteProductSchema = yup.object().shape({
	name: yup
		.object({
			value: yup.string().required(),
		})
		.required("Product name is required")
		.nullable(),
	unitPrice: yup.number("Unit price must be a number").required(errorMessage('Unit price')),
	quantity: yup.number().required(errorMessage('Quantity')),
	amount: yup.number().notRequired(),
	discount: yup.number().notRequired().default(0),
});
export const createSaleSchema = yup.object().shape({
	customer: yup
		.object({
			value: yup.string().required(),
		})
		.required("Customer name is required")
		.nullable(),
	product: yup
		.object({
			value: yup.string().required(),
		})
		.required("Product name is required")
		.nullable(),
	quantity: yup.number().required(errorMessage('Quantity')),
});

export const createCustomerSchema = yup.object().shape({
	email: yup.string().email().trim().required('Email is required'),
	firstName: yup.string().trim().required('First name is required'),
	lastName: yup.string().trim().required('Last name is required'),
	phoneNumber: yup.string().trim().notRequired(),
	state: yup
		.object({
			value: yup.string().trim().notRequired(),
		})
		.notRequired()
		.nullable().label('State'),
	address: yup.string().trim().notRequired(),
	city: yup.string().trim().notRequired(),
	postalCode: yup.string().trim().notRequired(),
	gender: yup.string().trim().notRequired(),
	age: yup.string().trim().notRequired(),
	lga: yup.string().trim().notRequired(),
})

