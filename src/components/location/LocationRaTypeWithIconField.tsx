import { ReactElement } from "react";
import { FieldProps, useRecordContext } from "react-admin";
import LocationIconWithType from "./LocationIconWithType";

const LocationRaTypeWithIconField = (
    props: FieldProps,
): ReactElement | null => {
    const record = useRecordContext();
    if (!record) {
        return null;
    }
    return <LocationIconWithType location={record.location} />;
};

export default LocationRaTypeWithIconField;
