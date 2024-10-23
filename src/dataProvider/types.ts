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

export type {
    LocationResponseV1,
    DatasetResponseV1,
    JobResponseV1,
    RunResponseV1,
    OperationResponseV1,
};
