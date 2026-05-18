export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface Message {
    id: number;
    sender_id: number;
    receiver_id: number;
    body: string;
    created_at: string;
    updated_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
