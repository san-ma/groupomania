import { GET_TRENDS } from "../actions/post.actions";
// Reducers des trends Reducers = faire une mise à jour d'un state => prend l'ancien state et une action pour renvoyer le prochain state.
const initialState = {};

export default function trendingReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TRENDS:
            return action.payload;
        default:
            return state;
    };
};