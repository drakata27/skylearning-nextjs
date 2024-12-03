import NoteForm from "@/components/NoteForm";
import React, { use } from "react";

const NoteEdit = ({
  params,
}: {
  params: Promise<{ id: string; noteid: string }>;
}) => {
  const { id, noteid } = use(params);
  return (
    <div className="ml-[20px] mr-[20px] sm:ml-[30px] sm:mr-[30px] md:ml-[100px] md:mr-[100px] lg:ml-[200px] lg:mr-[200px] xl:ml-[300px] xl:mr-[300px]">
      <h1>Edit</h1>
      <NoteForm isEditing={true} id={id} noteid={noteid} />
    </div>
  );
};

export default NoteEdit;
