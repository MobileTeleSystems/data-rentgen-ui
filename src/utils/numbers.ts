const step = 1000;
const suffixes = ["", "K", "M", "B", "T"];

type ApproxNumber = {
    value: string;
    suffix: string;
};

export const getApproxNumber = (value: number, precision = 3): ApproxNumber => {
    if (value < step)
        return {
            value: value.toString(),
            suffix: "",
        };

    const i = Math.floor(Math.log(value) / Math.log(step));
    const suffix = suffixes[i];
    const roundedValue = value / Math.pow(step, i);
    return {
        value: roundedValue.toPrecision(precision),
        suffix,
    };
};
