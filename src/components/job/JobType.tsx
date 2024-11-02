import { useTranslate } from "react-admin";
import { JobResponseV1 } from "@/dataProvider/types";

const JobType = ({ job }: { job: JobResponseV1 }): string => {
    const translate = useTranslate();

    return translate(`resources.jobs.types.${job.type.toLocaleLowerCase()}`, {
        _: job.type,
    });
};

export default JobType;
