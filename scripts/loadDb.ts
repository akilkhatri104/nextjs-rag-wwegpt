import 'dotenv/config'
import { DataAPIClient } from '@datastax/astra-db-ts'
import { PuppeteerWebBasedLoader } from 'langchain/document_loaders/web/puppeteer'
import { RecurssiveCharacterTextSplitter } from 'langchain/text_splitter'
import { GoogleGenAI } from "@google/genai";


