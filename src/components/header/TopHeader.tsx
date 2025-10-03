import icon from "@images/logo.svg";
import HeaderDropDown from "./HeaderDropDown";
import UnitSelector from "./UnitSelector";
import Image from "next/image";
import { UnitHandlersType, UnitsType } from "@/lib/types/units-types";
import { useState } from "react";
import Link from "next/link";

export default function TopHeader({
  unitHandlers,
  units,
}: {
  unitHandlers?: UnitHandlersType;
  units?: UnitsType;
  type?: "compare" | "default";
}) {
  const [dropdownCloser, setDropdownCloser] = useState<(() => void) | null>(
    null
  );
  return (
    <section className="header__top flex space-between center">
      <Link href="/">
        <Image
          src={icon}
          height={30}
          alt="icon image"
          className="header__top-image"
        />
      </Link>

      {!!units && !!unitHandlers ? (
        <UnitSelector
          content={
            <HeaderDropDown
              units={units}
              unitHandlers={unitHandlers}
              closer={dropdownCloser!}
            />
          }
          setCloser={setDropdownCloser!}
        />
      ) : (
        <div></div>
      )}
    </section>
  );
}
