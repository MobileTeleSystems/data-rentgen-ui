import { useTranslate } from "react-admin";

const step = 1000;
const suffixes = ["K", "M", "B", "T"];

const formatNumberApprox = (value: number, decimals = 2): string => {
    const translate = useTranslate();
    if (value < step) return value.toString();

    const i = Math.floor(Math.log(value) / Math.log(step));
    const suffix = suffixes[i - 1];
    const suffixTranslation = translate(`units.numbers.${suffix}`, {
        _: suffix,
    });
    const roundedValue = value / Math.pow(step, i);
    return roundedValue.toFixed(decimals) + suffixTranslation;
};

export default formatNumberApprox;
