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

export type { LocationResponseV1, DatasetResponseV1 };
