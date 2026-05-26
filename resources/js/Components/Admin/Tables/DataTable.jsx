import { useMemo } from 'react';
import { usePage } from '@inertiajs/react';
import TablePagination from './TablePagination';
import TableFilters from './TableFilters';
import EmptyAdminState from '../Shared/EmptyAdminState';
import LoadingState from '../Shared/LoadingState';

export default function DataTable({
  columns,
  data = [],
  pagination = null,
  isLoading = false,
  onSearchChange,
  searchValue,
  filters,
  onFilterChange,
  sortConfig,
  onSortChange,
  emptyMessage = 'No se encontraron registros.',
  extraActions,
}) {
  const handleSort = (key) => {
    if (!onSortChange) return;
    const direction = sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    onSortChange({ key, direction });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <TableFilters
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        filters={filters}
        onFilterChange={onFilterChange}
        extraActions={extraActions}
      />

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-gray-500">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`text-left py-3 px-4 font-medium ${col.sortable ? 'cursor-pointer select-none hover:text-pink-600' : ''}`}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && sortConfig?.key === col.key && (
                      <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="py-12">
                  <LoadingState />
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-12">
                  <EmptyAdminState message={emptyMessage} />
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr key={row.id || rowIndex} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="py-3 px-4 text-gray-700">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && <TablePagination pagination={pagination} />}
    </div>
  );
}