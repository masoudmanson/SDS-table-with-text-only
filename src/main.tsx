import * as React from "react";
import { CellBasic, CellHeader, TableHeader, TableRow, Table } from "czifui";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";

import "./index.css";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  birthdate: string;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    firstName: "Tanner",
    lastName: "Linsley",
    age: 24,
    birthdate: "26 October 1997",
    visits: 100,
    status: "In Relationship",
    progress: 50
  },
  {
    firstName: "Tandy",
    lastName: "Miller",
    age: 40,
    birthdate: "14 July 1982",
    visits: 40,
    status: "Single",
    progress: 80
  },
  {
    firstName: "Joe",
    lastName: "Dirte",
    age: 45,
    birthdate: "25 February 1977",
    visits: 20,
    status: "Complicated",
    progress: 10
  }
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue(),
    header: "First Name"
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: "lastName",
    cell: (info) => info.getValue(),
    header: "Last Name"
  }),
  columnHelper.accessor("age", {
    header: "Age",
    cell: (info) => info.renderValue()
  }),
  columnHelper.accessor("visits", {
    header: "Visits"
  }),
  columnHelper.accessor("status", {
    header: "Status"
  }),
  columnHelper.accessor("progress", {
    header: "Profile Progress"
  })
];

function App() {
  const [data] = React.useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="app">
      <h1 className="title">Table with text only</h1>
      <p className="description">
        This shows a table that is made up entirely of BasicCells.
      </p>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} hover={false}>
              {headerGroup.headers.map((header) => (
                <CellHeader
                  key={header.id}
                  hideSortIcon
                  horizontalAlign={header.id === "progress" ? "right" : "left"}
                >
                  {header.isPlaceholder
                    ? null
                    : (flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      ) as string)}
                </CellHeader>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => {
                switch (cell.column.id) {
                  case "age":
                    return (
                      <CellBasic
                        key={cell.id}
                        primaryText={cell.getValue() as string}
                        secondaryText={cell.row.original.birthdate}
                        tooltipProps={{
                          sdsStyle: "dark",
                          leaveTouchDelay: 0,
                          leaveDelay: 0
                        }}
                      ></CellBasic>
                    );
                  case "progress":
                    return (
                      <CellBasic
                        key={cell.id}
                        primaryText={cell.getValue() as string}
                        secondaryText={`${cell.getValue()} ± 5%`}
                        tooltipProps={{
                          sdsStyle: "dark",
                          leaveTouchDelay: 0,
                          leaveDelay: 0
                        }}
                        horizontalAlign="right"
                      ></CellBasic>
                    );
                  default:
                    return (
                      <CellBasic
                        key={cell.id}
                        primaryText={cell.getValue() as string}
                        tooltipProps={{
                          sdsStyle: "dark",
                          leaveTouchDelay: 0,
                          leaveDelay: 0
                        }}
                      ></CellBasic>
                    );
                }
              })}
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
