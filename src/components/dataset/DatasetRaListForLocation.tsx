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

const DatasetRaListForLocation = ({
    locationId,
}: {
    locationId: number;
}): ReactElement => {
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
            resource="datasets"
            filter={{ location_id: locationId }}
            filters={datasetFilters}
            actions={<ListActions />}
            storeKey={false}
            title={false}
        >
            <DatagridConfigurable bulkActionButtons={false}>
                <TextField
                    source="data.name"
                    label="resources.datasets.fields.name"
                    sortable={false}
                />
            </DatagridConfigurable>
        </List>
    );
};

export default DatasetRaListForLocation;
