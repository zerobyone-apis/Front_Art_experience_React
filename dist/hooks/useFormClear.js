"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const FormContext_1 = require("../contexts/FormContext");
exports.useFormClear = (initialState) => {
    const { values, setInitialValues } = react_1.useContext(FormContext_1.FormContext);
    react_1.useEffect(() => {
        setInitialValues(initialState);
    }, []);
    if (values === initialState)
        return true;
    return false;
};
