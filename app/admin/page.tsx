"use client";

export default function Page() {
  return (
    <main className="text-white mt-10 flex flex-col w-80 mx-auto">
      <h1>create new post</h1>
      <input type="text" placeholder="insert a title" className="mt-5 p-5" />
      <textarea className="h-40 b-40 mt-5" />
      <button className="p-5 bg-slate-500 mt-4">submit</button>
    </main>
  );
}

