import { ReactElement } from "react";
import {
    ApacheAirflowIcon,
    ApacheSparkIcon,
    ApacheFlinkIcon,
    DBTIcon,
} from "@/components/icons";
import { JobResponseV1 } from "@/dataProvider/types";
import { QuestionMark } from "@mui/icons-material";

const JobIcon = ({ job }: { job: JobResponseV1 }): ReactElement => {
    if (job.type.startsWith("SPARK")) {
        return <ApacheSparkIcon />;
    }
    if (job.type.startsWith("AIRFLOW")) {
        return <ApacheAirflowIcon />;
    }
    if (job.type.startsWith("FLINK")) {
        return <ApacheFlinkIcon />;
    }
    if (job.type.startsWith("DBT")) {
        return <DBTIcon />;
    }
    return <QuestionMark />;
};

export default JobIcon;
