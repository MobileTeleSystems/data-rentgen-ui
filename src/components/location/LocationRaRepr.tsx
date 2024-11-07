import { ReactElement } from "react";
import { Stack } from "@mui/material";
import LocationIcon from "./LocationIcon";
import { useRecordContext } from "react-admin";
import { LocationResponseV1 } from "@/dataProvider/types";

const LocationRaRepr = (): ReactElement | null => {
    const location = useRecordContext<LocationResponseV1>();
    if (!location) return null;

    return (
        <Stack direction={"row"} spacing={1}>
            <LocationIcon location={location} />
            <span>
                {location.type}://{location.name}
            </span>
        </Stack>
    );
};
export default LocationRaRepr;
