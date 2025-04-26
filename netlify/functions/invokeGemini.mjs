// Arrow function with implicit return
export default async (req, context) => {

    const url = new URL(req.url);
    console.log(url);
    const apiKey = Netlify.env.get("GAME_KEY");

    // make a new gemini request object with the acuquired api key

    return new Response("Endpoint in development");
}

export const config = {
    path: "api/devotol/ask"
}