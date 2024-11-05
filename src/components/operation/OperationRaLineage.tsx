import { useRecordContext } from "react-admin";

import { LineageView } from "@/components/lineage";
import { ReactFlowProvider } from "@xyflow/react";

const OperationRaLineage = () => {
    const record = useRecordContext();
    if (!record) {
        return null;
    }
    return (
        <ReactFlowProvider>
            <LineageView
                resource="operations"
                recordId={record.id}
                defaultSince={record.created_at as Date}
            />
        </ReactFlowProvider>
    );
};

export default OperationRaLineage;
