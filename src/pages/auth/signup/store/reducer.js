import { SET_BUSINESS_DETAILS, SET_BVN_DETAILS, SET_PERSONAL_DETAILS, ADD_BRANCH, REMOVE_BRANCH, SET_BRANCH_INFO, SET_DOCUMENT, SET_DOCUMENT_DATA_URL } from './actionTypes';

const onboardReducer = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_BUSINESS_DETAILS:
            return { ...state, businessDetails: payload.data };
        case SET_PERSONAL_DETAILS:
            return { ...state, personalDetails: payload.data };
        case SET_BVN_DETAILS:
            return { ...state, bvnDetails: payload.data };
        case ADD_BRANCH:
            return { ...state, branches: [...state.branches, payload.data] };
        case REMOVE_BRANCH:
            return { ...state, branches: state.branches.filter(branch => branch.id !== payload.data.branchId) }
        case SET_BRANCH_INFO:
            return { ...state, branchInfo: payload.data };
        case SET_DOCUMENT:
            return { ...state, businessDocument: payload.data };
        case SET_DOCUMENT_DATA_URL:
            return { ...state, documentDataUrl: payload.data };
        default:
            return state;
    }
}

export default onboardReducer;