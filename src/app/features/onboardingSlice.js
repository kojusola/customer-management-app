import { createSlice } from '@reduxjs/toolkit';


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

const onboardingSlice = createSlice({
    name: 'onboarding',
    initialState,
    reducers: {
        setBusinessDetailsAction(state, action) {
            state.businessDetails = action.payload
        },
        setPersonalDetailsAction(state, action) {
            state.personalDetails = action.payload;
        },
        setBVNDetailsAction(state, action) {
            state.bvnDetails = action.payload
        },
        addBranchAction(state, action) {
            const newBranches = state.branches.concat(action.payload)
            state.branches = newBranches;
        },
        removeBranchAction(state, action) {
            state.branches = state.branches.filter(branch => branch.id !== action.payload)
        },
        setBranchInfoAction(state, action) {
            state.branchInfo = action.payload;
        },
        setDocumentAction(state, action) {
            state.businessDocument = action.payload
        },
        setDocumentDataUrlAction(state, action) {
            state.documentDataUrl = action.payload
        }

    }
})

export const { setBVNDetailsAction, setBranchInfoAction, setBusinessDetailsAction, setDocumentAction, setDocumentDataUrlAction, setPersonalDetailsAction, removeBranchAction, addBranchAction } = onboardingSlice.actions;
export default onboardingSlice.reducer