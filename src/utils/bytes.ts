import { useTranslate } from "react-admin";

const step = 1024;
const suffixes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

const formatBytes = (bytes: number, decimals = 2) => {
    const translate = useTranslate();
    const i = Math.floor(Math.log(bytes) / Math.log(step));
    const suffix = translate(`units.bytes.${suffixes[i]}`, { _: suffixes[i] });
    const roundedValue = bytes / Math.pow(step, i);
    const formattedValue =
        roundedValue > 0 ? roundedValue.toFixed(decimals) : "0";
    return formattedValue + suffix;
};

export default formatBytes;
