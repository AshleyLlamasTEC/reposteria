import SearchInput from '@/Components/Admin/Forms/SearchInput';
import StatusSelect from '@/Components/Admin/Forms/StatusSelect';

export default function TableFilters({ searchValue, onSearchChange, filters, onFilterChange, extraActions }) {
  return (
    <div className="p-4 flex flex-col sm:flex-row gap-3 border-b">
      <SearchInput value={searchValue} onChange={onSearchChange} />
      {filters?.status && (
        <StatusSelect value={filters.status} onChange={(val) => onFilterChange?.('status', val)} />
      )}
      <div className="flex-1" />
      {extraActions}
    </div>
  );
}