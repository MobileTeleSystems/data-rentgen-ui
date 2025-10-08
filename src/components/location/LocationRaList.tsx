import { ReactElement } from "react";
import {
    List,
    TextField,
    DatagridConfigurable,
    WithRecord,
    WrapperField,
} from "react-admin";
import { ListActions } from "@/components/base";
import LocationIconWithType from "./LocationIconWithType";
import LocationRaListFilters from "./LocationRaListFilters";

const LocationRaList = (): ReactElement => {
    return (
        <List
            actions={
                <ListActions>
                    <LocationRaListFilters />
                </ListActions>
            }
            resource="locations"
            storeKey={false}
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
