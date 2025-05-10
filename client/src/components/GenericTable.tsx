import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

export interface Column<T> {
  id: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface GenericTableProps<T> {
  columns: Column<T>[];
  rows: T[];
}

export const GenericTable = <T,>({ columns, rows }: GenericTableProps<T>) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ backgroundColor: '#ecf2f8' }}>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={String(col.id)}>{col.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((col) => (
                <TableCell key={String(col.id)}>
                  {col.render
                    ? col.render(row[col.id], row)
                    : (row[col.id] as React.ReactNode)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
