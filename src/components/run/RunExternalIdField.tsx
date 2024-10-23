import { RunResponseV1 } from "@/dataProvider/types";
import { Link } from "@mui/material";
import { FieldProps, TextField, useRecordContext } from "react-admin";

const RunExternalIdField = (props: FieldProps) => {
    const record = useRecordContext<RunResponseV1>();
    if (!record || !record.external_id) {
        return null;
    }

    const log_url = record.persistent_log_url || record.running_log_url;

    if (!log_url) {
        return <TextField {...props} />;
    }

    return (
        <Link href={log_url} target="_blank">
            {record.external_id}
        </Link>
    );
};
export default RunExternalIdField;
