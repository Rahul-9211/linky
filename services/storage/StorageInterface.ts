export interface StorageInterface {
  saveLinks(links: Link[]): Promise<void>;
  getLinks(): Promise<Link[]>;
}

export type Link = {
  id: string;
  name: string;
  url: string;
  createdAt: number;
  category: string;
}; 