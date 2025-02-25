import { OperationResponseV1 } from "@/dataProvider/types";

export const operationMatchesText = (
    operation: OperationResponseV1,
    text: string,
): boolean => {
    const forSearch = text.toLowerCase();
    const operationText = `${operation.name} ${operation.group} ${operation.description ?? ""}`;
    return operationText.toLowerCase().includes(forSearch);
};
