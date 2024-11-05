export interface Task {
    id: number;
    title: string;
    description?: string;
    dueDate: string;
    status: string;
    ownerId: number;
    assignedToId?: number;
    attachments?: Attachment[];
  }
  
  export interface Attachment {
    name: string;
    url: string;
  }
  