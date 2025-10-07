import { ReactElement } from "react";
import { List, TextField, DatagridConfigurable } from "react-admin";
import { ListActions } from "@/components/base";
import {
    LocationRaNameWithLinkField,
    LocationRaTypeWithIconField,
} from "@/components/location";
import DatasetRaListFilters from "./DatasetRaListFilters";

const DatasetRaList = (): ReactElement => {
    return (
        <List
            actions={
                <ListActions>
                    <DatasetRaListFilters />
                </ListActions>
            }
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
