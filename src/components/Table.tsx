"use client"

import {
  Checkbox,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import NoDataMessageComponent from "./NoDataMessage";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976d2",
    color: "white",
    fontWeight: "bold",
    padding: 0,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: 0,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f5f5f5",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: "#e3f2fd",
    cursor: "pointer",
  },
}));

function TableComponent({ data }: { data: any[] | null}) {
  if(!data) return <NoDataMessageComponent />

  const dataTable = data.map((el) => Object.entries(el))

  const checkboxStyles = (color: string) => {
    return {
      color: color,
      "&.Mui-checked": {
        color: color,
      },
    };
  };


  return (
    <Paper>
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Checkbox sx={checkboxStyles("white")} />
              </StyledTableCell>
              {dataTable[0] &&
                dataTable[0].map((row: any, index: number) => (
                  <StyledTableCell key={index}>
                    {row[0].toUpperCase()}
                  </StyledTableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTable &&
              dataTable.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>
                    <Checkbox sx={checkboxStyles("black")} />
                  </StyledTableCell>
                  {row.map((el: any, index: number) => (
                    <StyledTableCell key={index}>
                      {el[1].toString()}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={() => ""}
      /> */}
    </Paper>
  );
}

export default TableComponent;
