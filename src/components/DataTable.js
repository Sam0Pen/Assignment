import React, { useState } from 'react';
import { Table, TableBody, TableContainer, TablePagination } from '@material-ui/core';

import LinearProgress from '@material-ui/core/LinearProgress';
import mtStyles from '../styles/mtStyles';


const DataTable = (props) => {
  const classes = mtStyles();
  const {data, mapTableBody, isLoading } = props

  //Table
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <TableContainer>
        <Table
          className={classes.table}
          size='medium'
        >
          <TableBody>
            {
              mapTableBody((data).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
            }
          </TableBody>
        </Table>
      </TableContainer>

      {
        isLoading ? (
          <LinearProgress />
        ) : (
          <></>
        )
      }
      <TablePagination
        labelRowsPerPage={'Rows per page'}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  )
}

export default DataTable;
