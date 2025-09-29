import { ReactElement } from "react";
import {
    TabbedShowLayout,
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
import { JobRaListForLocation } from "@/components/job";
import { DatasetRaListForLocation } from "@/components/dataset";

const LocationRaShow = (): ReactElement => {
    return (
        <Show resource="locations">
            <SimpleShowLayout>
                <TextField source="id" label="resources.locations.fields.id" />
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
                        <UrlField source="url" label="URL" target="_blank" />
                    </Datagrid>
                </ArrayField>
                <TabbedShowLayout>
                    <TabbedShowLayout.Tab label="resources.locations.tabs.datasets">
                        <WithRecord
                            render={(record) => (
                                <DatasetRaListForLocation
                                    locationId={record.id}
                                />
                            )}
                        />
                    </TabbedShowLayout.Tab>
                    <TabbedShowLayout.Tab label="resources.locations.tabs.jobs">
                        <WithRecord
                            render={(record) => (
                                <JobRaListForLocation locationId={record.id} />
                            )}
                        />
                    </TabbedShowLayout.Tab>
                </TabbedShowLayout>
            </SimpleShowLayout>
        </Show>
    );
};

export default LocationRaShow;
