import "dotenv/config";
import { DataAPIClient } from "@datastax/astra-db-ts";
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { GoogleGenAI } from "@google/genai";

type SimilarityMetric = "dot_product" | "cosine" | "euclidean";

const {
    ASTRA_DB_NAMESPACE,
    ASTRA_DB_COLLECTION,
    ASTRA_DB_API_ENDPOINT,
    ASTRA_DB_APPLICATION_TOKEN,
    GOOGLE_API_KEY,
} = process.env;

const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });

const wweData = [
    "https://en.wikipedia.org/wiki/WWE",
    "https://en.wikipedia.org/wiki/List_of_current_champions_in_WWE",
    "https://en.wikipedia.org/wiki/WWE_Raw",
    "https://en.wikipedia.org/wiki/WWE_SmackDown",
    "https://en.wikipedia.org/wiki/WWE_NXT",
    "https://en.wikipedia.org/wiki/History_of_WWE",
    "https://en.wikipedia.org/wiki/List_of_WWE_pay-per-view_and_livestreaming_supercards",
];

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT, {
    namespace: ASTRA_DB_NAMESPACE,
});

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1024,
    chunkOverlap: 100,
});

const createCollection = async (
    similarityMetric: SimilarityMetric = "dot_product"
) => {
    const res = await db.createCollection(ASTRA_DB_COLLECTION, {
        vector: {
            dimension: 768,
            metric: similarityMetric,
        },
    });

    console.log(res);
};

const loadSampleData = async () => {
    const collection = db.collection(ASTRA_DB_COLLECTION);

    for await (const url of wweData) {
        const content = await scrapePage(url);
        const chunks = await splitter.splitText(content);
        console.log(chunks.length, " chunks created");
        for await (const chunk of chunks) {
            const embeddings = await ai.models.embedContent({
                model: "text-embedding-004",
                contents: chunk,
            });

            const vector = embeddings.embeddings[0].values;

            const res = await collection.insertOne({
                $vector: vector,
                text: chunk,
            });

            console.log(res);
        }
    }
};

const scrapePage = async (url: string) => {
    const loader = new PuppeteerWebBaseLoader(url, {
        launchOptions: {
            headless: true,
        },
        gotoOptions: {
            waitUntil: "domcontentloaded",
        },
        evaluate: async (page, browser) => {
            const result = await page.evaluate(() => document.body.innerHTML);
            await browser.close();
            return result;
        },
    });

    return (await loader.scrape())?.replace(/<[^>]*>?/gm, "");
};

createCollection().then(() => loadSampleData());

// loadSampleData()
