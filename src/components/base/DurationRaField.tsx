import { ReactElement } from "react";
import { FieldProps, FunctionField } from "react-admin";

import DurationField from "./DurationField";

const DurationRaField = (props: FieldProps): ReactElement => {
    return (
        <FunctionField
            render={(record) => (
                <DurationField fieldSet={record.data}></DurationField>
            )}
            {...props}
        />
    );
};

export default DurationRaField;
