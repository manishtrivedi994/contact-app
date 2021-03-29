import * as actions from '../actions'
import people from '../../data/people.json'
import admins from '../../data/admins.json';

const initialState = {
    people,
    admins,
    adminId: 0,
    selectedId: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_CONTACT:
            const modPeople = [...state.people, action.contact];
            return {
                ...state,
                people: modPeople,
            }
        case actions.CHANGE_ADMIN:
            return {
                ...state,
                adminId: action.id
            }
        case actions.EDIT_CONTACT:
            const index = people.findIndex(p => p.id === action.id);
            const filteredArr = state.people.filter(p => p.id !== action.id);
            const modItem = {id: action.id, name: action.name, email: action.email, phone: action.phone,company: action.company, address: action.company, adminId: action.adminId};
            filteredArr.splice(index, 0, modItem);
            return{
                ...state,
                people: [...filteredArr]
            }
        case actions.DELETE_CONTACT:
            const modArr = state.people.filter(p => p.id !== action.id);
            console.log(modArr);
            return {
                ...state,
                people: [...modArr]
            }
        case actions.DISPLAY_DETAILS:
            return{
                ...state,
                selectedId: action.selectedId
            }

        default:
            return state;
    }
}

export default reducer;