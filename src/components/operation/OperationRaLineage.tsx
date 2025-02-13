import { useRecordContext } from "react-admin";

import { LineageView } from "@/components/lineage";
import { ReactFlowProvider } from "@xyflow/react";
import { OperationDetailedResponseV1 } from "@/dataProvider/types";

const OperationRaLineage = () => {
    const record = useRecordContext<OperationDetailedResponseV1>();
    if (!record) {
        return null;
    }
    return (
        <ReactFlowProvider>
            <LineageView
                resource="operations"
                recordId={record.id}
                defaultSince={new Date(record.data.created_at)}
            />
        </ReactFlowProvider>
    );
};

export default OperationRaLineage;
