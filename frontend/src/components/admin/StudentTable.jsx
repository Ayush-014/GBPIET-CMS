import React, { useMemo, useState, Fragment, useEffect } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Menu, Transition } from "@headlessui/react";
import { HiChevronDown, HiChevronUp, HiDownload } from "react-icons/hi";
import Pagination from "../../components/common/Pagination";

const baseURL = import.meta.env.VITE_API_BASE || "http://localhost:3001";

export default function StudentsTable() {
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/v1/admin/students`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setData(response.data.data || []);
      } catch (error) {
        console.error("Error fetching students:", error);
        setData([]);
      }
    };

    fetchStudents();
  }, []);

  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Institute ID", accessor: "instituteId" },
      { Header: "Department", accessor: "department" },
      { Header: "Email", accessor: "email" },
      { Header: "CGPA", accessor: "cgpa" },
      {
        Header: "Skills",
        accessor: "skills",
        Cell: ({ value }) => value?.join(", ") || "-",
      },
      {
        Header: "Resume",
        accessor: "resume",
        Cell: ({ value }) =>
          value ? (
            <a
              href={`${baseURL}${value}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-gray-100 border px-2 py-1 rounded text-xs sm:text-sm whitespace-nowrap font-sR cursor-pointer">
                View File
              </button>
            </a>
          ) : (
            <span className="text-gray-400 text-xs">Not Uploaded</span>
          ),
        disableSortBy: true,
      },
      {
        Header: "Export",
        accessor: "export",
        Cell: ({ row }) => (
          <button
            className="font-sR bg-[#3C89C9] text-white px-2 py-1 rounded text-xs sm:text-sm whitespace-nowrap cursor-pointer hover:bg-[#235782] transition duration-150"
            onClick={() => exportSingleStudent(row.original)}
          >
            Export
          </button>
        ),
        disableSortBy: true,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    setSortBy: setTableSortBy,
    state: { globalFilter },
  } = useTable(
    { columns, data, initialState: { sortBy } },
    useGlobalFilter,
    useSortBy
  );

  useEffect(() => {
    setTableSortBy(sortBy);
  }, [sortBy, setTableSortBy]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const selectedRows = rows.slice(startIndex, startIndex + rowsPerPage);
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const getFilteredData = () =>
    rows.map((row) => {
      const student = row.original;
      return {
        Name: student.name,
        "Institute ID": student.instituteId,
        Department: student.department,
        Email: student.email,
        CGPA: student.cgpa,
        Skills: Array.isArray(student.skills)
          ? student.skills.join(", ")
          : student.skills || "-",
        Resume: student.resume ? `${baseURL}${student.resume}` : "Not Uploaded",
      };
    });

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(getFilteredData());
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "students_data.xlsx");
  };

  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(getFilteredData());
    const csv = XLSX.utils.sheet_to_csv(ws);
    const blob = new Blob([csv], { type: "text/csv" });
    saveAs(blob, "students_data.csv");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const headers = [
      ["Name", "Institute ID", "Department", "Email", "CGPA", "Skills", "Resume"],
    ];
    const tableData = getFilteredData().map((student) => [
      student.Name,
      student["Institute ID"],
      student.Department,
      student.Email,
      student.CGPA,
      student.Skills,
      student.Resume,
    ]);
    doc.text("Students Data", 14, 20);
    autoTable(doc, {
      startY: 30,
      head: headers,
      body: tableData,
      theme: "striped",
      headStyles: { fillColor: [60, 137, 201] },
    });
    doc.save("students_data.pdf");
  };

  const exportSingleStudent = (student) => {
    const data = [
      {
        Name: student.name,
        "Institute ID": student.instituteId,
        Department: student.department,
        Email: student.email,
        CGPA: student.cgpa,
        Skills: Array.isArray(student.skills)
          ? student.skills.join(", ")
          : student.skills || "-",
        Resume: student.resume ? `${baseURL}${student.resume}` : "Not Uploaded",
      },
    ];
    const ws = XLSX.utils.json_to_sheet(data);
    const csv = XLSX.utils.sheet_to_csv(ws);
    const blob = new Blob([csv], { type: "text/csv" });
    saveAs(blob, `${student.name}_data.csv`);
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header with Search and Export */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 mt-2 justify-between flex-wrap">
        <input
          className="px-4 py-2 rounded-full w-full sm:w-72 shadow-sm focus:outline-none focus:ring-1 focus:ring-[#235782] text-sm sm:text-base border border-gray-300"
          placeholder="Search"
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />

        {/* Sort & Export Dropdowns */}
        <div className="flex gap-3 flex-wrap items-center justify-start sm:justify-end w-full sm:w-auto">
          {/* Sort Dropdown */}
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="px-4 py-2 rounded-full border text-gray-600 hover:bg-gray-100 shadow-sm flex items-center gap-1 cursor-pointer hover:shadow-[0_0_8px_2px_rgba(41,69,179,0.6)] transition-shadow duration-300 text-sm sm:text-base">
              Sort by
              <HiChevronDown className="w-4 h-4" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 w-44 origin-top-right bg-white rounded-md shadow-lg focus:outline-none text-sm sm:text-base">
                <div className="py-1 text-gray-700">
                  {columns
                    .filter((col) => !col.disableSortBy && col.accessor)
                    .map((col) => {
                      const isSorted = sortBy.find(
                        (s) => s.id === col.accessor
                      );
                      const direction = isSorted
                        ? isSorted.desc
                          ? "desc"
                          : "asc"
                        : null;

                      return (
                        <Menu.Item key={col.accessor}>
                          {({ active }) => (
                            <button
                              className={`w-full text-left px-4 py-2 flex justify-between items-center ${
                                active ? "bg-gray-100" : ""
                              }`}
                              onClick={() => {
                                if (!direction) {
                                  setSortBy([
                                    { id: col.accessor, desc: false },
                                  ]);
                                } else if (direction === "asc") {
                                  setSortBy([
                                    { id: col.accessor, desc: true },
                                  ]);
                                } else {
                                  setSortBy([]);
                                }
                              }}
                            >
                              {col.Header}
                              {direction === "asc" && <HiChevronUp />}
                              {direction === "desc" && <HiChevronDown />}
                            </button>
                          )}
                        </Menu.Item>
                      );
                    })}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          {/* Export Dropdown */}
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex justify-center items-center gap-2 px-4 py-2 rounded-full border text-gray-600 hover:bg-gray-100 shadow-sm cursor-pointer hover:shadow-[0_0_8px_2px_rgba(41,69,179,0.6)] transition-shadow duration-300 text-sm sm:text-base">
              Export Data
              <HiChevronDown className="w-4 h-4" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-44 origin-top-right bg-white border rounded-md shadow-lg focus:outline-none text-sm sm:text-base">
                <div className="py-1 text-gray-700">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={exportToExcel}
                        className={`w-full text-left px-4 py-2 flex justify-between items-center ${
                          active ? "bg-gray-100" : ""
                        }`}
                      >
                        Export to Excel
                        <HiDownload className="w-4 h-4" />
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={exportToCSV}
                        className={`w-full text-left px-4 py-2 flex justify-between items-center ${
                          active ? "bg-gray-100" : ""
                        }`}
                      >
                        Export to CSV
                        <HiDownload className="w-4 h-4" />
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={exportToPDF}
                        className={`w-full text-left px-4 py-2 flex justify-between items-center ${
                          active ? "bg-gray-100" : ""
                        }`}
                      >
                        Export to PDF
                        <HiDownload className="w-4 h-4" />
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded shadow-sm border border-gray-200">
        <table
          {...getTableProps()}
          className="min-w-full divide-y divide-gray-200 table-auto"
        >
          <thead className="bg-gray-50 font-sB">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-3 py-4 text-left text-gray-700 whitespace-nowrap text-xs sm:text-sm"
                    key={column.id}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps()}
            className="bg-white divide-y divide-gray-200"
          >
            {selectedRows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="hover:bg-gray-50 font-normal"
                  key={row.id}
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-3 py-2 whitespace-nowrap text-xs sm:text-sm"
                      key={cell.column.id}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          total={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
