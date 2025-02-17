import { IOStatisticsResponseV1 } from "@/dataProvider/types";
import formatBytes from "@/utils/bytes";
import formatNumberApprox from "@/utils/numbers";
import { Typography } from "@mui/material";
import { ReactElement } from "react";
import {
    FieldProps,
    useFieldValue,
    useGetResourceLabel,
    useResourceContext,
    useTranslate,
} from "react-admin";

const formatDatasets = (datasets: number): string => {
    const getResourceLabel = useGetResourceLabel();
    return (
        datasets + " " + getResourceLabel("datasets", datasets).toLowerCase()
    );
};

const formatRows = (rows: number): string => {
    const resource = useResourceContext();
    const translate = useTranslate();
    return (
        formatNumberApprox(rows) +
        " " +
        translate(`resources.${resource}.fields.statistics.rows`, {
            smart_count: rows,
        })
    );
};

const formatFiles = (files: number): string => {
    const resource = useResourceContext();
    const translate = useTranslate();
    return (
        formatNumberApprox(files) +
        " " +
        translate(`resources.${resource}.fields.statistics.files`, {
            smart_count: files,
        })
    );
};

const IOStatisticsField = (props: FieldProps): ReactElement => {
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
            {formatDatasets(statistics.total_datasets)}
            {statistics.total_bytes > 0 &&
                ", " + formatBytes(statistics.total_bytes)}
            {statistics.total_rows > 0 &&
                ", " + formatRows(statistics.total_rows)}
            {statistics.total_files > 0 &&
                ", " + formatFiles(statistics.total_files)}
        </Typography>
    );
};

export default IOStatisticsField;
