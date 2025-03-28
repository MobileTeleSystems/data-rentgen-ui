import { ReactElement } from "react";
import {
    List,
    TextField,
    DatagridConfigurable,
    SearchInput,
    minLength,
    useTranslate,
} from "react-admin";
import { ListActions } from "@/components/base";
import {
    LocationRaNameWithLinkField,
    LocationRaTypeWithIconField,
} from "@/components/location";

const DatasetRaList = (): ReactElement => {
    const translate = useTranslate();

    const datasetFilters = [
        <SearchInput
            key="search_query"
            source="search_query"
            alwaysOn
            validate={minLength(3)}
            placeholder={translate(
                "resources.datasets.filters.search_query.placeholder",
            )}
        />,
    ];

    return (
        <List
            actions={<ListActions />}
            filters={datasetFilters}
            resource="datasets"
            storeKey={false}
        >
            <DatagridConfigurable bulkActionButtons={false}>
                <LocationRaTypeWithIconField
                    source="data.location.type"
                    label="resources.locations.fields.type"
                    sortable={false}
                />
                <LocationRaNameWithLinkField
                    source="data.location.name"
                    label="resources.locations.fields.name"
                    sortable={false}
                />
                <TextField
                    source="data.name"
                    label="resources.datasets.fields.name"
                    sortable={false}
                />
            </DatagridConfigurable>
        </List>
    );
};

export default DatasetRaList;
