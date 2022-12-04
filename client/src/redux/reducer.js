import { LOGIN, LOGOUT, PHONE, UPDATE_PRODUCTS } from "./actions";

const initState = {
  token: null,
  products: [],
  phone: null,
};

const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return { ...state, token: payload};
    case LOGOUT:
      return { ...state, token: null };
    case UPDATE_PRODUCTS:
      return { ...state, products: payload };
    case PHONE:
      return { ...state, phone: payload };
    default:
      return state;
  }
};

export default reducer;
