import * as dotenv from 'dotenv';

dotenv.config();

export const BASE_URL = process.env.REACT_APP_API_URL;

export const BN_APP_AUTH_USER = 'BN_APP_AUTH_USER';

export const NUMBER_OF_DATA_PER_PAGE = 10;

export const ROLES = {
    ADMIN: "admin",
    MERCHANT: "merchant",
    CUSTOMER: "customer",
    EMPLOYEE: "employee",
};

export const STATES = [
    'Abia',
    'Adamawa',
    'Akwa Ibom',
    'Anambra',
    'Bauchi',
    'Bayelsa',
    'Benue',
    'Borno',
    'Cross River',
    'Delta',
    'Ebonyi',
    'Edo',
    'Ekiti',
    'Enugu',
    'Gombe',
    'Imo',
    'Jigawa',
    'Kaduna',
    'Kano',
    'Katsina',
    'Kebbi',
    'Kogi',
    'Kwara',
    'Lagos',
    'Nasarawa',
    'Niger',
    'Ogun',
    'Ondo',
    'Osun',
    'Oyo',
    'Plateau',
    'Rivers',
    'Sokoto',
    'Taraba',
    'Yobe',
    'Zamfara',
    'FCT',
    'Abuja',
]