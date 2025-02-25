import { RunResponseV1 } from "@/dataProvider/types";

export const runMatchesText = (run: RunResponseV1, text: string): boolean => {
    const forSearch = text.toLowerCase();
    const runText = run.external_id ?? "";
    return runText.toLowerCase().includes(forSearch);
};
