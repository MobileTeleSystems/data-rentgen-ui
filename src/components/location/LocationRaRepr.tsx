import { ReactElement } from "react";
import { Stack } from "@mui/material";
import LocationIcon from "./LocationIcon";
import { useRecordContext } from "react-admin";
import { LocationDetailedResponseV1 } from "@/dataProvider/types";

const LocationRaRepr = (): ReactElement | null => {
    const location = useRecordContext<LocationDetailedResponseV1>();
    if (!location) return null;

    return (
        <Stack direction={"row"} spacing={1}>
            <LocationIcon location={location.data} />
            <span>
                {location.data.type}://{location.data.name}
            </span>
        </Stack>
    );
};
export default LocationRaRepr;
