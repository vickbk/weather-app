import { getGMTTimezone } from "@/lib/date/get-gmt-timezone";
import getUnitBasedParams from "@/lib/open-meteo/get-unit-based-params";
import { Coordinates } from "@/lib/types/places-types";
import { UnitsType } from "@/lib/types/units-types";

export default function SearchAdditionalData({
  coordinates,
  units,
}: {
  coordinates?: Coordinates | null;
  units: UnitsType;
}) {
  const combined = {
    ...(coordinates ?? {}),
    ...getUnitBasedParams(units),
    timezone: getGMTTimezone(),
  };
  return (
    <>
      {combined &&
        Object.entries(combined).map(
          ([key, value]) =>
            value !== undefined && (
              <input key={key} type="hidden" name={key} value={value} />
            )
        )}
    </>
  );
}
