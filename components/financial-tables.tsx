"use client";

import { useState, useEffect, JSX } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type FinancialTab = "income" | "balance" | "cash";

export default function FinancialTables() {
  const [activeTab, setActiveTab] = useState<FinancialTab>("balance");
  const [dataRows, setDataRows] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const years = ["2021", "2022", "2023", "2024"];

  // Fetch financial data whenever the active tab changes
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch(`/api/financials?sheet=${activeTab}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setDataRows(data);
      })
      .catch((err) => {
        setError(err.message || "Error fetching data");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [activeTab]);

  // For Balance Sheet, insert a Liabilities header row before the first row where Item is "Share Capital"
  const renderRows = () => {
    if (activeTab !== "balance") {
      return dataRows.map((row, idx) => (
        <TableRow key={idx}>
          <TableCell className="font-medium">{row.Item}</TableCell>
          {years.map((year) => (
            <TableCell key={year} className="text-right">
              {row[year]}
            </TableCell>
          ))}
        </TableRow>
      ));
    } else {
      const rows: JSX.Element[] = [];
      let liabilitiesHeaderInserted = false;
      dataRows.forEach((row, idx) => {
        if (!liabilitiesHeaderInserted && row.Item === "Share Capital") {
          // Insert liabilities header row before the first liability row
          rows.push(
            <TableRow key="liabilities-header">
              <TableCell className="font-medium">Liabilities</TableCell>
              {years.map((year) => (
                <TableCell key={year} className="text-right">
                  {year}
                </TableCell>
              ))}
            </TableRow>
          );
          liabilitiesHeaderInserted = true;
        }
        rows.push(
          <TableRow key={idx}>
            <TableCell className="font-medium">{row.Item}</TableCell>
            {years.map((year) => (
              <TableCell key={year} className="text-right">
                {row[year]}
              </TableCell>
            ))}
          </TableRow>
        );
      });
      return rows;
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl pl-15">
          <h2 className="text-xl font-medium mb-4">
            Financials <span className="text-gray-500">(In Cr)</span>
          </h2>

          <div className="border-b">
            <div className="flex">
              <button
                className={`py-3 px-4 ${
                  activeTab === "income"
                    ? "text-green-500 border-b-2 border-green-500"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("income")}
              >
                Income Statement
              </button>
              <button
                className={`py-3 px-4 ${
                  activeTab === "balance"
                    ? "text-green-500 border-b-2 border-green-500"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("balance")}
              >
                Balance Sheet
              </button>
              <button
                className={`py-3 px-4 ${
                  activeTab === "cash"
                    ? "text-green-500 border-b-2 border-green-500"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("cash")}
              >
                Cash Flow
              </button>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            {isLoading ? (
              <p>Loading data...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">
                      {activeTab === "balance" ? "Assets" : "Particulars"}
                    </TableHead>
                    {years.map((year) => (
                      <TableHead key={year} className="text-right">
                        {year}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>{renderRows()}</TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
