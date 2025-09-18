import { GoogleGenAI } from "@google/genai";

// Arrow function with implicit return
export default async (req, context) => {

    try {
        // Getting the API key from Netlify environment variables
        const apiKey = Netlify.env.get("GAME_KEY");

        // Allowed commands
        const allowedCommands = [
            "__answer in normal text, no md formatting. please answer in the shortest way with a little explanation only if the prompt below is realted to cronjob__",
            "__answer in normal text, no md formatting. please check the programming language and give me the name of the programming language which this is__",
            "__answer in normal text, no md formatting. please give me the method details, its return type and params if any ,also give a sample example. and keep the answer concise__",
            "__answer in normal text, no md formatting. please provide me with all the details of the object in the said programming language__",
            "__answer in normal text, no md formatting. please correct the syntax if it has issues and also give a very short info about where it is wrong__",
        ];

        const body = await req.json();
        // console.log(body);

        if (!body || !body.question) {
            return new Response(JSON.stringify({ error: "No question provided" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        if (!allowedCommands.some(command => String(body.question).toLowerCase().includes(command.toLowerCase()))) {
            return new Response(JSON.stringify({ error: "Invalid command" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const ai = new GoogleGenAI({ apiKey: apiKey });

        async function getAnswer(question) {
            question = String(question); 
            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: question,
            });
            console.log(response.text);
            return response.text;
        }

        console.log("This is body question: "+ body.question);
        const dataToSend = await getAnswer(body.question);
        console.log(dataToSend);

        return new Response(JSON.stringify({ answer: dataToSend }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("Error occurred:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};

export const config = {
    path: "/api/devotol/ask"
};
