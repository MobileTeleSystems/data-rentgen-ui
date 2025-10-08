import { LocationTypesResponseV1 } from "@/dataProvider/types";
import { ReactElement, useEffect, useState } from "react";
import { SelectArrayInput, useDataProvider, useTranslate } from "react-admin";
import { getDefaultLocationType } from "./LocationType";

const LocationRaTypeFilter = (): ReactElement => {
    const dataProvider = useDataProvider();
    const translate = useTranslate();

    const [locationTypes, setLocationTypes] = useState<string[]>([]);

    useEffect(() => {
        dataProvider
            .getLocationTypes({})
            .then((response: LocationTypesResponseV1) => {
                setLocationTypes(response.location_types);
            });
    }, [dataProvider]);

    const locationTypesRepr = locationTypes.map((locationType) => {
        return {
            id: locationType,
            name: translate(
                `resources.locations.types.${locationType.toLocaleLowerCase()}`,
                { _: getDefaultLocationType(locationType) },
            ),
        };
    });

    return (
        <SelectArrayInput
            source="location_type"
            choices={locationTypesRepr}
            label="resources.locations.filters.location_type.label"
            helperText="resources.locations.filters.location_type.helperText"
        />
    );
};

export default LocationRaTypeFilter;
