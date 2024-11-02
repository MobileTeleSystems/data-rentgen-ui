import { ReactElement } from "react";
import { LocationResponseV1 } from "@/dataProvider/types";
import { Stack, StackProps } from "@mui/material";
import LocationIcon from "./LocationIcon";
import LocationType from "./LocationType";

const LocationIconWithType = ({
    location,
    ...props
}: {
    location: LocationResponseV1;
} & StackProps): ReactElement | null => {
    return (
        <Stack direction={"column"} {...props}>
            <LocationIcon location={location} />
            <LocationType location={location} />
        </Stack>
    );
};
export default LocationIconWithType;
