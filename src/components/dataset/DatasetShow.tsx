import { ReactElement } from "react";
import { Show, SimpleShowLayout, TextField, WithRecord } from "react-admin";

const DatasetShow = (): ReactElement => {
    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="location.type" />
                <TextField source="location.name" />
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
