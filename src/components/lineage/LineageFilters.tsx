import {
    required,
    DateTimeInput,
    useTranslate,
    SelectInput,
} from "react-admin";

import { useForm, FormProvider } from "react-hook-form";
import { Box, Button } from "@mui/material";

const weekAgo = (): Date => {
    const result = new Date();
    result.setDate(result.getDate() - 7);
    result.setHours(0, 0, 0, 0);
    return result;
};

type LineageFiltersProps = {
    onSubmit: (values: {
        since?: string;
        until?: string;
        depth?: number;
        direction?: string;
        granularity?: string;
    }) => void;
    defaultSince?: Date;
    defaultDirection?: string;
    granularities?: string[];
};

const LineageFilters = ({
    onSubmit,
    defaultSince,
    defaultDirection,
    granularities = [],
}: LineageFiltersProps) => {
    const translate = useTranslate();
    const form = useForm();

    const granularityChoises = [
        {
            id: "JOB",
            name: "lineage.filters.granularity.job",
        },
        {
            id: "RUN",
            name: "lineage.filters.granularity.run",
        },
        {
            id: "OPERATION",
            name: "lineage.filters.granularity.operation",
        },
    ];

    const defaultGranularity = granularities[0] ?? null;
    const granularitiesFiltered = granularityChoises.filter((choise) =>
        granularities.includes(choise.id),
    );

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Box display="flex" alignItems="flex-end">
                    <Box component="span" mr={2}>
                        <DateTimeInput
                            source="since"
                            validate={required()}
                            defaultValue={defaultSince ?? weekAgo()}
                            label="lineage.filters.since.label"
                            helperText="lineage.filters.since.helperText"
                        />
                    </Box>

                    <Box component="span" mr={2}>
                        <DateTimeInput
                            source="until"
                            label="lineage.filters.until.label"
                            helperText="lineage.filters.until.helperText"
                        />
                    </Box>

                    <Box component="span" mr={2}>
                        <SelectInput
                            source="depth"
                            choices={[
                                {
                                    id: 1,
                                    name: "1",
                                },
                                {
                                    id: 2,
                                    name: "2",
                                },
                                {
                                    id: 3,
                                    name: "3",
                                },
                            ]}
                            defaultValue={1}
                            validate={required()}
                            label="lineage.filters.depth.label"
                            helperText="lineage.filters.depth.helperText"
                        />
                    </Box>

                    <Box component="span" mr={2}>
                        <SelectInput
                            source="direction"
                            choices={[
                                {
                                    id: "BOTH",
                                    name: "lineage.filters.direction.both",
                                },
                                {
                                    id: "DOWNSTREAM",
                                    name: "lineage.filters.direction.downstream",
                                },
                                {
                                    id: "UPSTREAM",
                                    name: "lineage.filters.direction.upstream",
                                },
                            ]}
                            defaultValue={defaultDirection ?? "BOTH"}
                            validate={required()}
                            label="lineage.filters.direction.label"
                            helperText="lineage.filters.direction.helperText"
                        />
                    </Box>

                    {granularitiesFiltered.length > 0 && (
                        <Box component="span" mr={2}>
                            <SelectInput
                                source="granularity"
                                choices={granularitiesFiltered}
                                defaultValue={defaultGranularity}
                                validate={required()}
                                label="lineage.filters.granularity.label"
                                helperText="lineage.filters.granularity.helperText"
                            />
                        </Box>
                    )}

                    <Box component="span" mr={2} mb={4}>
                        <Button
                            variant="outlined"
                            color="primary"
                            type="submit"
                        >
                            {translate("lineage.build_button")}
                        </Button>
                    </Box>
                </Box>
            </form>
        </FormProvider>
    );
};

export default LineageFilters;
