//let url_API = 'url_API';
let testData = 'testData';

let initialState = {
    test: null
}



const appReducer = (state = initialState, action ) => {
    //console.log(state);
    //console.log(action);
    //console.log('zaushlo - commonReducer');
    switch (action.type) {

        case 'test' :
            let stateTestData= {...state};
            stateTestData.test = action.test;
            console.log(stateTestData);
            return stateTestData;


        default:
            return state;
    }
}

export const testDataCreator = (value) => {
    console.log(value);
    return {
        type: testData, test:value
    }
}




export default appReducer;


