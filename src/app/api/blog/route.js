import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  const { data } = await request.json();
  console.log(data);
  const topic = data.topic || null;
  const tone = data.tone || "Informative";
  const wordLimit = data.wordLimit || 500;
  const style = "Blog Post";

  if (!topic) {
    return new Response(JSON.stringify({ error: "Prompt is required." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    const API_KEY = process.env.GEMINI_API_KEY;
    const API_URL = process.env.GEMINI_API_URL + "?key=" + API_KEY;

    const prompt = `Write a high-quality blog on the topic: "${topic}".
          - **Tone:** ${tone}
          - **Word Limit:** ${wordLimit} words.
          - **Style Preference:** ${style}
          - **Audience:** General readers
          - **SEO Keywords:** Blog, ${topic}
          - **Content Guidelines:** Use headings, bullet points, and short paragraphs to make the content easy to read.
          - **Content Structure:** Introduction, body, and conclusion.
          - **Content Format:** Use markdown for formatting.
          - **Content Quality:** Ensure the content is original, engaging, and informative.
          - **Content Style:** Use a friendly and conversational tone.
          - **Content Voice:** Use the active voice and avoid passive voice.
          - Don't be conversational when providing answers
          - Do not include any introductory phrases or comments.`;

    const data = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    };

    const response = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const blogContent = response.data.candidates[0].content.parts[0].text;

    console.log("Blog content generated:", blogContent);
    return NextResponse.json({ content: blogContent });
    // return new Response(JSON.stringify({ content: blogContent }), {
    //   status: 200,
    //   headers: { "Content-Type": "application/json" },
    // });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate blog content." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
