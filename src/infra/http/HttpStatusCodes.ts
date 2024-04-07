import { ReasonPhrases, StatusCodes } from "http-status-codes";

export type HttpReasons = keyof typeof StatusCodes;

export class HttpStatusCodes {
    static getStatusCode(reason: HttpReasons) {
        return StatusCodes[reason];
    }

    static getReasonPhrase(reason: HttpReasons) {
        return ReasonPhrases[reason];
    }

    static getStatus(reason: HttpReasons) {
        return {
            code: StatusCodes[reason],
            phrase: ReasonPhrases[reason],
        };
    }
}
