import { ReactElement } from "react";
import {
    List,
    TextField,
    WrapperField,
    TopToolbar,
    SelectColumnsButton,
    SearchInput,
    minLength,
    DatagridConfigurable,
} from "react-admin";
import JobIcon from "./JobIcon";
import JobLocationIcon from "./JobLocationIcon";

const JobGridActions = () => (
    <TopToolbar>
        <SelectColumnsButton />
    </TopToolbar>
);

const jobFilters = [
    <SearchInput source="search_query" alwaysOn validate={minLength(3)} />,
];

const JobGrid = (): ReactElement => {
    return (
        <List actions={<JobGridActions />} filters={jobFilters}>
            <DatagridConfigurable bulkActionButtons={false}>
                <WrapperField source="type" sortable={false}>
                    <JobIcon />
                </WrapperField>
                <TextField source="name" sortable={false} />
                <WrapperField source="location.type" sortable={false}>
                    <JobLocationIcon />
                </WrapperField>
                <TextField source="location.name" sortable={false} />
            </DatagridConfigurable>
        </List>
    );
};

export default JobGrid;
