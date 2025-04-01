const step = 1024;
const suffixes = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
];

type ApproxBytes = {
    value: string;
    suffix: string;
};

const getApproxBytes = (bytes: number, precision = 3): ApproxBytes => {
    let i = Math.floor(Math.log(bytes) / Math.log(step));
    let result = bytes / Math.pow(step, i);

    if (result >= 1000 && result < step) {
        // Avoid results like "1.01e+3MB"
        i += 1;
        result = 1;
        precision = 1;
    }

    const suffix = suffixes[i];

    return {
        value: result.toPrecision(precision),
        suffix,
    };
};

export { getApproxBytes };
