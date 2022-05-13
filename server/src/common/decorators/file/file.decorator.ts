import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import {FastifyRequest} from "fastify"
import {MultipartFields} from "@fastify/multipart"

export interface MultipartFile {
    toBuffer: () => Promise<Buffer>;
    file: NodeJS.ReadableStream;
    filepath: string;
    fieldname: string;
    filename: string;
    encoding: string;
    mimetype: string;
    fields: MultipartFields;
}

declare module "fastify" {
    interface FastifyRequest {
        incomingFile: MultipartFile;
    }
}

export const File = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest() as FastifyRequest;
    const file = req.incomingFile;
    return file;
})