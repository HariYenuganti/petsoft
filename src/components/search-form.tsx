'use client';

import { useSearchContext } from '@/lib/hooks';
import Icon from './icon';

export default function SearchForm() {
  const { searchQuery, handleChangeSearchQuery } = useSearchContext();

  return (
    <form className="search-field h-full" onSubmit={(e) => e.preventDefault()}>
      <span className="text-ink-3">
        <Icon name="search" size={14} />
      </span>
      <input
        placeholder="Search guests, owners, medications…"
        type="search"
        value={searchQuery}
        onChange={(e) => handleChangeSearchQuery(e.target.value)}
      />
      <span className="kbd hidden sm:inline-flex">&#8984;K</span>
    </form>
  );
}
