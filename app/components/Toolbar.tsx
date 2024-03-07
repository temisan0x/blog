// "use client";
import { Editor } from "@tiptap/react";
import { Bold, Strikethrough, Italic, List, ListOrdered, Heading } from "lucide-react";

type Props = {
  editor: Editor | null;
};

export function Toolbar({ editor }: Props) {
  if (!editor) {
    return null;
  }

  return ( 
    <div className="border border-input bg-transparent rounded-br-lg">
      {/* Example toolbar with icons */}
      <button onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold size={18} />
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic size={18} />
      </button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough size={18} />
      </button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <List size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered size={18} />
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <Heading size={18} />
      </button>
    </div>
  );
}
