"use client";

import { SkeletonCard } from "@/components/SkeletonCard";
import UserInfo from "@/components/UserInfo";
import BASE_URL from "@/lib/config";
import { SectionProps } from "@/types/section";
import { UserProps } from "@/types/user";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RecentSections from "@/components/RecentSections";
import { ItemData } from "@/components/chartData/ItemData";

const Profile = () => {
  const [user, setUser] = useState<UserProps>({
    id: 0,
    sub: 0,
    avatar_url: "",
    name: "",
  });
  const [sections, setSections] = useState<SectionProps[]>([]);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [userRes, sectionsRes] = await Promise.all([
          axios.get(`${BASE_URL}/user`, { withCredentials: true }),
          axios.get(`${BASE_URL}/section`, {
            withCredentials: true,
          }),
        ]);

        setUser(userRes.data);
        setSections(sectionsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchSections = async () => {
    axios
      .get(`${BASE_URL}/section`, {
        withCredentials: true,
      })
      .then((res) => setSections(res.data))
      .catch((e) => console.log(e));
  };

  return (
    <div className="ml-[20px] mr-[20px] sm:ml-[30px] sm:mr-[30px] md:ml-[100px] md:mr-[100px] lg:ml-[200px] lg:mr-[200px] xl:ml-[300px] xl:mr-[300px]">
      <h1 className="heading">Profile</h1>
      {isLoading ? <SkeletonCard /> : <UserInfo user={user!} />}
      <div>
        <h1 className="heading">Recent Sections</h1>
        <RecentSections
          fetchSections={fetchSections}
          sections={sections}
          user={user}
        />
      </div>

      <div>
        <h1 className="heading">My Items</h1>
        <ItemData
          cardsCount={20}
          decksCount={8}
          sectionCount={3}
          notesCount={4}
        />
      </div>
    </div>
  );
};

export default Profile;
