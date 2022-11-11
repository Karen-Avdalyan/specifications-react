import { OrderedList, ListItem } from "@chakra-ui/react";
import { SpecificationSerialized } from "../../entities/ui";

import "./index.css";

interface SpecifciationProps {
  specification: SpecificationSerialized;
}

export const SpecificationCard = ({ specification }: SpecifciationProps) => {
  return (
    <>
      <div style={{ border: "1px solid black", width: "300px" }}>
        <div style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>
          {specification.name}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <OrderedList>
            {Object.keys(specification).map((k) => (
              <ListItem>{k + ": " + specification[k]} </ListItem>
            ))}
          </OrderedList>
        </div>
      </div>
    </>
  );
};
