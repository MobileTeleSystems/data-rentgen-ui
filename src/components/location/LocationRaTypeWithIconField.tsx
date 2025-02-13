import { ReactElement } from "react";
import { FieldProps, useRecordContext } from "react-admin";
import LocationIconWithType from "./LocationIconWithType";

const LocationRaTypeWithIconField = (
    /* eslint-disable @typescript-eslint/no-unused-vars */
    props: FieldProps,
): ReactElement | null => {
    const record = useRecordContext();
    if (!record) {
        return null;
    }
    return <LocationIconWithType location={record.data.location} />;
};

export default LocationRaTypeWithIconField;
