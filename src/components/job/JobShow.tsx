import { ReactElement } from "react";
import { Show, SimpleShowLayout, TextField, WrapperField } from "react-admin";
import JobIconWithText from "./JobIcon";
import JobLocationIconWithText from "./JobLocationIcon";

const JobShow = (): ReactElement => {
    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="id" />
                <WrapperField source="type">
                    <JobIconWithText />
                </WrapperField>
                <TextField source="name" />
                <WrapperField source="location.type">
                    <JobLocationIconWithText />
                </WrapperField>
                <TextField source="location.name" />
            </SimpleShowLayout>
        </Show>
    );
};

export default JobShow;
