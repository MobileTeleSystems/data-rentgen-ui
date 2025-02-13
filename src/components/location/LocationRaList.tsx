import { ReactElement } from "react";
import {
    List,
    TextField,
    DatagridConfigurable,
    SearchInput,
    minLength,
    useTranslate,
    WithRecord,
    WrapperField,
} from "react-admin";
import { ListActions } from "@/components/base";
import LocationIconWithType from "./LocationIconWithType";

const LocationRaList = (): ReactElement => {
    const translate = useTranslate();

    const locationFilters = [
        <SearchInput
            key="search_query"
            source="search_query"
            alwaysOn
            validate={minLength(3)}
            placeholder={translate(
                "resources.locations.filters.search_query.placeholder",
            )}
        />,
    ];

    return (
        <List
            actions={<ListActions />}
            filters={locationFilters}
            resource="locations"
        >
            <DatagridConfigurable bulkActionButtons={false}>
                <WrapperField
                    source="data.type"
                    label="resources.locations.fields.type"
                    sortable={false}
                >
                    <WithRecord
                        render={(record) => (
                            <LocationIconWithType location={record.data} />
                        )}
                    />
                </WrapperField>
                <TextField
                    source="data.name"
                    label="resources.locations.fields.name"
                    sortable={false}
                />
                <TextField
                    source="data.external_id"
                    label="resources.locations.fields.external_id"
                    sortable={false}
                />
            </DatagridConfigurable>
        </List>
    );
};

export default LocationRaList;
