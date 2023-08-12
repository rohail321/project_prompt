"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Profile from "@components/Profile";

const Myprofile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPost(data);
    };
    if (session?.user.id) fetchPost();
  }, []);
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${posts._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirm = confirm("Are you sure?");
    if (hasConfirm) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "Delete",
        });
        const filterPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filterPosts);
      } catch (error) {}
    }
  };
  return (
    <Profile
      name='My profile'
      desc='Welcome to your personalized profile page'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default Myprofile;
