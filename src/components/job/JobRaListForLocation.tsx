import { ReactElement } from "react";

import { ListActions } from "@/components/base";
import {
    List,
    TextField,
    DatagridConfigurable,
    SearchInput,
    minLength,
    useTranslate,
} from "react-admin";
import JobRaTypeField from "./JobRaTypeField";

const JobRaListForLocation = ({
    locationId,
}: {
    locationId: number;
}): ReactElement => {
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
            resource="jobs"
            filter={{ location_id: locationId }}
            filters={jobFilters}
            actions={<ListActions />}
            title={false}
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
            </DatagridConfigurable>
        </List>
    );
};

export default JobRaListForLocation;
