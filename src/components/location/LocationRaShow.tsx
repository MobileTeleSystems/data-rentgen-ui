import { ReactElement } from "react";
import {
    ArrayField,
    Datagrid,
    Show,
    SimpleShowLayout,
    TextField,
    UrlField,
    WithRecord,
    WrapperField,
} from "react-admin";
import LocationIconWithType from "./LocationIconWithType";

const LocationRaShow = (): ReactElement => {
    return (
        <Show resource="locations">
            <SimpleShowLayout>
                <TextField source="id" />
                <WrapperField
                    source="data.type"
                    label="resources.locations.fields.type"
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
                />
                <TextField
                    source="data.external_id"
                    label="resources.locations.fields.external_id"
                />

                <ArrayField
                    source="data.addresses"
                    label="resources.locations.fields.addresses"
                >
                    <Datagrid bulkActionButtons={false}>
                        <UrlField source="url" target="_blank" />
                    </Datagrid>
                </ArrayField>
            </SimpleShowLayout>
        </Show>
    );
};

export default LocationRaShow;
