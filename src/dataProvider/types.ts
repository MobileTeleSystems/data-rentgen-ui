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

export type { LocationResponseV1, DatasetResponseV1, JobResponseV1 };
