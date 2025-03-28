import { getApproxNumber } from "@/utils/numbers";
import { ReactNode } from "react";
import { useTranslate } from "react-admin";

type RowCountFieldProps = {
    rows: number;
    zero?: ReactNode;
};

const RowCountField = ({
    rows,
    zero = null,
}: RowCountFieldProps): ReactNode => {
    const translate = useTranslate();
    if (rows === 0) {
        return zero;
    }

    const { value, suffix } = getApproxNumber(rows);
    return (
        value +
        translate(`units.numbers.${suffix}`, { _: suffix }) +
        " " +
        translate("units.rows", {
            smart_count: Math.min(rows, 1000),
            _: "rows",
        })
    );
};

export default RowCountField;
