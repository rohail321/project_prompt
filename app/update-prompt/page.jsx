"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
const EditPrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const router = useRouter();
  const searchParams = useSearchParams();
  const prompId = searchParams.get("id");

  useEffect(() => {
    const getPrompDetails = async () => {
      const res = await fetch(`/api/prompt/${prompId}`);
      const data = await res.json();
      setPost({ prompt: data.prompt, tag: data.tag });
    };

    if (prompId) getPrompDetails();
  }, [prompId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!prompId) return alert("No prompt Id found");
    try {
      const res = await fetch(`/api/prompt/new${prompId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
