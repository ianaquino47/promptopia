"use client";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState();

  const getFilteredPosts = (searchText) => {
    const regex = new RegExp(searchText, "i");

    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    clearTimeout(searchTimeout);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = getFilteredPosts(e.target.value);
        setFilteredPosts(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);

    const searchResult = getFilteredPosts(tag);
    setFilteredPosts(searchResult);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={searchText ? filteredPosts : posts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
