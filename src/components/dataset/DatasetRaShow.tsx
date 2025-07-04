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
                <TextField
                    source="data.id"
                    label="resources.locations.fields.id"
                />
                <LocationRaTypeWithIconField
                    source="data.location.type"
                    label="resources.locations.fields.type"
                />
                <LocationRaNameWithLinkField
                    source="data.location.name"
                    label="resources.locations.fields.name"
                />

                <TextField
                    source="data.name"
                    label="resources.datasets.fields.name"
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
