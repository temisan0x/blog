"use client";


import Giscus from "@giscus/react";

export default function Comments() {

  return (
    <Giscus
      id="comments"
      repo="temisan0x/blog"
      repoId="R_kgDOLFjFmQ"
      category="General"
      categoryId="DIC_kwDOLFjFmc4ChN4b"
      mapping="title"
      term="Welcome to @giscus/react component!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme="transparent_dark"
      lang="en"
      loading="lazy"
    />
  );
}