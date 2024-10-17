import { ReactElement } from "react";
import {
    List,
    TextField,
    WrapperField,
    TopToolbar,
    SelectColumnsButton,
    DatagridConfigurable,
    SearchInput,
    minLength,
} from "react-admin";
import DatasetLocationIcon from "./DatasetLocationIcon";

const DatasetGridActions = () => (
    <TopToolbar>
        <SelectColumnsButton />
    </TopToolbar>
);

const datasetFilters = [
    <SearchInput source="search_query" alwaysOn validate={minLength(3)} />,
];

const DatasetGrid = (): ReactElement => {
    return (
        <List actions={<DatasetGridActions />} filters={datasetFilters}>
            <DatagridConfigurable bulkActionButtons={false}>
                <WrapperField source="location.type" sortable={false}>
                    <DatasetLocationIcon />
                </WrapperField>
                <TextField source="location.name" sortable={false} />
                <TextField source="name" sortable={false} />
            </DatagridConfigurable>
        </List>
    );
};

export default DatasetGrid;
