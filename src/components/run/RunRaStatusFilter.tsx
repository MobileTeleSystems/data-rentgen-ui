import { ReactElement } from "react";
import { SelectArrayInput, useTranslate } from "react-admin";

const RunRaStatusFilter = (): ReactElement => {
    const translate = useTranslate();

    return (
        <SelectArrayInput
            source="status"
            choices={[
                {
                    id: "STARTED",
                    name: translate("statuses.STARTED", {
                        _: "STARTED",
                    }),
                },
                {
                    id: "SUCCEEDED",
                    name: translate("statuses.SUCCEEDED", {
                        _: "SUCCEEDED",
                    }),
                },
                {
                    id: "FAILED",
                    name: translate("statuses.FAILED", {
                        _: "FAILED",
                    }),
                },
                {
                    id: "KILLED",
                    name: translate("statuses.KILLED", {
                        _: "KILLED",
                    }),
                },
                {
                    id: "UNKNOWN",
                    name: translate("statuses.UNKNOWN", {
                        _: "UNKNOWN",
                    }),
                },
            ]}
            helperText="resources.runs.filters.status.helperText"
        />
    );
};
export default RunRaStatusFilter;
