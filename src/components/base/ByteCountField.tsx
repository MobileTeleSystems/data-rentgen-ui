import { getApproxBytes } from "@/utils/bytes";
import { ReactNode } from "react";
import { useTranslate } from "react-admin";

type ByteCountFieldProps = {
    bytes: number;
    zero?: ReactNode;
};

const ByteCountField = ({
    bytes,
    zero = null,
}: ByteCountFieldProps): ReactNode => {
    const translate = useTranslate();

    if (bytes === 0) {
        return zero;
    }

    const { value, suffix } = getApproxBytes(bytes);
    return value + " " + translate(`units.bytes.${suffix}`, { _: suffix });
};

export default ByteCountField;
