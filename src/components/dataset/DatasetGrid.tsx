import { ReactElement } from "react";
import { List, Datagrid, TextField } from "react-admin";

const DatasetGrid = (): ReactElement => {
    return (
        <List>
            <Datagrid bulkActionButtons={false}>
                <TextField source="name" />
                <TextField source="location.type" />
                <TextField source="location.name" />
            </Datagrid>
        </List>
    );
};

export default DatasetGrid;
