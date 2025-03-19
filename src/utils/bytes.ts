import { useTranslate } from "react-admin";

const step = 1024;
const suffixes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

const formatBytes = (bytes: number, precision = 3) => {
    const translate = useTranslate();
    let i = Math.floor(Math.log(bytes) / Math.log(step));
    let result = bytes / Math.pow(step, i);

    if (result >= 1000 && result < step) {
        // Avoid results like "1.01e+3MB"
        i += 1;
        result = 1;
        precision = 1;
    }

    const suffix = suffixes[i];
    const suffixTranslation = translate(`units.bytes.${suffix}`, { _: suffix });

    return result.toPrecision(precision) + suffixTranslation;
};

export default formatBytes;
