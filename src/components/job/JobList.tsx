import { ReactElement } from "react";
import {
    List,
    TextField,
    WrapperField,
    SearchInput,
    minLength,
    DatagridConfigurable,
    useTranslate,
} from "react-admin";
import { ListActions } from "@/components/base";
import JobIcon from "./JobIcon";
import JobLocationIcon from "./JobLocationIcon";

const JobList = (): ReactElement => {
    const translate = useTranslate();

    const jobFilters = [
        <SearchInput
            source="search_query"
            alwaysOn
            validate={minLength(3)}
            placeholder={translate(
                "resources.jobs.filters.search_query.placeholder",
            )}
        />,
    ];

    return (
        <List actions={<ListActions />} filters={jobFilters} resource="jobs">
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

export default JobList;
