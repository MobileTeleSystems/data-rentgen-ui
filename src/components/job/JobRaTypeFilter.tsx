import { JobTypesResponseV1 } from "@/dataProvider/types";
import { ReactElement, useEffect, useState } from "react";
import { SelectArrayInput, useDataProvider, useTranslate } from "react-admin";
import { getDefaultJobType } from "./JobType";

const JobRaTypeFilter = (): ReactElement => {
    const dataProvider = useDataProvider();
    const translate = useTranslate();

    const [jobTypes, setJobTypes] = useState<string[]>([]);

    useEffect(() => {
        dataProvider.getJobTypes({}).then((response: JobTypesResponseV1) => {
            setJobTypes(response.job_types);
        });
    }, [dataProvider]);

    const jobTypesRepr = jobTypes.map((jobType) => {
        return {
            id: jobType,
            name: translate(
                `resources.jobs.types.${jobType.toLocaleLowerCase()}`,
                { _: getDefaultJobType(jobType) },
            ),
        };
    });

    return (
        <SelectArrayInput
            source="job_type"
            choices={jobTypesRepr}
            label="resources.jobs.filters.job_type.label"
            helperText="resources.jobs.filters.job_type.helperText"
        />
    );
};

export default JobRaTypeFilter;
