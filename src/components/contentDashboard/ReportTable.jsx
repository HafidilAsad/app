import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';

const ReportTable = ({ dataReport }) => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo(
    () => [
      {
        header: 'No',
        accessorFn: (_row, i) => i + 1,
        id: 'rowNumber',
        enableSorting: false,
      },
      {
        header: 'kWh',
        accessorKey: 'deltaKwh',
        cell: info =>
          info.getValue() !== null ? info.getValue().toFixed(3) : '',
      },
      {
        header: 'Humidity',
        accessorKey: 'humidity',
        cell: info => info.getValue().toFixed(1),
      },
      {
        header: 'Temperature',
        accessorKey: 'temperature',
        cell: info => info.getValue().toFixed(1),
      },
      {
        header: 'Cost (Rp)',
        accessorKey: 'cost',
        cell: info =>
          info.getValue() !== null
            ? parseFloat(info.getValue().toFixed(1)).toLocaleString('id-ID')
            : '',
      },
      {
        header: 'Efficiency (%)',
        accessorKey: 'efficiency',
        cell: info =>
          info.getValue() !== null ? info.getValue().toFixed(1) : '',
      },
      {
        header: 'Tanggal',
        accessorKey: 'createdAt',
        cell: info =>
          new Date(info.getValue()).toLocaleDateString('id-ID'),
      },
    ],
    []
  );

  const table = useReactTable({
    data: dataReport,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="">
        <div className="d-flex justify-content-end mb-2">
            <div style={{ width: '200px' }}>
                <input
                type="text"
                className="form-control form-control-sm"
                value={globalFilter ?? ''}
                onChange={e => setGlobalFilter(e.target.value)}
                placeholder="Cari..."
                />
            </div>
            </div>
     

      <table className="table table-striped table-bordered text-center">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[header.column.getIsSorted()] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          <button
            className="btn btn-sm btn-secondary me-1"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className="btn btn-sm btn-secondary me-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          <button
            className="btn btn-sm btn-secondary me-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </button>
        </div>

        <span>
          Page{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>

        <select
          className="form-select form-select-sm"
          style={{ width: '100px' }}
          value={table.getState().pagination.pageSize}
          onChange={e => table.setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ReportTable;
