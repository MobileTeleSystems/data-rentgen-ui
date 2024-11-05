import { useRecordContext } from "react-admin";

import { LineageView } from "@/components/lineage";
import { ReactFlowProvider } from "@xyflow/react";

const RunLineage = () => {
    const record = useRecordContext();
    if (!record) {
        return null;
    }
    return (
        <ReactFlowProvider>
            <LineageView
                resource="runs"
                recordId={record.id}
                defaultSince={record.created_at as Date}
                granularities={["RUN", "OPERATION"]}
            />
        </ReactFlowProvider>
    );
};

export default RunLineage;
