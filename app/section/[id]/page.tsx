// "use client";

// import axios from "axios";
// import React, { use, useEffect, useState } from "react";
// import BASE_URL from "@/lib/config";
// import { UserProps } from "@/types/user";
// import { SectionProps } from "@/types/section";
// import NoteItem from "@/components/NoteItem";
// import { NoteProps } from "@/types/note";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

// const SectionDetail = ({ params }: { params: Promise<{ id: string }> }) => {
//   const router = useRouter();
//   const [user, setUser] = useState<UserProps>();
//   const [section, setSection] = useState<SectionProps>({
//     id: 0,
//     title: "",
//     subtitle: "",
//     userId: 0,
//   });
//   const [notes, setNotes] = useState<NoteProps[]>([]);
//   const [isLoading, setLoading] = useState(true);
//   const { id } = use(params);
//   const [message, setMessage] = useState("");

//   const fetchNotes = async () => {
//     axios
//       .get(`${BASE_URL}/section/${id}/note`, {
//         withCredentials: true,
//       })
//       .then((res) => setNotes(res.data))
//       .catch((e) => console.log(e));
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const [userRes, sectionsRes] = await Promise.all([
//           axios.get(`${BASE_URL}/user`, { withCredentials: true }),
//           axios.get(`${BASE_URL}/section/${id}`, {
//             withCredentials: true,
//           }),
//         ]);

//         axios
//           .get(`${BASE_URL}/section/${id}/note`, {
//             withCredentials: true,
//           })
//           .then((res) => setNotes(res.data))
//           .catch((e) => console.log(e));

//         setUser(userRes.data);
//         setSection(sectionsRes.data);
//         if (notes.length == 0) {
//           setMessage("No notes");
//         } else {
//           setMessage("");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [id, notes.length]);

//   return (
//     <div className="ml-[20px] mr-[20px] sm:ml-[30px] sm:mr-[30px] md:ml-[100px] md:mr-[100px] lg:ml-[200px] lg:mr-[200px] xl:ml-[300px] xl:mr-[300px]">
//       <div className="space-y-3">
//         <h1 className="heading">{section.title}</h1>
//         <h2 className="text-gray-500">{section.subtitle}</h2>
//       </div>

//       <div className="mt-3">
//         <div className="flex justify-between">
//           <h1>Notes</h1>
//           <Button onClick={() => router.push(`/section/${section.id}/add`)}>
//             Add Note
//           </Button>
//         </div>

//         {notes.map((note, id: number) => (
//           <NoteItem
//             key={id}
//             note={note}
//             id={section.id}
//             refreshNote={fetchNotes}
//           />
//         ))}
//       </div>
//       {message}
//     </div>
//   );
// };

// export default SectionDetail;

// SectionDetail.tsx
"use client";

import axios from "axios";
import React, { useEffect, useState, use } from "react";
import BASE_URL from "@/lib/config";
import { UserProps } from "@/types/user";
import { SectionProps } from "@/types/section";
import NoteItem from "@/components/NoteItem";
import { NoteProps } from "@/types/note";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Searchbox from "@/components/Searchbox"; // Import Searchbox component

const SectionDetail = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const [user, setUser] = useState<UserProps>();
  const [section, setSection] = useState<SectionProps>({
    id: 0,
    title: "",
    subtitle: "",
    userId: 0,
  });
  const [notes, setNotes] = useState<NoteProps[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<NoteProps[]>([]); // Filtered notes state
  const [isLoading, setLoading] = useState(true);
  const { id } = use(params);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchNotes = async () => {
    axios
      .get(`${BASE_URL}/section/${id}/note`, {
        withCredentials: true,
      })
      .then((res) => setNotes(res.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [userRes, sectionsRes] = await Promise.all([
          axios.get(`${BASE_URL}/user`, { withCredentials: true }),
          axios.get(`${BASE_URL}/section/${id}`, {
            withCredentials: true,
          }),
        ]);

        axios
          .get(`${BASE_URL}/section/${id}/note`, {
            withCredentials: true,
          })
          .then((res) => setNotes(res.data))
          .catch((e) => console.log(e));

        setUser(userRes.data);
        setSection(sectionsRes.data);
        if (notes.length === 0) {
          setMessage("No notes");
        } else {
          setMessage("");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, notes.length]);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredNotes(notes);
    } else {
      setFilteredNotes(
        notes.filter(
          (note) =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, notes]);

  return (
    <div className="ml-[20px] mr-[20px] sm:ml-[30px] sm:mr-[30px] md:ml-[100px] md:mr-[100px] lg:ml-[200px] lg:mr-[200px] xl:ml-[300px] xl:mr-[300px]">
      <div className="space-y-3">
        <h1 className="heading">{section.title}</h1>
        <h2 className="text-gray-500">{section.subtitle}</h2>
      </div>

      <div className="mt-3">
        <div className="flex justify-between">
          <h1>Notes</h1>
          <Button onClick={() => router.push(`/section/${section.id}/add`)}>
            Add Note
          </Button>
        </div>

        <div className="mt-4">
          <Searchbox onSearch={setSearchQuery} />
        </div>

        {filteredNotes.length === 0 && <p>No notes found</p>}

        {filteredNotes.map((note, id: number) => (
          <NoteItem
            key={id}
            note={note}
            id={section.id}
            refreshNote={fetchNotes}
          />
        ))}
      </div>
      {message}
    </div>
  );
};

export default SectionDetail;
