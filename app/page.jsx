import React from "react";
import Feed from "@components/Feed";
function Home() {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & Share
        <br className='max-md:hidden' />
        <span className='orange_gradient'>AI-powerd Prompts</span>
      </h1>
      <p className='desc text-center'>
        Promptopia is an an open-source AI prompting tool for modern world to
        discover, create and share creative prompt
      </p>
      <Feed />
    </section>
  );
}

export default Home;
