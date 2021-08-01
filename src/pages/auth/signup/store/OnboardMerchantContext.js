import { useReducer, createContext, useContext } from 'react';
import onboardReducer from './reducer';

const onboardContext = createContext(null);

const initialState = {
    personalDetails: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: ''
    },
    businessDetails: {
        businessName: '',
        lga: '',
        state: '',
        categoryId: '',
        address: '',
    },
    branchInfo: {
        numberOfEmployees: 0,
        numberOfBranches: 1,
    },
    branches: [],
    bvnDetails: {
        bvn: '',
        agreedToTerms: false
    },
    documentDataUrl: null,
    businessDocument: null,

}

export const useOnboardContext = () => useContext(onboardContext);

export const OnboardContextWrapper = ({ children }) => {

    const [onboardState, dispatch] = useReducer(onboardReducer, initialState);

    return <onboardContext.Provider value={{ onboardState, dispatch }}>
        {children}
    </onboardContext.Provider>
}