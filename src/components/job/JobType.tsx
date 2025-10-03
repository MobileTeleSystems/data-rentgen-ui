import { useTranslate } from "react-admin";

export const getDefaultJobType = (jobType: string): string => {
    return jobType
        .split("_")
        .map(
            (s) =>
                s.charAt(0).toLocaleUpperCase() +
                s.substring(1).toLocaleLowerCase(),
        )
        .join(" ");
};

const JobType = ({ jobType }: { jobType: string }): string => {
    const translate = useTranslate();

    return translate(`resources.jobs.types.${jobType.toLocaleLowerCase()}`, {
        _: getDefaultJobType(jobType),
    });
};

export default JobType;
