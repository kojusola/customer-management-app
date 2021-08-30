import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    customerId: '',
    products: [],
    quoteName: '',
    assignedTo: '',
    remark: '',
    showSelectCustomer: false,
    tax: 0,
    shipping: 0
}

const quoteSlice = createSlice({
    name: 'quote',
    initialState,

    reducers: {
        setCustomer(state, action) {
            state.customerId = action.payload
        },
        addProduct(state, action) {
            const prods = [...state.products, action.payload];
            const uniqueProds = [...new Map(prods.filter(prod => prod.name?.value).map(prod => [prod.name?.value, prod])).values()];
            state.products = uniqueProds;
        },
        removeProduct(state, action) {
            state.products = state.products.filter(product => product.name?.value !== action.payload.name?.value)
        },
        setName(state, action) {
            state.quoteName = action.payload;
        },
        setAssignedTo(state, action) {
            state.assignedTo = action.payload
        },
        setRemark(state, action) {
            state.remark = action.payload
        },
        setTax(state, action) {
            state.tax = action.payload
        },
        setShipping(state, action) {
            state.shipping = action.payload
        },
        toggleShowSelectCustomer(state) {
            state.showSelectCustomer = !state.showSelectCustomer
        },
        setQuote(state, action) {
            const { tax, shipping, assignedTo, customerId, remark, quoteName, products, showSelectCustomer } = action.payload
            state.assignedTo = assignedTo;
            state.customerId = customerId;
            state.remark = remark;
            state.products = products;
            state.quoteName = quoteName;
            state.showSelectCustomer = showSelectCustomer;
            state.tax = tax;
            state.shipping = shipping
        }

    }
})

export const { setTax, setShipping, setAssignedTo, setCustomer, setQuote, setName, setRemark, addProduct, removeProduct, toggleShowSelectCustomer } = quoteSlice.actions;
export default quoteSlice.reducer