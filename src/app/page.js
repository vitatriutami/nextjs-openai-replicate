"use client";

import { generateKidsStory } from "./action";
import { useActionState } from "react";

export default function Home() {
  const [state, formAction, pending] = useActionState(generateKidsStory, null);

  return (
    <main className="max-w-2xl m-auto my-12 space-y-4">
      <h1 className="text-3xl">Kids Story Generator</h1>
      <form action={formAction} className="space-x-2">
        <input name="prompt" placeholder="Enter your prompt, ..." className="border-2 border-emerald-300 p-2 rounded-lg gap-4" />
        <button disabled={pending} className="bg-emerald-300 p-2 rounded-lg" >Generate Story</button>
      </form>
      {state?.success && (
        <div>
          <img alt={state.data.story.title} src={state.data.image} width={800} height={600} className="rounded-xl" />
          <h3>{state.data.story.title}</h3>
          <div>
            {state.data.story.story.map((item, index) => {
              return <div key={index}>{item}</div>;
            })}
          </div>
          <div>
            {state.data.story.moralLessons.map((item, index) => {
              return <div key={index}>{item}</div>;
            })}
          </div>
        </div>
      )}
    </main>
  );
}
