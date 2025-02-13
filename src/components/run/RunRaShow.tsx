import { Stack } from "@mui/material";
import { ReactElement } from "react";
import {
    DateField,
    Labeled,
    ReferenceField,
    RichTextField,
    Show,
    SimpleShowLayout,
    TabbedShowLayout,
    TextField,
    UrlField,
    WithRecord,
} from "react-admin";
import { DurationField, StatusField } from "@/components/base";
import { OperationRaListForRun } from "@/components/operation";
import RunRaLineage from "./RunRaLineage";
import RunRaListForParentRun from "./RunRaListForParentRun";

const RunRaShow = (): ReactElement => {
    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="id" />

                <Labeled label="resources.runs.sections.created">
                    <Stack direction="row" spacing={3}>
                        <Labeled label="resources.runs.sections.when">
                            <DateField
                                source="data.created_at"
                                showTime={true}
                            />
                        </Labeled>
                        <Labeled label="resources.runs.sections.for_job">
                            <ReferenceField
                                source="data.job_id"
                                reference="jobs"
                            />
                        </Labeled>
                        <Labeled label="resources.runs.sections.by_parent_run">
                            <ReferenceField
                                source="data.parent_run_id"
                                reference="runs"
                            />
                        </Labeled>
                    </Stack>
                </Labeled>

                <Labeled label="resources.runs.sections.started">
                    <Stack direction="row" spacing={3}>
                        <Labeled label="resources.runs.sections.when">
                            <DateField
                                source="data.started_at"
                                showTime={true}
                            />
                        </Labeled>
                        <Labeled label="resources.runs.sections.how">
                            <TextField source="data.start_reason" />
                        </Labeled>
                        <Labeled label="resources.runs.sections.as_user">
                            <TextField source="data.started_by_user.name" />
                        </Labeled>
                    </Stack>
                </Labeled>

                <StatusField source="status" />
                <Labeled label="resources.runs.sections.ended">
                    <Stack direction="row" spacing={3}>
                        <Labeled label="resources.runs.sections.when">
                            <DateField source="data.ended_at" showTime={true} />
                        </Labeled>
                        <Labeled label="resources.runs.sections.how">
                            <RichTextField source="data.end_reason" />
                        </Labeled>
                        <Labeled label="resources.runs.sections.duration">
                            <DurationField source="duration" />
                        </Labeled>
                    </Stack>
                </Labeled>

                <Labeled label="resources.runs.sections.external">
                    <Stack direction="row" spacing={3}>
                        <Labeled label="resources.runs.sections.id">
                            <TextField source="data.external_id" />
                        </Labeled>
                        <Labeled label="resources.runs.sections.attempt">
                            <TextField source="data.attempt" />
                        </Labeled>
                        <Labeled label="resources.runs.sections.external_url">
                            <UrlField
                                source="data.running_log_url"
                                target="_blank"
                            />
                        </Labeled>
                        <Labeled label="resources.runs.sections.logs_url">
                            <UrlField
                                source="data.persistent_log_url"
                                target="_blank"
                            />
                        </Labeled>
                    </Stack>
                </Labeled>

                <TabbedShowLayout>
                    <TabbedShowLayout.Tab label="resources.runs.tabs.operations">
                        <WithRecord
                            render={(record) => (
                                <OperationRaListForRun run={record.data} />
                            )}
                        />
                    </TabbedShowLayout.Tab>

                    <TabbedShowLayout.Tab label="resources.runs.tabs.child_runs">
                        <WithRecord
                            render={(record) => (
                                <RunRaListForParentRun
                                    parentRun={record.data}
                                />
                            )}
                        />
                    </TabbedShowLayout.Tab>

                    <TabbedShowLayout.Tab
                        label="resources.runs.tabs.lineage"
                        path="lineage"
                    >
                        <RunRaLineage />
                    </TabbedShowLayout.Tab>
                </TabbedShowLayout>
            </SimpleShowLayout>
        </Show>
    );
};

export default RunRaShow;
