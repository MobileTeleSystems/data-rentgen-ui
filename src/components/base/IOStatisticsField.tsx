import { IOStatisticsResponseV1 } from "@/dataProvider/types";
import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { FieldProps, useFieldValue } from "react-admin";
import ByteCountField from "./ByteCountField";
import RowCountField from "./RowCountField";
import FileCountField from "./FileCountField";
import DatasetCountField from "./DatasetCountField";

const IOStatisticsField = (props: FieldProps): ReactNode => {
    const statistics = useFieldValue(props) as IOStatisticsResponseV1;
    if (statistics.total_datasets == 0) {
        return (
            <Typography component="span" variant="body2">
                -
            </Typography>
        );
    }

    return (
        <Typography component="span" variant="body2">
            <DatasetCountField datasets={statistics.total_datasets} />
            {statistics.total_bytes > 0 ? ", " : ""}
            <ByteCountField bytes={statistics.total_bytes} />
            {statistics.total_rows > 0 ? ", " : ""}
            <RowCountField rows={statistics.total_rows} />
            {statistics.total_files > 0 ? ", " : ""}
            <FileCountField files={statistics.total_files} />
        </Typography>
    );
};

export default IOStatisticsField;
