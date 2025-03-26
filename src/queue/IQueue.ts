export interface IQueue {
    connect(): Promise<boolean>;
    close(): Promise<void>;
    on<TInput = unknown>(queueName: string, callback: (input: TInput) => Promise<void>): Promise<void>;
    publish(queueName: string, data: unknown): Promise<void>;
}
