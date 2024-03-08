"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import { Toolbar } from "./Toolbar";

interface HandleChangeProps {
  content: string;
  onChange: (richText: string) => void;
}

const Tiptap = ({ content, onChange }: HandleChangeProps) => {
  const editor = useEditor({
    extensions: [StarterKit.configure({})],
    content: content,
    editorProps: {
      attributes: {
        class: "rounded-md border min-h-[150px] border-input bg-inherit", // Remove "disabled: cursor-not-allowed"
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      console.log(editor.getHTML());
    },
  });
  return (
    <div className="flex flex-col justify-stretch min-h-[100px]">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
