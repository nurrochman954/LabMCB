import React from 'react';

interface TableProps {
  title: string;
  headers: string[];
  data: string[][];
}

const Table: React.FC<TableProps> = ({ title, headers, data }) => {
  return (
    <div className="my-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="border px-4 py-2"
                style={{ backgroundColor: '#EBD6B8', borderColor: '#FFFFFF' }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border px-4 py-2"
                  style={{ backgroundColor: '#EBD6B8', borderColor: '#FFFFFF' }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
