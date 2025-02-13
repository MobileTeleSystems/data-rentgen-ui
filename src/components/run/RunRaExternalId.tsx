import { RunDetailedResponseV1 } from "@/dataProvider/types";
import { Link } from "@mui/material";
import { FieldProps, TextField, useRecordContext } from "react-admin";

const RunRaExternalId = (props: FieldProps) => {
    const record = useRecordContext<RunDetailedResponseV1>();
    if (!record || !record.data.external_id) {
        return null;
    }

    const log_url =
        record.data.persistent_log_url || record.data.running_log_url;

    if (!log_url) {
        return <TextField {...props} />;
    }

    return (
        <Link href={log_url} target="_blank">
            {record.data.external_id}
        </Link>
    );
};
export default RunRaExternalId;
