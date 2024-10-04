import { ReactElement } from "react";
import {
    Show,
    SimpleShowLayout,
    TextField,
    WithRecord,
    WrapperField,
} from "react-admin";
import DatasetLocationIcon from "./DatasetLocationIcon";

const DatasetShow = (): ReactElement => {
    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="id" />
                <WrapperField source="location.type">
                    <DatasetLocationIcon />
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
