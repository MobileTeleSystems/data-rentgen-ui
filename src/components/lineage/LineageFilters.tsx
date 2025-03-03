import {
    required,
    DateTimeInput,
    useTranslate,
    SelectInput,
    useListParams,
    useResourceContext,
    BooleanInput,
} from "react-admin";

import { useForm, FormProvider } from "react-hook-form";
import { Box, Button } from "@mui/material";
import { useEffect } from "react";

const weekAgo = (): Date => {
    const result = new Date();
    result.setDate(result.getDate() - 7);
    result.setHours(0, 0, 0, 0);
    return result;
};

type LineageFilterValues = {
    since?: string;
    until?: string;
    depth?: number;
    direction?: string;
    granularity?: string;
    include_column_lineage?: boolean;
};

type LineageFiltersProps = {
    onSubmit: (values: LineageFilterValues) => void;
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
    const resource = useResourceContext() as string;
    const defaultGranularity = granularities[0] ?? null;

    const [listParams, listParamsActions] = useListParams({
        resource,
        filterDefaultValues: {},
        storeKey: false,
    });

    const translate = useTranslate();
    const form = useForm({ defaultValues: listParams.filterValues });

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

    const granularitiesFiltered = granularityChoises.filter((choice) =>
        granularities.includes(choice.id),
    );

    const submit = form.handleSubmit((formValues: LineageFilterValues) => {
        listParamsActions.setFilters(formValues);
        onSubmit(formValues);
    });

    // draw lineage just after opening the page
    useEffect(() => {
        submit();
    }, []);

    return (
        <FormProvider {...form}>
            <form onSubmit={submit}>
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
                    <Box component="span" mr={2}>
                        <BooleanInput
                            source="include_column_lineage"
                            defaultValue={false}
                            label="lineage.filters.include_column_lineage.label"
                            helperText="lineage.filters.include_column_lineage.helperText"
                        />
                    </Box>

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
