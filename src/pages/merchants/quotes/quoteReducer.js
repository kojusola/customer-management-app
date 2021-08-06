export const actionTypes = {
    SET_CUSTOMER: 'SET_CUSTOMER',
    ADD_PRODUCT: 'ADD_PRODUCT',
    REMOVE_PRODUCT: 'REMOVE_PRODUCT',
    SET_QUOTE_NAME: 'SET_QUOTE_NAME',
    SET_ASSIGNED_TO: 'SET_ASSIGNED_TO',
    SET_REMARK: 'SET_REMARK'
}

export const initialData = {
    customerId: '',
    products: [],
    quoteName: '',
    assignedTo: '',
    remark: ''
}

export const quoteReder = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case actionTypes.SET_CUSTOMER:
            return { ...state, customerId: payload.data };
        case actionTypes.ADD_PRODUCT:
            const prods = [...state.products, payload.data];
            const uniqueProds = [...new Map(prods.filter(prod => prod.name?.value).map(prod => [prod.name.value, prod])).values()];
            return { ...state, products: uniqueProds };
        case actionTypes.REMOVE_PRODUCT:
            return { ...state, products: state.products.filter(product => product.name?.value !== payload.data.name?.value) };
        case actionTypes.SET_QUOTE_NAME:
            return { ...state, quoteName: payload.data };
        case actionTypes.SET_ASSIGNED_TO:
            return { ...state, assignedTo: payload.data };
        case actionTypes.SET_REMARK:
            return { ...state, remark: payload.data };
        default:
            return state;
    }
};
