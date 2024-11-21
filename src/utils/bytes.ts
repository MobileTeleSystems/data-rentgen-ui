import { useTranslate } from "react-admin";

const step = 1024;
const suffixes = ["Bytes", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb"];

const formatBytes = (bytes: number, decimals = 2) => {
    const translate = useTranslate();
    const i = Math.floor(Math.log(bytes) / Math.log(step));
    const suffix = suffixes[i];
    const suffixTranslation = translate(`units.bytes.${suffix}`, { _: suffix });
    const roundedValue = bytes / Math.pow(step, i);
    const formattedValue =
        roundedValue > 0 ? roundedValue.toFixed(decimals) : "0";
    return formattedValue + suffixTranslation;
};

export default formatBytes;
