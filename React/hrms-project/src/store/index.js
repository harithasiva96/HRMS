import {configureStore} from "@reduxjs/toolkit"
import loginDataReducer from "./login"
import employeeDataReducer from "./employee"
import postEmployeeReducer from "./addemployee"
import employeeDetailsReducer from "./employeeCard"
import designationDataReducer from "./listDesignation"
import postDesignationReducer from "./designationadd"
import updateEmployeeReducer from "./updateEmployee"
// import updateDesignationReducer from "./updateDesignation"


export const store = configureStore({
    reducer:{
        loginData : loginDataReducer,
        employeeData : employeeDataReducer,
        postData : postEmployeeReducer,
        employeeDetails: employeeDetailsReducer,
        designationData : designationDataReducer,
        postdesigData : postDesignationReducer,
        updateData : updateEmployeeReducer,
        // updateDesig : updateDesignationReducer,
    }
})