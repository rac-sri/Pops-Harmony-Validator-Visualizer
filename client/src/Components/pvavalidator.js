import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

export default function CustomizedTables({ data }) {
  const classes = useStyles();
  console.log(data);
  const row = data;
  return (
    <Container maxWidth="md">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableBody>
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                Validator Address
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.validatorAddress}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell>Identity</StyledTableCell>
              <StyledTableCell align="right">{row.identity}</StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell>Max Change Rate</StyledTableCell>

              <StyledTableCell align="right">
                {row.maxChangeRate}
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              <StyledTableCell>Max Total Delegation</StyledTableCell>

              <StyledTableCell align="right">
                {row.maxTotalDelegation}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
