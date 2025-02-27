import { ReactElement } from "react";
import {
    List,
    TextField,
    SearchInput,
    minLength,
    DatagridConfigurable,
    useTranslate,
} from "react-admin";
import { ListActions } from "@/components/base";
import {
    LocationRaNameWithLinkField,
    LocationRaTypeWithIconField,
} from "@/components/location";
import JobRaTypeField from "./JobRaTypeField";

const JobRaList = (): ReactElement => {
    const translate = useTranslate();

    const jobFilters = [
        <SearchInput
            key="search_query"
            source="search_query"
            alwaysOn
            validate={minLength(3)}
            placeholder={translate(
                "resources.jobs.filters.search_query.placeholder",
            )}
        />,
    ];

    return (
        <List
            actions={<ListActions />}
            filters={jobFilters}
            resource="jobs"
            storeKey={false}
        >
            <DatagridConfigurable bulkActionButtons={false}>
                <JobRaTypeField
                    source="data.type"
                    label="resources.jobs.fields.type"
                />
                <TextField
                    source="data.name"
                    label="resources.jobs.fields.name"
                    sortable={false}
                />

                <LocationRaTypeWithIconField
                    source="data.location.type"
                    label="resources.jobs.fields.location.type"
                />
                <LocationRaNameWithLinkField
                    source="data.location.name"
                    label="resources.jobs.fields.location.name"
                />
            </DatagridConfigurable>
        </List>
    );
};

export default JobRaList;
