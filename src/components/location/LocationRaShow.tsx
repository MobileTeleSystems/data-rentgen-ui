import { ReactElement } from "react";
import {
    ArrayField,
    Datagrid,
    Show,
    SimpleShowLayout,
    TextField,
    WithRecord,
    WrapperField,
} from "react-admin";
import LocationIconWithType from "./LocationIconWithType";

const LocationRaShow = (): ReactElement => {
    return (
        <Show resource="locations">
            <SimpleShowLayout>
                <TextField source="id" />
                <WrapperField source="type">
                    <WithRecord
                        render={(record) => (
                            <LocationIconWithType location={record} />
                        )}
                    />
                </WrapperField>
                <TextField source="name" />
                <TextField source="external_id" />

                <ArrayField source="addresses">
                    <Datagrid bulkActionButtons={false}>
                        <TextField source="url" />
                    </Datagrid>
                </ArrayField>
            </SimpleShowLayout>
        </Show>
    );
};

export default LocationRaShow;
