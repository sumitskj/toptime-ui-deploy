/* eslint-disable react/jsx-key */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

import { useTable } from 'react-table';

const CustomisedNoData = styled('span')`
  width: 100%;
  text-align: center;
  padding: 2rem;
`;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.colors.tableHead,
    color: '#000',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#eee',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ReactTable = ({ columns, data }) => {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <StyledTableCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </StyledTableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      {rows.length === 0 && (
        <TableBody>
          <TableRow>
            <TableCell colSpan={columns.length}>
              <CustomisedNoData>No data available</CustomisedNoData>
            </TableCell>
          </TableRow>
        </TableBody>
      )}
      {rows.length > 0 && (
        <TableBody>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <StyledTableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <StyledTableCell {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </StyledTableCell>
                  );
                })}
              </StyledTableRow>
            );
          })}
        </TableBody>
      )}
    </Table>
  );
};

ReactTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ReactTable;
