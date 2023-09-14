import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { openai } from "../lib/openai";
import { streamToResponse, OpenAIStream } from "ai";

export async function generateAICompletionRoute(app: FastifyInstance) {
  app.post("/ai/completion", async (request, reply) => {
    const bodySchema = z.object({
      videoId: z.string().uuid(),
      prompt: z.string(),
      temperature: z.number().min(0).max(1).default(0.5),
    });
    const { videoId, temperature, prompt } = bodySchema.parse(request.body);

    try {
      const video = await prisma.video.findUniqueOrThrow({
        where: {
          id: videoId,
        },
      });

      if (!video.transcription) {
        return reply.status(400).send({
          error: "Video transcription wad not generated yet",
        });
      }

      const promptMessage = prompt.replace(
        "{transcription}",
        video.transcription
      );

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-16k",
        temperature,
        messages: [{ role: "user", content: promptMessage }],
        stream: true,
      });

      const stream = OpenAIStream(response);

      streamToResponse(stream, reply.raw, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        },
      });
    } catch (error) {
      console.error(error);
      return reply
        .status(500)
        .send({ message: error.message, status: error.status });
    }
  });
}
