import { ReasonPhrases, StatusCodes } from "http-status-codes";

export type HttpReasons = keyof typeof StatusCodes;

type HttpStatus = {
    code: number;
    phrase: string;
};

export class HttpStatusCodes {
    static getStatusCode(reason: HttpReasons): number {
        return StatusCodes[reason];
    }

    static getReasonPhrase(reason: HttpReasons): string {
        return ReasonPhrases[reason];
    }

    static getStatus(reason: HttpReasons): HttpStatus {
        return {
            code: StatusCodes[reason],
            phrase: ReasonPhrases[reason],
        };
    }
}
