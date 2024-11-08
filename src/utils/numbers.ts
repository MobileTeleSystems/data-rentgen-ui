import { useTranslate } from "react-admin";

const step = 1000;
const suffixes = ["K", "M", "B", "T"];

const formatNumberApprox = (value: number, decimals = 2): string => {
    const translate = useTranslate();
    if (value < step) return value.toString();

    const i = Math.floor(Math.log(value) / Math.log(step));
    const suffix = translate(`units.numbers.${suffixes[i]}`, {
        _: suffixes[i],
    });
    const roundedValue = value / Math.pow(step, i);
    return roundedValue.toFixed(decimals) + suffix;
};

export default formatNumberApprox;
