import { RaRecord } from "react-admin";

interface AddressResponseV1 {
    url: string;
}

interface LocationResponseV1 {
    type: string;
    name: string;
    adresses: AddressResponseV1[];
}

interface LocationDatasetStatisticsResponseV1 {
    total_datasets: number;
}

interface LocationJobStatisticsResponseV1 {
    total_jobs: number;
}

interface LocationStatisticsResponseV1 {
    datasets: LocationDatasetStatisticsResponseV1;
    jobs: LocationJobStatisticsResponseV1;
}

interface LocationDetailedResponseV1 {
    id: string;
    data: LocationResponseV1;
    statistics: LocationStatisticsResponseV1;
}

interface DatasetResponseV1 extends RaRecord {
    id: string;
    type: string;
    name: string;
    location: LocationResponseV1;
    format: string | null;
}

interface DatasetDetailedResponseV1 {
    id: string;
    data: DatasetResponseV1;
}

type JobTypeResponseV1 =
    | "SPARK_APPLICATION"
    | "AIRFLOW_DAG"
    | "AIRFLOW_TASK"
    | "UNKNOWN";

interface JobResponseV1 extends RaRecord {
    id: string;
    type: JobTypeResponseV1;
    name: string;
    location: LocationResponseV1;
}

interface JobDetailedResponseV1 {
    id: string;
    data: JobResponseV1;
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
    job_id: string;
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

interface IOStatisticsResponseV1 {
    total_datasets: number;
    total_bytes: number;
    total_rows: number;
    total_files: number;
}

interface RunOperationStatisticsResponseV1 {
    total_operations: number;
}

interface RunStatisticsResponseV1 {
    inputs: IOStatisticsResponseV1;
    outputs: IOStatisticsResponseV1;
    operations: RunOperationStatisticsResponseV1;
}

interface RunDetailedResponseV1 {
    id: string;
    data: RunResponseV1;
    statistics: RunStatisticsResponseV1;
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

interface OperationStatisticsResponseV1 {
    inputs: IOStatisticsResponseV1;
    outputs: IOStatisticsResponseV1;
}

interface OperationDetailedResponseV1 {
    id: string;
    data: OperationResponseV1;
    statistics: OperationStatisticsResponseV1;
}

type EntityTypeLineageResponseV1 = "DATASET" | "JOB" | "RUN" | "OPERATION";

interface RelationEndpointLineageResponseV1 {
    kind: EntityTypeLineageResponseV1;
    id: string | string;
}

interface BaseRelationLineageResponseV1 {
    from: RelationEndpointLineageResponseV1;
    to: RelationEndpointLineageResponseV1;
}

type IORelationSchemaRelevanceTypeV1 = "EXACT_MATCH" | "LATEST_KNOWN";

type IORelationSchemaV1 = {
    id: string;
    fields: IORelationSchemaFieldV1[];
    relevance_type: IORelationSchemaRelevanceTypeV1;
};

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

interface ColumnLineageFieldResponseV1 {
    field: string;
    types: string[];
}

interface DirectColumnLineageRelationLineageResponseV1
    extends BaseRelationLineageResponseV1 {
    fields: { [target_field: string]: ColumnLineageFieldResponseV1[] };
}

interface IndirectColumnLineageRelationLineageResponseV1
    extends BaseRelationLineageResponseV1 {
    fields: ColumnLineageFieldResponseV1[];
}

interface SymlinkRelationLineageResponseV1
    extends BaseRelationLineageResponseV1 {
    type: SymlinkRelationTypeLineageResponseV1;
}

interface LineageRelationsResponseV1 {
    parents: ParentRelationLineageResponseV1[];
    inputs: InputRelationLineageResponseV1[];
    outputs: OutputRelationLineageResponseV1[];
    symlinks: SymlinkRelationLineageResponseV1[];
    // TODO: remove undefined after implementing these fields in backend API
    direct_column_lineage?: DirectColumnLineageRelationLineageResponseV1[];
    indirect_column_lineage?: IndirectColumnLineageRelationLineageResponseV1[];
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
    LocationDatasetStatisticsResponseV1,
    LocationJobStatisticsResponseV1,
    LocationStatisticsResponseV1,
    LocationDetailedResponseV1,
    DatasetResponseV1,
    DatasetDetailedResponseV1,
    JobResponseV1,
    JobDetailedResponseV1,
    RunResponseV1,
    IOStatisticsResponseV1,
    RunOperationStatisticsResponseV1,
    RunStatisticsResponseV1,
    RunDetailedResponseV1,
    OperationResponseV1,
    OperationStatisticsResponseV1,
    OperationDetailedResponseV1,
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
    IORelationSchemaRelevanceTypeV1,
    IORelationSchemaV1,
    OutputRelationLineageResponseV1,
    OutputRelationTypeLineageResponseV1,
    ParentRelationLineageResponseV1,
    SymlinkRelationLineageResponseV1,
    SymlinkRelationTypeLineageResponseV1,
    LineageNodesResponseV1,
    LineageRelationsResponseV1,
    LineageResponseV1,
    ColumnLineageFieldResponseV1,
    DirectColumnLineageRelationLineageResponseV1,
    IndirectColumnLineageRelationLineageResponseV1,
};
