export interface News{
    id: number;
    title: string;
    content: string;
    creationDate: Date;
    writer: string;
    status: string;
    imageUrl?: string[]; //porque é opcional
}