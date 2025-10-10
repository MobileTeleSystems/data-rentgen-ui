import { FilterLiveForm, minLength } from "react-admin";

import { Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { TextInput } from "react-admin";
import JobTypeRaFilter from "./JobRaTypeFilter";
import { LocationRaTypeFilter } from "../location";

const JobRaListFilters = () => {
    return (
        <FilterLiveForm>
            <Box display="flex" alignItems="flex-end">
                <Box component="span" mr={2} sx={{ flex: "0.2" }}>
                    <LocationRaTypeFilter />
                </Box>

                <Box component="span" mr={2} sx={{ flex: "0.2" }}>
                    <JobTypeRaFilter />
                </Box>

                <Box component="span" mr={2} sx={{ flex: "0.3 1 1" }}>
                    {/* Not using SearchInput here because it doesn't match styles with other filters */}
                    <TextInput
                        source="search_query"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon color="disabled" />
                                </InputAdornment>
                            ),
                        }}
                        validate={minLength(3)}
                        label="resources.jobs.filters.search_query.label"
                        helperText="resources.jobs.filters.search_query.helperText"
                    />
                </Box>
            </Box>
        </FilterLiveForm>
    );
};

export default JobRaListFilters;
