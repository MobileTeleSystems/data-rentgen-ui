import { useTranslate } from "react-admin";
import { LocationResponseV1 } from "@/dataProvider/types";

export const getDefaultLocationType = (jobType: string): string => {
    return jobType
        .split("_")
        .map(
            (s) =>
                s.charAt(0).toLocaleUpperCase() +
                s.substring(1).toLocaleLowerCase(),
        )
        .join(" ");
};

const LocationType = ({
    location,
}: {
    location: LocationResponseV1;
}): string => {
    const translate = useTranslate();

    return translate(`resources.locations.types.${location.type}`, {
        _: getDefaultLocationType(location.type),
    });
};

export default LocationType;
