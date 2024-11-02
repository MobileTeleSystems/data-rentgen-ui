import { ReactElement } from "react";
import {
    List,
    TextField,
    WrapperField,
    SearchInput,
    minLength,
    DatagridConfigurable,
    useTranslate,
    WithRecord,
} from "react-admin";
import { ListActions } from "@/components/base";
import JobIcon from "./JobIconWithType";
import { LocationIconWithType } from "@/components/location";

const JobRaList = (): ReactElement => {
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
                    <WithRecord render={(record) => <JobIcon job={record} />} />
                </WrapperField>
                <TextField source="name" sortable={false} />
                <WrapperField source="location.type" sortable={false}>
                    <WithRecord
                        render={(record) => (
                            <LocationIconWithType location={record.location} />
                        )}
                    />
                </WrapperField>
                <TextField source="location.name" sortable={false} />
            </DatagridConfigurable>
        </List>
    );
};

export default JobRaList;
