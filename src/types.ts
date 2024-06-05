export interface RawUser {
  bananas: number;
  lastDayPlayed: string;
  longestStreak: number;
  name: string;
  stars: number;
  subscribed: boolean;
  uid: string;
}

export interface User {
  name: string;
  bananas: number;
  uid: string;
  rank: number;
  isHighlighted: boolean;
}

export type SearchType = 'DEFAULT' | 'FUZZY';

export interface UserState {
  name: string;
  users: User[];
  searchType: SearchType;
}
