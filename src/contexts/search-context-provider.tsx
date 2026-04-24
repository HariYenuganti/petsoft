'use client';

import { createContext, useState } from 'react';

export type RosterFilter = 'on' | 'off';

type SearchContextProviderProps = {
  children: React.ReactNode;
};

type TSearchContext = {
  searchQuery: string;
  handleChangeSearchQuery: (query: string) => void;
  rosterFilter: RosterFilter;
  handleChangeRosterFilter: (filter: RosterFilter) => void;
};

export const SearchContext = createContext<TSearchContext | null>(null);

export default function SearchContextProvider({
  children,
}: SearchContextProviderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [rosterFilter, setRosterFilter] = useState<RosterFilter>('on');

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        handleChangeSearchQuery: setSearchQuery,
        rosterFilter,
        handleChangeRosterFilter: setRosterFilter,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
