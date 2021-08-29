import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isPrintingDocument: false,
    isSendingQuote: false
}

const appSlice = createSlice({
    name: 'app',
    initialState,

    reducers: {
        togglePrintingDocument(state) {
            state.isPrintingDocument = !state.isPrintingDocument;
        },
        toggleIsSendingQuote(state) {
            state.isSendingQuote = !state.isSendingQuote;
        },
    }
})

export const { togglePrintingDocument, toggleIsSendingQuote } = appSlice.actions;
export default appSlice.reducer