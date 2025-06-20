import { ReactElement } from "react";
import { IconByName } from "@/components/icons";
import { LocationResponseV1 } from "@/dataProvider/types";

const LocationIcon = ({
    location,
}: {
    location: LocationResponseV1;
}): ReactElement => {
    return <IconByName name={location.type} />;
};

export default LocationIcon;
