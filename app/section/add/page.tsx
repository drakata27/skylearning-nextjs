import SectionForm from "@/components/SectionForm";
import React from "react";

const SectionAdd = () => {
  return (
    <div className="ml-[20px] mr-[20px] sm:ml-[30px] sm:mr-[30px] md:ml-[100px] md:mr-[100px] lg:ml-[200px] lg:mr-[200px] xl:ml-[300px] xl:mr-[300px]">
      <h1 className="heading">Add Section</h1>

      <SectionForm />
    </div>
  );
};

export default SectionAdd;
