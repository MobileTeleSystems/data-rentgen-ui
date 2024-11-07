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
                <TextField source="id" />
                <LocationRaTypeWithIconField source="location.type" />
                <LocationRaNameWithLinkField source="location.name" />

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

export default DatasetRaShow;
