import { ReactElement } from "react";
import { List, Datagrid, TextField, WrapperField } from "react-admin";
import JobIcon from "./JobIcon";
import JobLocationIcon from "./JobLocationIcon";

const JobGrid = (): ReactElement => {
    return (
        <List>
            <Datagrid bulkActionButtons={false}>
                <WrapperField source="type">
                    <JobIcon />
                </WrapperField>
                <TextField source="name" />
                <WrapperField source="location.type">
                    <JobLocationIcon />
                </WrapperField>
                <TextField source="location.name" />
            </Datagrid>
        </List>
    );
};

export default JobGrid;
