export type TimeInterval = {
    hours: number;
    minutes: number;
    seconds: number;
};

// Get time interval between two dates
export const getTimeInterval = (
    startTime: Date,
    endTime: Date,
): TimeInterval => {
    // @ts-expect-error Math.abs perfecly works with Date input
    const differenceInSeconds = Math.abs(endTime - startTime) / 1000;

    const hours = Math.floor(differenceInSeconds / 60 / 60);
    const minutes = Math.floor(differenceInSeconds / 60) - hours * 60;
    const seconds =
        Math.floor(differenceInSeconds) - hours * 60 * 60 - minutes * 60;

    return { hours, minutes, seconds };
};

export const formatDate = (date: Date): string => {
    const dateFormatOptions = {
        dateStyle: "short",
        timeStyle: "long",
    } as Intl.DateTimeFormatOptions;

    return date.toLocaleString(undefined, dateFormatOptions);
};
