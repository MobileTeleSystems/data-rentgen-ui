import { ReactElement } from "react";
import { List, Datagrid, TextField, WrapperField } from "react-admin";
import DatasetLocationIcon from "./DatasetLocationIcon";

const DatasetGrid = (): ReactElement => {
    return (
        <List>
            <Datagrid bulkActionButtons={false}>
                <WrapperField source="location.type">
                    <DatasetLocationIcon />
                </WrapperField>
                <TextField source="location.name" />
                <TextField source="name" />
            </Datagrid>
        </List>
    );
};

export default DatasetGrid;
