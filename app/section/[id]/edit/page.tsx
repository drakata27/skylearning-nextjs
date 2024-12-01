import SectionForm from "@/components/SectionForm";
import React, { use } from "react";

const SectionEdit = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  return (
    <div className="ml-[20px] mr-[20px] sm:ml-[30px] sm:mr-[30px] md:ml-[100px] md:mr-[100px] lg:ml-[200px] lg:mr-[200px] xl:ml-[300px] xl:mr-[300px]">
      <h1 className="heading">Edit</h1>
      <SectionForm id={id} isEditing={true} />
    </div>
  );
};

export default SectionEdit;
