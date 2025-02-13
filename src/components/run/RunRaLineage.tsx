import { useRecordContext } from "react-admin";

import { LineageView } from "@/components/lineage";
import { ReactFlowProvider } from "@xyflow/react";
import { RunDetailedResponseV1 } from "@/dataProvider/types";

const RunLineage = () => {
    const record = useRecordContext<RunDetailedResponseV1>();
    if (!record) {
        return null;
    }
    return (
        <ReactFlowProvider>
            <LineageView
                resource="runs"
                recordId={record.id}
                defaultSince={new Date(record.data.created_at)}
                granularities={["RUN", "OPERATION"]}
            />
        </ReactFlowProvider>
    );
};

export default RunLineage;
