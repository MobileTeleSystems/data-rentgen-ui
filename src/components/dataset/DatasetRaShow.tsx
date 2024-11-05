import { ReactElement } from "react";
import {
    Show,
    SimpleShowLayout,
    TextField,
    TabbedShowLayout,
    WithRecord,
    WrapperField,
} from "react-admin";
import { LocationIconWithType } from "@/components/location";
import DatasetRaLineage from "./DatasetRaLineage";

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

                <TabbedShowLayout>
                    <TabbedShowLayout.Tab label="resources.datasets.tabs.lineage">
                        <DatasetRaLineage />
                    </TabbedShowLayout.Tab>
                </TabbedShowLayout>
            </SimpleShowLayout>
        </Show>
    );
};

export default DatasetShow;
