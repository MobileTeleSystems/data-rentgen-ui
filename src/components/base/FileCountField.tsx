import { getApproxNumber } from "@/utils/numbers";
import { ReactNode } from "react";
import { useTranslate } from "react-admin";

type FileCountFieldProps = {
    files: number;
    zero?: ReactNode;
};

const FileCountField = ({
    files,
    zero = null,
}: FileCountFieldProps): ReactNode => {
    const translate = useTranslate();
    if (files === 0) {
        return zero;
    }

    const { value, suffix } = getApproxNumber(files);
    return (
        value +
        translate(`units.numbers.${suffix}`, { _: suffix }) +
        " " +
        translate("units.files", {
            smart_count: Math.min(files, 1000),
            _: "files",
        })
    );
};

export default FileCountField;
