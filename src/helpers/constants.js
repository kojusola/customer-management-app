import * as dotenv from 'dotenv';

dotenv.config();

export const BASE_URL = process.env.REACT_APP_API_URL;

export const BN_APP_AUTH_USER = 'BN_APP_AUTH_USER';

export const NUMBER_OF_DATA_PER_PAGE = 10;
