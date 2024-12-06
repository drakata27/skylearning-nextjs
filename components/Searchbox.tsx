import React from "react";
import { Input } from "./ui/input";

interface SearchboxProps {
  onSearch: (query: string) => void;
}

const Searchbox: React.FC<SearchboxProps> = ({ onSearch }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value); // Pass the search query to parent component
  };

  return (
    <div className="relative">
      <Input
        placeholder="Search..."
        onChange={handleChange}
        className="pr-10 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>
  );
};

export default Searchbox;
