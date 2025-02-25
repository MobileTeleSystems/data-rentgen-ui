import { LineageView } from "@/components/lineage";
import { ReactFlowProvider } from "@xyflow/react";
import { useRecordContext } from "react-admin";

const DatasetRaLineage = () => {
    const record = useRecordContext();
    if (!record) {
        return null;
    }
    return (
        <ReactFlowProvider>
            <LineageView
                resource="datasets"
                recordId={record.id}
                granularities={["JOB", "RUN"]}
            />
        </ReactFlowProvider>
    );
};

export default DatasetRaLineage;
