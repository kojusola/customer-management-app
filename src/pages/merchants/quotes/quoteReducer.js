export const actionTypes = {
    SET_CUSTOMER: 'SET_CUSTOMER',
    ADD_PRODUCT: 'ADD_PRODUCT',
    REMOVE_PRODUCT: 'REMOVE_PRODUCT',
    SET_QUOTE: 'SET_QUOTE'
}

export const initialData = {
    customerId: '',
    products: [],
    quote: {}
}

export const quoteReder = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case actionTypes.SET_CUSTOMER:
            return { ...state, customerId: payload.data };
        case actionTypes.ADD_PRODUCT:
            return { ...state, products: [...state.products, payload.data] };
        case actionTypes.REMOVE_PRODUCT:
            return { ...state, products: state.products.filter(product => product.id !== payload.data.id) };
        case actionTypes.SET_QUOTE:
            return { ...state, quote: payload.data };
        default:
            return state;
    }
};
