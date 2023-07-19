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

const schema = z.object({
  mood: z
    .string()
    .describe("The mood of the user who wrote the journal entry."),
  subject: z.string().describe("The subject of the journal entry."),
  negative: z
    .boolean()
    .describe(
      "Was journal entry negative. If emotions in journal entry seems to be more negative should be 'true', or if emotions are positive, it should be 'false'."
    ),
  summary: z
    .string()
    .describe(
      "Quick summary of entire entry. Sentence of two, depending of size of entire entry."
    ),
  /* color: z
    .string()

    .describe(
      "Hexadecimal color format (example '#DC143C'), which should represent the feeling of a provided entry, for negative emotions use nuances from red to green, where red is worst nad green is best feeling or mood of a provided entry. Example for hapiness should be '#F87272' and for sadness is '#36D399'."
    ), */
  color: z
    .string()
    .describe(
      "a hexidecimal color code the represents the mood of the entry. Example #0101fe for blue representing happiness."
    ),
  polarColor: z
    .string()
    .describe(
      "A hexadecimal color(example '#DC143C') which should be polar oposite of 'color' field, I want to use this color for text color to ensure good contrast."
    ),
  sentimentScore: z
    .number()
    .describe(
      "Should be number between -10 and 10 (including -10 and 10), -10 represent most extreme negativity if entry is negative, and 10 i most positive rating, you should estimate this depending of severity of negativity or positivity of the entry."
    ),
  emoji: z
    .string()

    .describe(
      "Just an emoji you can find which should be appropriate to describe emotion of the entry."
    ),
  solution: z
    .string()
    .describe("Concise solution; try to be creative as much as you can."),
});

export type SchemaAiType = z.TypeOf<typeof schema>;

const parser = StructuredOutputParser.fromZodSchema(schema);

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      "Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}",
    inputVariables: ["entry"],
    partialVariables: { format_instructions },
  });

  const input = await prompt.format({
    entry: content,
  });

  return input;
};

export async function analizeEntryContent(content: string) {
  //
  const input = await getPrompt(content);
  const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });
  const output = await model.call(input);
  //

  try {
    return parser.parse(output);
  } catch (err) {
    const fixParser = OutputFixingParser.fromLLM(
      new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" }),
      parser
    );

    const fix = await fixParser.parse(output);
    return fix;
  }
}

// just for testing out if open ai api is working for me
//
//
export async function analize(content: string) {
  //
  //

  const model = new OpenAI({
    // between 0 and 1, esencially from more corret to more creative
    temperature: 0,
    modelName: "gpt-3.5-turbo",
  });

  const result = await model.call(content);

  console.log({ result });
}
