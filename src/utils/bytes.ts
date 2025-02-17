import { useTranslate } from "react-admin";

const step = 1024;
const suffixes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

const formatBytes = (bytes: number, precision = 3) => {
    const translate = useTranslate();
    const i = Math.floor(Math.log(bytes) / Math.log(step));
    const suffix = suffixes[i];
    const suffixTranslation = translate(`units.bytes.${suffix}`, { _: suffix });
    const result = bytes / Math.pow(step, i);

    return result.toPrecision(precision) + suffixTranslation;
};

export default formatBytes;
