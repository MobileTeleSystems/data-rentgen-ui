import { ReactNode } from "react";
import { useTranslate } from "react-admin";

type DatasetCountFieldProps = {
    datasets: number;
    zero?: ReactNode;
};

const DatasetCountField = ({
    datasets,
    zero = null,
}: DatasetCountFieldProps): ReactNode => {
    const translate = useTranslate();
    if (datasets === 0) {
        return zero;
    }

    return translate("resources.datasets.amount", { smart_count: datasets });
};

export default DatasetCountField;
