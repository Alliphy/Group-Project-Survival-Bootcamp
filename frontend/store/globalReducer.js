// CONFIG REDUX IF NEEDED //


const initialState = {
    availDates: []
}

// {type:"UPDATE_DATES", payload:dateItems}

export default function globalReducer(state = initialState, action) {
    switch(action.type) {
        case "UPDATE_DATES":
            return {
                ...state,
                availDates: action.payload
            }
        default:
            return state
    }
}