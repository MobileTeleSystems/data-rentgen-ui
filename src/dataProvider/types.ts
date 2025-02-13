import { RaRecord } from "react-admin";

interface AddressResponseV1 {
    url: string;
}

interface LocationResponseV1 {
    type: string;
    name: string;
    adresses: AddressResponseV1[];
}

interface DatasetResponseV1 extends RaRecord {
    id: number;
    type: string;
    name: string;
    location: LocationResponseV1;
    format: string | null;
}

type JobTypeResponseV1 =
    | "SPARK_APPLICATION"
    | "AIRFLOW_DAG"
    | "AIRFLOW_TASK"
    | "UNKNOWN";

interface JobResponseV1 extends RaRecord {
    id: number;
    type: JobTypeResponseV1;
    name: string;
    location: LocationResponseV1;
}

interface UserResponseV1 extends RaRecord {
    name: string;
}

type StatusResponseV1 =
    | "STARTED"
    | "RUNNING"
    | "SUCCEEDED"
    | "FAILED"
    | "KILLED"
    | "UNKNOWN";

type StartReasonResponseV1 = "AUTOMATIC" | "MANUAL";

interface RunResponseV1 extends RaRecord {
    id: string;
    created_at: string;
    job_id: number;
    status: StatusResponseV1;
    parent_run_id: string | null;
    started_at: string | null;
    started_by_user: UserResponseV1 | null;
    start_reason: StartReasonResponseV1 | null;
    ended_at: string | null;
    end_reason: string | null;
    external_id: string | null;
    attempt: string | null;
    running_log_url: string | null;
    persistent_log_url: string | null;
}

type OperationTypeResponseV1 = "BATCH" | "STREAMING";

interface OperationResponseV1 extends RaRecord {
    id: string;
    created_at: string;
    run_id: string;
    type: OperationTypeResponseV1;
    name: string;
    position: string | null;
    group: string | null;
    description: string | null;
    status: StatusResponseV1;
    started_at: string | null;
    ended_at: string | null;
}

type EntityTypeLineageResponseV1 = "DATASET" | "JOB" | "RUN" | "OPERATION";

interface RelationEndpointLineageResponseV1 {
    kind: EntityTypeLineageResponseV1;
    id: number | string;
}

interface BaseRelationLineageResponseV1 {
    from: RelationEndpointLineageResponseV1;
    to: RelationEndpointLineageResponseV1;
}

interface IORelationSchemaV1 {
    id: number;
    fields: IORelationSchemaFieldV1[];
}

interface IORelationSchemaFieldV1 {
    name: string;
    type: string | null;
    description: string | null;
    fields: IORelationSchemaFieldV1[];
}

interface InputRelationLineageResponseV1 extends BaseRelationLineageResponseV1 {
    last_interaction_at: string;
    num_rows: number | null;
    num_bytes: number | null;
    num_files: number | null;
    schema: IORelationSchemaV1 | null;
}

type OutputRelationTypeLineageResponseV1 =
    | "ALTER"
    | "CREATE"
    | "DROP"
    | "OVERWRITE"
    | "RENAME"
    | "TRUNCATE";

interface OutputRelationLineageResponseV1
    extends BaseRelationLineageResponseV1 {
    last_interaction_at: string;
    type: OutputRelationTypeLineageResponseV1 | null;
    num_rows: number | null;
    num_bytes: number | null;
    num_files: number | null;
    schema: IORelationSchemaV1 | null;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ParentRelationLineageResponseV1
    extends BaseRelationLineageResponseV1 {}

type SymlinkRelationTypeLineageResponseV1 = "METASTORE" | "WAREHOUSE";

interface SymlinkRelationLineageResponseV1
    extends BaseRelationLineageResponseV1 {
    type: SymlinkRelationTypeLineageResponseV1;
}

interface LineageRelationsResponseV1 {
    parents: ParentRelationLineageResponseV1[];
    inputs: InputRelationLineageResponseV1[];
    outputs: OutputRelationLineageResponseV1[];
    symlinks: SymlinkRelationLineageResponseV1[];
}

interface LineageNodesResponseV1 {
    datasets: { [id: string]: DatasetResponseV1 };
    jobs: { [id: string]: JobResponseV1 };
    runs: { [id: string]: RunResponseV1 };
    operations: { [id: string]: OperationResponseV1 };
}

interface LineageResponseV1 {
    nodes: LineageNodesResponseV1;
    relations: LineageRelationsResponseV1;
}

export type {
    LocationResponseV1,
    DatasetResponseV1,
    JobResponseV1,
    RunResponseV1,
    OperationResponseV1,
    UserResponseV1,
    StatusResponseV1,
    StartReasonResponseV1,
    JobTypeResponseV1,
    OperationTypeResponseV1,
    EntityTypeLineageResponseV1,
    RelationEndpointLineageResponseV1,
    BaseRelationLineageResponseV1,
    InputRelationLineageResponseV1,
    IORelationSchemaFieldV1,
    IORelationSchemaV1,
    OutputRelationLineageResponseV1,
    OutputRelationTypeLineageResponseV1,
    ParentRelationLineageResponseV1,
    SymlinkRelationLineageResponseV1,
    SymlinkRelationTypeLineageResponseV1,
    LineageNodesResponseV1,
    LineageRelationsResponseV1,
    LineageResponseV1,
};
