# AI RAG WWE GPT

AI RAG WWE GPT is an AI-powered chatbot for WWE Pro Wrestling fans. It uses Retrieval-Augmented Generation (RAG) to provide up-to-date, context-aware answers about WWE by combining the latest information from sources like Wikipedia, WWE.com, and Reddit with a powerful language model (Google Gemini). The backend leverages AstraDB for vector search and Google GenAI for embeddings and chat completion.

## Features

- Ask anything about WWE Pro Wrestling
- Uses recent data from Wikipedia, WWE.com, and Reddit
- Retrieval-Augmented Generation (RAG) for accurate, context-rich answers
- Powered by Google Gemini and AstraDB

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/akilkhatri104/nextjs-rag-wwegpt
   cd nextjs-wwegpt
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables:**
   - Copy `.env-sample` to `.env` and fill in your AstraDB and Google API credentials.

4. **(Optional) Load WWE data into AstraDB:**
   - Run the data loader script to populate your database:
     ```bash
     npm run seed
     ```

5. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser:**
   - Visit [https://wwegpt.vercel.app/](https://wwegpt.vercel.app/) to use WWE GPT.

## Project Structure

- `app/` - Next.js app and API routes
- `scripts/loadDb.ts` - Script to scrape and load WWE data into AstraDB
- `.env-sample` - Example environment variables

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [AstraDB Documentation](https://docs.datastax.com/en/astra/astra-db-vector/)
- [Google GenAI Documentation](https://ai.google.dev/)

## Deploy

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

See [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
