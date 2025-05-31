import { GoogleGenAI } from "@google/genai";
import { DataAPIClient } from "@datastax/astra-db-ts";
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';


const {
    ASTRA_DB_NAMESPACE,
    ASTRA_DB_COLLECTION,
    ASTRA_DB_API_ENDPOINT,
    ASTRA_DB_APPLICATION_TOKEN,
    GOOGLE_API_KEY,
} = process.env;

const google = createGoogleGenerativeAI({
  apiKey: GOOGLE_API_KEY
});
const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT, {
    namespace: ASTRA_DB_NAMESPACE,
});


export async function POST(req:Request){
    try {
        const {messages} = await req.json()
        const lastMessage = messages[messages.length-1]?.content

        let docContext = ''

        const embedding =  await ai.models.embedContent({
                model: "text-embedding-004",
                contents: lastMessage,
        });

        try {
            const collection = db.collection(ASTRA_DB_COLLECTION)
            const cursor = collection.find(null,{
                sort: {
                    $vector: embedding.embeddings[0].values
                },
                limit: 10
            })

            const documents = await cursor.toArray()

            const docsMap = documents?.map(doc => doc.text)

            docContext = JSON.stringify(docsMap)
        } catch (error) {
            docContext = ''
            throw new Error(error)
        }

        const template = {
            role: 'system',
            content: `You are an ai assistent who knows everything about WWE Pro Wrestling. Use the below context to augument what you know about WWE Pro Wrestling. The context will provide you with the most recent page data from wikipedia,WWE Website,Reddit.If the context doesn't include the information you need answer based on your existing knowledge. don't mention the source of your information or what the context does or does not include. format response using markdown where applicable and don't return images
            ----------
            START CONTEXT
            ${docContext}
            END CONTEXT
            -----------
            QUESTION: ${lastMessage}
            -----------
            `
        }

        // Get the stream from Gemini
        // const stream = await ai.models.generateContentStream({
        //     model: 'gemini-2.0-flash',
        //     contents: [template, ...messages]
        // })



        // return stream

        const result = streamText({
            model: google('gemini-2.0-flash'),
            messages: [template,...messages]
        })

        return result.toDataStreamResponse()

    } catch (error) {
        console.error(error.message);
        
    }
}