import { ReactElement } from "react";
import { IconByName } from "@/components/icons";

const JobTypeIcon = ({ jobType }: { jobType: string }): ReactElement => {
    return <IconByName name={jobType} />;
};

export default JobTypeIcon;
