import { ReactElement } from "react";
import {
    Show,
    SimpleShowLayout,
    TextField,
    TabbedShowLayout,
    WithRecord,
} from "react-admin";
import {
    LocationRaNameWithLinkField,
    LocationRaTypeWithIconField,
} from "@/components/location";
import DatasetRaLineage from "./DatasetRaLineage";

const DatasetRaShow = (): ReactElement => {
    return (
        <Show resource="datasets">
            <SimpleShowLayout>
                <TextField source="data.id" label="id" />
                <LocationRaTypeWithIconField
                    source="data.location.type"
                    label="location.type"
                />
                <LocationRaNameWithLinkField
                    source="data.location.name"
                    label="location.name"
                />

                <TextField source="data.name" label="name" />
                <WithRecord
                    render={(record) =>
                        record.format && (
                            <TextField source="data.format" label="format" />
                        )
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

export default DatasetRaShow;
