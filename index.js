import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';
import { GoogleGenAI } from '@google/genai';
import { json } from 'stream/consumers';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';


const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const app = express();
const upload = multer();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const GEMINI_MODEL = "gemini-2.5-flash";

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(_dirname, 'public')));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
});

function extractText(resp){
    try{
        const text =
        resp?.response?.candidates?.[0]?.content?.parts?.[0]?.text ??
        resp?.candidates?.[0]?.content?.parts?.[0]?.text ??
        resp?.response?.candidates?.[0]?.content?.text;

        return text ?? JSON.stringify(resp, null, 2);
    }
    catch(err){
        console.error("Error extracting text:", err);
        return JSON.stringify(resp, null, 2);
    }
}

app.post('/generate-text', async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required.' });
        }

        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: prompt,
        });

        res.json({ result: response.text });
    } catch (err) {
        console.error('API Error:', err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/generate-from-image', upload.single('image'), async (req, res) => {
 try{

        const { prompt } = req.body;
        const imageBase64 = req.file.buffer.toString('base64');
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: [
                { text : prompt},
                { inlineData: { mimeType: req.file.mimetype, data: imageBase64 }}
            ]
        });
        res.json({ result: extractText(response) });
    }catch (err){
        res.status(500).json({ error: err.message });
    }           
});

app.post('/generate-from-document', upload.single('document'), async (req, res) => {
    try {
        const { prompt } = req.body;
        const documentBase64 = req.file.buffer.toString('base64');
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: [
                { text: prompt },
                { inlineData: { mimeType: req.file.mimetype, data: documentBase64 } }
            ]
        });
        res.json({ result: extractText(response) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/generate-from-audio', upload.single('audio'), async (req, res) => {
    try {
        const { prompt } = req.body;
        const audioBase64 = req.file.buffer.toString('base64');
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: [
                { text: prompt },
                { inlineData: { mimeType: req.file.mimetype, data: audioBase64 } }
            ]
        });
        res.json({ result: extractText(response) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
