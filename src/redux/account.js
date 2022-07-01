const LOAD = 'redux-form-examples/account/LOAD';

const reducer = (state = {}, action) => {
    //console.log(state);
    //console.log(action);
    switch (action.type) {
        case LOAD:
            return {
                data: action.data,
            };
        default:
            return state;
    }
};

/**
 * Simulates data loaded into this reducer from somewhere
 */
//export const load = data => ({ type: LOAD, data });
export const load = data => {
    //console.log(data);
    return { type: LOAD, data }
};

export default reducer;