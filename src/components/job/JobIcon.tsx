import { ReactElement } from "react";
import { IconByName } from "@/components/icons";
import { JobResponseV1 } from "@/dataProvider/types";

const JobIcon = ({ job }: { job: JobResponseV1 }): ReactElement => {
    return <IconByName name={job.type} />;
};

export default JobIcon;
