import { useTranslate } from "react-admin";
import { LocationResponseV1 } from "@/dataProvider/types";

const LocationType = ({
    location,
}: {
    location: LocationResponseV1;
}): string => {
    const translate = useTranslate();

    return translate(`resources.locations.types.${location.type}`, {
        _: location.type,
    });
};

export default LocationType;
