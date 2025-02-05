import { IQueue } from "./IQueue";

export abstract class QueueController {
    constructor(protected queue: IQueue) {}

    abstract setup(): Promise<void>;
}
