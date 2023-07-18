import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { loadQARefineChain } from "langchain/chains";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

import {
  StructuredOutputParser,
  OutputFixingParser,
} from "langchain/output_parsers";

import { Document } from "langchain/document";

import { z } from "zod";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    //
  })
);

export async function analize(prompt: string) {
  //
  //

  const model = new OpenAI({
    temperature: 0,
    modelName: "gpt-3.5-turbo",
  });

  const result = await model.call(prompt);

  console.log({ result });
}
