import { ReactElement } from "react";
import {
    Show,
    SimpleShowLayout,
    TextField,
    WithRecord,
    WrapperField,
} from "react-admin";
import { LocationIconWithType } from "@/components/location";

const DatasetShow = (): ReactElement => {
    return (
        <Show resource="datasets">
            <SimpleShowLayout>
                <TextField source="id" />
                <WrapperField source="location.type">
                    <WithRecord
                        render={(record) => (
                            <LocationIconWithType location={record.location} />
                        )}
                    />
                </WrapperField>
                <TextField source="location.name" />
                <TextField source="name" />
                <WithRecord
                    render={(record) =>
                        record.format && <TextField source="format" />
                    }
                />
            </SimpleShowLayout>
        </Show>
    );
};

export default DatasetShow;
