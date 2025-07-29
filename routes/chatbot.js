const env = require('dotenv').config()
const OPENAI_API_KEY = "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";

const express = require('express');
const { default: OpenAI } = require('openai');
const chatRouter = express.Router();

const client = new OpenAI({apiKey:OPENAI_API_KEY});

//Chat related API will goes here 
chatRouter.post("/",async(req,res)=>{
    try{
      const userMessage = req.body.message;
      const completion = await client.chat.completions.create({
        model:"gpt-3.5-turbo", //Free model
        messages:[
            {role:"system",content:`Recognized as the No.1 Fresher Placement Center in Kolkata, EjobIndia consistently achieves an impressive record of around 400 fresher placements every year. We are a trusted name among technical institutions (B.Tech, MCA, BCA) and software companies throughout West Bengal, with over 200 reputed software companies regularly recruiting freshers trained by us.

Our greatest strength lies in our unwavering dedication to helping students launch their careers in the IT industry. Over the past 20 years, this commitment has built a strong reputation for EjobIndia, with 80% of our students coming to us through references from friends and seniors who have successfully established their careers with our support.

EjobIndia’s growth is entirely reference-driven — a testament to the trust and satisfaction of our students and alumni. With a strong network of over 15,000 alumni, we continue to thrive and remain resilient, even in the face of changing market dynamics, ensuring that we consistently deliver results for aspiring IT professionals.
React Course Fees 12000/-,Angular Course Fees 13000/-,PHP Course fees 14000/-,Node Course fees 20000/-
Software Development Unit -
EjobIndia has a strong industry background being a wing of Open Solutions for Education India Pvt. Ltd. (OS4Ed), a globally recognized educational product development company. OS4Ed is renowned for developing openSIS (www.opensis.com), a popular educational ERP product used by many big and prominent educational institutes worldwide.
`},
{role:"user", content:userMessage}
]
}) 

   res.status(200).json({"reply":completion.choices[0].message.content});
    }
    catch(error){
        res.status(200).json(error);
    }
})
module.exports = chatRouter;
console.log("ChatBot Initialized");