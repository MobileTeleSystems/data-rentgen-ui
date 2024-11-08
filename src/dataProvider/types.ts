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
    kind: "DATASET";
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
    kind: "JOB";
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
    kind: "RUN";
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
    kind: "OPERATION";
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
    kind: string;
    from: RelationEndpointLineageResponseV1;
    to: RelationEndpointLineageResponseV1;
}

interface InputRelationLineageResponseV1 extends BaseRelationLineageResponseV1 {
    kind: "INPUT";
    num_rows: number | null;
    num_bytes: number | null;
    num_files: number | null;
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
    kind: "OUTPUT";
    type: OutputRelationTypeLineageResponseV1;
    num_rows: number | null;
    num_bytes: number | null;
    num_files: number | null;
}

interface ParentRelationLineageResponseV1
    extends BaseRelationLineageResponseV1 {
    kind: "PARENT";
}

type SymlinkRelationTypeLineageResponseV1 = "METASTORE" | "WAREHOUSE";

interface SymlinkRelationLineageResponseV1
    extends BaseRelationLineageResponseV1 {
    kind: "SYMLINK";
    type: SymlinkRelationTypeLineageResponseV1;
}

type LineageRelationResponseV1 =
    | InputRelationLineageResponseV1
    | OutputRelationLineageResponseV1
    | ParentRelationLineageResponseV1
    | SymlinkRelationLineageResponseV1;

type LineageNodeResponseV1 =
    | DatasetResponseV1
    | JobResponseV1
    | RunResponseV1
    | OperationResponseV1;

type LineageResponseV1 = {
    nodes: LineageNodeResponseV1[];
    relations: LineageRelationResponseV1[];
};

export type {
    LocationResponseV1,
    DatasetResponseV1,
    JobResponseV1,
    RunResponseV1,
    OperationResponseV1,
    LineageNodeResponseV1,
    LineageRelationResponseV1,
    LineageResponseV1,
    UserResponseV1,
    StatusResponseV1,
    StartReasonResponseV1,
    JobTypeResponseV1,
    OperationTypeResponseV1,
    EntityTypeLineageResponseV1,
    RelationEndpointLineageResponseV1,
    BaseRelationLineageResponseV1,
    InputRelationLineageResponseV1,
    OutputRelationLineageResponseV1,
    OutputRelationTypeLineageResponseV1,
    ParentRelationLineageResponseV1,
    SymlinkRelationLineageResponseV1,
    SymlinkRelationTypeLineageResponseV1,
};
