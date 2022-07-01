import { connect } from "react-redux";
import { testDataCreator } from "../../redux/appReducer";
import FormBlock from "./FormBlock";
import { reset } from "redux-form";
//import {withRouter} from "react-router-dom";


//import Сharacters from "./Сharacters";


const mapStateToProps = (state) => {
    //console.log(state);
    return {
        appState: state.appState,
        form: state.form
    }
}

let mapDispatchToProps = (dispatch) => {
    return {


        testData: (val) => {
            dispatch( testDataCreator( val ) );
        },
        resetForm: (val) => {
            dispatch(reset(val));
        }

    }
}

//let СharactersWithRouter = withRouter( Сharacters );
//let СharactersWithRouter = HashRouter( Сharacters );

let ComponentWithRouterProp = (props) => {
    //console.log(props);
    return (
        <FormBlock
            {...props}
        />
    );
}



//const СharactersContainer = connect(mapStateToProps, mapDispatchToProps)(СharactersWithRouter);
const FormBlockContainer = connect(mapStateToProps, mapDispatchToProps)(ComponentWithRouterProp);

export default FormBlockContainer;