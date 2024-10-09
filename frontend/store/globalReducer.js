// CONFIG REDUX IF NEEDED //

const initialState = {
  availDates: [],
  user: {},
  instructor: false,
};

// {type:"UPDATE_DATES", payload:dateItems}

export default function globalReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_DATES":
      return {
        ...state,
        availDates: action.payload,
      };
    case "SET_USER":
      console.log(action.payload);
      return {
        ...state,
        user: action.payload,
      };
    case "SET_ADMIN":
      return {
        ...state,
        instructor: true,
      };

    case "LOGOUT":
      return {
        ...state,
        instructor: false,
        user: {},
      };

    default:
      return state;
  }
}
