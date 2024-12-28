import Fuse from 'fuse.js';
import { Link } from '../storage/StorageInterface';

const fuseOptions = {
  includeScore: true,
  threshold: 0.6,
  keys: [
    { name: 'name', weight: 0.7 },
    { name: 'url', weight: 0.3 },
    { name: 'category', weight: 0.2 }
  ],
  shouldSort: true,
  minMatchCharLength: 1,
  distance: 100,
  location: 0,
  isCaseSensitive: false,
  findAllMatches: true
};

export class SearchService {
  private fuse: Fuse<Link>;

  constructor(links: Link[]) {
    this.fuse = new Fuse(links, fuseOptions);
  }

  search(query: string): Link[] {
    if (!query.trim()) {
      return this.fuse.getIndex().docs;
    }

    // Perform fuzzy search
    const fuzzyResults = this.fuse.search(query);
    
    // Extract just the items from the fuzzy results
    return fuzzyResults.map(result => result.item);
  }

  updateIndex(links: Link[]) {
    this.fuse.setCollection(links);
  }
} 