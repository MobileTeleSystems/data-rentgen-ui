import { ReactNode } from "react";
import { useTranslate } from "react-admin";

import { getTimeInterval } from "@/utils/datetime";

type DurationFieldSet = {
    created_at: string;
    started_at: string | null;
    ended_at: string | null;
};

const DurationField = ({
    fieldSet,
}: {
    fieldSet: DurationFieldSet;
}): ReactNode => {
    const translate = useTranslate();

    const start_time = fieldSet.started_at || fieldSet.created_at;
    const end_time = fieldSet.ended_at;
    if (!start_time || !end_time) {
        return null;
    }

    const interval = getTimeInterval(new Date(start_time), new Date(end_time));
    if (!interval) return null;

    const parts: string[] = [];
    if (interval.hours > 0) {
        parts.push(interval.hours + translate("units.time.hours", { _: "h" }));
    }
    if (interval.minutes > 0) {
        parts.push(
            interval.minutes + translate("units.time.minutes", { _: "m" }),
        );
    }
    if (interval.seconds > 0) {
        parts.push(
            interval.seconds + translate("units.time.seconds", { _: "s" }),
        );
    }

    if (parts.length === 0) {
        return "0" + translate("units.time.seconds", { _: "s" });
    }
    return parts.join(" ");
};

export default DurationField;
