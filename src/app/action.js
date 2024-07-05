"use server";

import { openai } from "@/utils/openai";
import { replicate } from "@/utils/replicate";

export async function generateKidsStory(_, formData) {
  const prompt = formData.get("prompt");

  // Generate story
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k",
    messages: [
      {
        role: "system",
        content: [
          {
            text: 'You are professional script, story, legends story teller for kids.\nYou have to create a short story for kids and include the moral lessons.\n\nIMPORTANT:\nTHE OUTPUT SHOULD BE VALID JSON WITH FOLLOWING KEYS:\n- title\n- story (in string array)\n- characters\n- moralLessons (in string array)\n- imagePrompt\n\nIMAGE PROMPT WOULD BE USED FOR GENERATE IMAGE AI FOR THE COVER BASED ON STORY.\nPLEASE INCLUDE COMIS STYLES, KIDS ILLUSTRATIONS OR SIMILAR THINGS. EXAMPLE:\n\n"A young boy, playing with his friends in the garden, in Kids Comis Styles, Pastel Color"',
            type: "text",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            text: prompt,
            type: "text",
          },
        ],
      },
    ],
    temperature: 0.8,
    max_tokens: 2000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  const result = JSON.parse(response.choices[0].message.content);
  console.log(result);

  // Generate Image
  const output = await replicate.run(
    "playgroundai/playground-v2-1024px-aesthetic:42fe626e41cc811eaf02c94b892774839268ce1994ea778eba97103fe1ef51b",
    {
      input: {
        prompt: result.imagePrompt,
      }
    }
  );
  console.log(output);
}
