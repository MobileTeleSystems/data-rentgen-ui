import { ReactElement } from "react";
import { FieldProps, useCreatePath, useRecordContext } from "react-admin";
import { Link, Typography } from "@mui/material";

// Dataset & job responses already include full location response.
// Instead of using ReactAdmin's ReferenceField (which makes additional request to fetch locations by list[id]),
// make own link component
const LocationRaNameWithLinkField = (
    /* eslint-disable @typescript-eslint/no-unused-vars */
    props: FieldProps,
): ReactElement | null => {
    const record = useRecordContext();
    if (!record) {
        return null;
    }

    const createPath = useCreatePath();
    const path = createPath({
        resource: "locations",
        type: "show",
        id: record.location.id,
    });

    return (
        <Link href={`#${path}`}>
            <Typography variant="body2" component="span">
                {record.location.name}
            </Typography>
        </Link>
    );
};

export default LocationRaNameWithLinkField;
