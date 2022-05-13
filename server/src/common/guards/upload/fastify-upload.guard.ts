import { BadRequestException, CanActivate, ExecutionContext } from "@nestjs/common";
import {FastifyRequest} from "fastify";

export class FastifyUploadGuard implements CanActivate {
    public async canActivate(ctx: ExecutionContext): Promise<boolean> {
        const req = ctx.switchToHttp().getRequest() as FastifyRequest;
        const isMultipart = req.isMultipart();
        if(!isMultipart) throw new BadRequestException("multipart/form-data expected.");
        const file = await req.file();
        if(!file) throw new BadRequestException("File expected.");
        req.incomingFile = file;
        return true;
    }
}