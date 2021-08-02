import { useReducer, createContext, useContext } from 'react';
import appStoreReducer from './reducer';
import { getAuthUser } from '../libs/auth';

const appContext = createContext(null);

const initialState = {
    authUser: getAuthUser() || null

}

export const useAppContext = () => useContext(appContext);

export const AppContextWrapper = ({ children }) => {

    const [appState, dispatch] = useReducer(appStoreReducer, initialState);

    return <appContext.Provider value={{ appState, dispatch }}>
        {children}
    </appContext.Provider>
}


export const withAppContext =
    (Component) =>
        ({ ...props }) =>
        (
            <AppContextWrapper>
                <Component {...props} />
            </AppContextWrapper>
        );
