import { GoogleGenAI } from "@google/genai";


// Arrow function with implicit return
export default async (req, context) => {

    const url = new URL(req.url);
    console.log(url);
    const apiKey = Netlify.env.get("GAME_KEY");

    // const body = await req.json();
    // console.log(body);

    // make a new gemini request object with the acuquired api key
    const ai = new GoogleGenAI({ apiKey: apiKey });

    let responseText;

    async function getAnswer(question) {
        // if (!(question instanceof String)) {
        //     console.log("its not a string")
        //     return null;
        // }
        question = String(question);
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: question,
        });
        console.log(response.text);
        return response.text;
    }

    const dataToSend = await getAnswer("ONLY GIVE THE ANSWER IN SHORTEST WAY WITH A LITTLE EXPLANATOIN,give me a cronjob query for everyday at 8:42pm");

    return new Response(dataToSend);
}

export const config = {
    path: "/api/devotol/ask"
}