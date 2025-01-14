import React from 'react';

interface TableProps {
  title: string;
  headers: string[];
  data: string[][];
}

const Table: React.FC<TableProps> = ({ title, headers, data }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
      <div style={{ width: "60%" }}>
        <h2 className="text-xl font-bold mb-4" style={{ textAlign: "center" }}>{title}</h2>
        <table className="w-full border-collapse" style={{ border: '2px solid #FFFFFF' }}>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-2 text-left"
                  style={{ backgroundColor: '#EBD6B8', borderColor: '#FFFFFF', borderWidth: '2px' }}
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
                    className="px-4 py-2 text-left"
                    style={{ backgroundColor: '#EBD6B8', borderColor: '#FFFFFF', borderWidth: '2px' }}
                  >
                    {cell.includes('•') ? <ul>{cell.split('\n').map((item, i) => <li key={i}>{item}</li>)}</ul> : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
