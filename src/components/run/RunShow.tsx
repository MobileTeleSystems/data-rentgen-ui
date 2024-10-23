import { Divider, Stack } from "@mui/material";
import { ReactElement } from "react";
import {
    DateField,
    Labeled,
    ReferenceField,
    RichTextField,
    Show,
    SimpleShowLayout,
    TextField,
    UrlField,
    useTranslate,
    WithRecord,
    WrapperField,
} from "react-admin";
import { DurationField, StatusField } from "@/components/base";
import { OperationListForRun } from "../operation";

const RunShow = (): ReactElement => {
    const translate = useTranslate();

    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="id" />

                <Labeled label="resources.runs.sections.created">
                    <Stack direction="row" spacing={3}>
                        <Labeled label="resources.runs.sections.when">
                            <DateField source="created_at" showTime={true} />
                        </Labeled>
                        <Labeled label="resources.runs.sections.for_job">
                            <ReferenceField source="job_id" reference="jobs" />
                        </Labeled>
                        <Labeled label="resources.runs.sections.by_parent_run">
                            <ReferenceField
                                source="parent_run_id"
                                reference="runs"
                            />
                        </Labeled>
                    </Stack>
                </Labeled>

                <Labeled label="resources.runs.sections.started">
                    <Stack direction="row" spacing={3}>
                        <Labeled label="resources.runs.sections.when">
                            <DateField source="started_at" showTime={true} />
                        </Labeled>
                        <Labeled label="resources.runs.sections.how">
                            <TextField source="start_reason" />
                        </Labeled>
                        <Labeled label="resources.runs.sections.as_user">
                            <WrapperField source="started_by_user">
                                <TextField source="started_by_user.name" />
                            </WrapperField>
                        </Labeled>
                    </Stack>
                </Labeled>

                <StatusField source="status" />
                <Labeled label="resources.runs.sections.ended">
                    <Stack direction="row" spacing={3}>
                        <Labeled label="resources.runs.sections.when">
                            <DateField source="ended_at" showTime={true} />
                        </Labeled>
                        <Labeled label="resources.runs.sections.how">
                            <RichTextField source="end_reason" />
                        </Labeled>
                        <Labeled label="resources.runs.sections.duration">
                            <DurationField
                                source="duration"
                                start_field="started_at"
                                end_field="ended_at"
                            />
                        </Labeled>
                    </Stack>
                </Labeled>

                <Labeled label="resources.runs.sections.external">
                    <Stack direction="row" spacing={3}>
                        <Labeled label="resources.runs.sections.id">
                            <TextField source="external_id" />
                        </Labeled>
                        <Labeled label="resources.runs.sections.attempt">
                            <TextField source="attempt" />
                        </Labeled>
                        <Labeled label="resources.runs.sections.external_url">
                            <UrlField source="running_log_url" />
                        </Labeled>
                        <Labeled label="resources.runs.sections.logs_url">
                            <UrlField source="persistent_log_url" />
                        </Labeled>
                    </Stack>
                </Labeled>

                <Divider>
                    {translate("resources.runs.sections.operations")}
                </Divider>

                <WithRecord
                    render={(record) => <OperationListForRun run={record} />}
                />
            </SimpleShowLayout>
        </Show>
    );
};

export default RunShow;
