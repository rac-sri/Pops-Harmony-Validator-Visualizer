import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Container from "@material-ui/core/Container";
import TableHead from "@material-ui/core/TableHead";
import TablePaginationActions from "./Container/TablePagination";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function createData(arr = []) {
  const finalData = arr
    .map((value) => {
      const data = {
        GameResult: value.gameResult,
        GameName: value.gameName,
        pvaUser: value.pvaUser,
      };
      return data;
    })
    .sort((a, b) => (a.GameResult < b.GameResult ? 1 : -1));
  return finalData;
}

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

const Component = React.memo(function TableWrap() {
  const classes = useStyles2();
  const [game, updateGame] = useState("uptime");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(12);
  const [data, updateData] = React.useState([]);

  useEffect(() => {
    async function fetch() {
      const newdata = await axios.get(`http://localhost:5000/result/${game}`);
      updateData(newdata);
    }
    fetch();
  }, []);
  const rows = createData(data.data);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container maxWidth="md">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <StyledTableCell>PVA User Address</StyledTableCell>
              <StyledTableCell align="right">Game Score</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.pvaUser}>
                <TableCell component="th" scope="row">
                  {row.pvaUser}
                </TableCell>

                <TableCell style={{ width: 160 }} align="right">
                  {row.GameResult}
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
});

export default Component;
