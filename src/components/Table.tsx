import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function TableComponent({ data }: { data: any[] }) {
  const formatedData: any[] = data.map((el) => Object.entries(el));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%" }}>
        <TableHead>
          <TableRow>
            {formatedData[0] &&
              formatedData[0].map((row: any) => (
                <TableCell key={row[0]}>{row[0]}</TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {formatedData &&
            formatedData.map((row) => (
              <TableRow
                key={row[1][1]}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {row.map((el: any) => (
                  <TableCell key={el[1]}>{el[1]}</TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableComponent;
