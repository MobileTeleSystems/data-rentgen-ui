// Get time interval between two dates
const getTimeIntervalText = (startTime: Date, endTime: Date): string => {
    // @ts-expect-error Math.abs perfecly works with Date input
    const differenceInSeconds = Math.abs(endTime - startTime) / 1000;

    const hours = Math.floor(differenceInSeconds / 60 / 60);
    const minutes = Math.floor(differenceInSeconds / 60) - hours * 60;
    const seconds =
        Math.floor(differenceInSeconds) - hours * 60 * 60 - minutes * 60;

    if (hours) return `${hours}h ${minutes}m ${seconds}s`;
    if (minutes) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
};

// Get duration for specific set of fields
export const getDurationText = ({
    created_at,
    started_at,
    ended_at,
}: {
    created_at: string;
    started_at: string | null;
    ended_at: string | null;
}): string | null => {
    const start_time = started_at || created_at;
    const end_time = ended_at;

    if (!start_time || !end_time) {
        return null;
    }

    return getTimeIntervalText(new Date(start_time), new Date(end_time));
};

export const formatDate = (date: Date): string => {
    const dateFormatOptions = {
        dateStyle: "short",
        timeStyle: "long",
    } as Intl.DateTimeFormatOptions;

    return date.toLocaleString(undefined, dateFormatOptions);
};
