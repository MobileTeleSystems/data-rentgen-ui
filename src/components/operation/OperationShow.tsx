import { Stack } from "@mui/material";
import { ReactElement } from "react";
import {
    DateField,
    Labeled,
    ReferenceField,
    Show,
    SimpleShowLayout,
    TextField,
} from "react-admin";
import { DurationField, StatusField } from "@/components/base";

const OperationShow = (): ReactElement => {
    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="name" />

                <Labeled label="resources.operations.sections.external">
                    <Stack direction="row" spacing={3}>
                        <Labeled label="resources.operations.sections.position">
                            <TextField source="position" />
                        </Labeled>
                        <Labeled label="resources.operations.sections.group">
                            <TextField source="group" />
                        </Labeled>
                        <Labeled label="resources.operations.sections.description">
                            <TextField source="description" />
                        </Labeled>
                    </Stack>
                </Labeled>

                <Labeled label="resources.operations.sections.created">
                    <Stack direction="row" spacing={3}>
                        <Labeled label="resources.operations.sections.when">
                            <DateField source="created_at" showTime={true} />
                        </Labeled>
                        <Labeled label="resources.operations.sections.by_run">
                            <ReferenceField source="run_id" reference="runs" />
                        </Labeled>
                    </Stack>
                </Labeled>

                <DateField source="started_at" showTime={true} />

                <StatusField source="status" />
                <Labeled label="resources.operations.sections.ended">
                    <Stack direction="row" spacing={3}>
                        <Labeled label="resources.operations.sections.when">
                            <DateField source="ended_at" showTime={true} />
                        </Labeled>
                        <Labeled label="resources.operations.sections.duration">
                            <DurationField
                                source="duration"
                                start_field="started_at"
                                end_field="ended_at"
                            />
                        </Labeled>
                    </Stack>
                </Labeled>
            </SimpleShowLayout>
        </Show>
    );
};

export default OperationShow;
