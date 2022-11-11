import { useMemo } from "react";
import { SpecificationUIService } from "../../ui-service/specification";
import { SpecificationCard } from "../../components/specification-card";
import { SpecificationSerialized } from "../../entities/ui";
import "./index.css";

const uiService = new SpecificationUIService();

export const Specifications = () => {
  const specifications = useMemo(() => uiService.getSpecifications(), []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {specifications && specifications.length > 0 ?
          specifications.map((spec: SpecificationSerialized) => (
            <SpecificationCard specification={spec} />
          )) : 
          <div>There are no Specifications</div>}
      </div>
    </>
  );
};
