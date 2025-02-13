import { Stack } from "@mui/material";
import { ReactElement } from "react";
import {
    DateField,
    Labeled,
    ReferenceField,
    Show,
    SimpleShowLayout,
    TabbedShowLayout,
    TextField,
} from "react-admin";
import { DurationField, StatusField } from "@/components/base";
import OperationRaLineage from "./OperationRaLineage";

const OperationRaShow = (): ReactElement => {
    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="data.name" />

                <Labeled label="resources.operations.sections.external">
                    <Stack direction="row" spacing={3}>
                        <Labeled label="resources.operations.sections.position">
                            <TextField source="data.position" />
                        </Labeled>
                        <Labeled label="resources.operations.sections.group">
                            <TextField source="data.group" />
                        </Labeled>
                        <Labeled label="resources.operations.sections.description">
                            <TextField source="data.description" />
                        </Labeled>
                    </Stack>
                </Labeled>

                <Labeled label="resources.operations.sections.created">
                    <Stack direction="row" spacing={3}>
                        <Labeled label="resources.operations.sections.when">
                            <DateField
                                source="data.created_at"
                                showTime={true}
                            />
                        </Labeled>
                        <Labeled label="resources.operations.sections.by_run">
                            <ReferenceField
                                source="data.run_id"
                                reference="runs"
                            />
                        </Labeled>
                    </Stack>
                </Labeled>

                <DateField source="data.started_at" showTime={true} />

                <StatusField source="status" />
                <Labeled label="resources.operations.sections.ended">
                    <Stack direction="row" spacing={3}>
                        <Labeled label="resources.operations.sections.when">
                            <DateField source="data.ended_at" showTime={true} />
                        </Labeled>
                        <Labeled label="resources.operations.sections.duration">
                            <DurationField source="duration" />
                        </Labeled>
                    </Stack>
                </Labeled>

                <TabbedShowLayout>
                    <TabbedShowLayout.Tab label="resources.operations.tabs.lineage">
                        <OperationRaLineage />
                    </TabbedShowLayout.Tab>
                </TabbedShowLayout>
            </SimpleShowLayout>
        </Show>
    );
};

export default OperationRaShow;
