import React from 'react';

interface TableWidgetProps {
  config: Record<string, unknown>;
}

export const TableWidget: React.FC<TableWidgetProps> = ({ config }) => {
  const columns = (config.columns as string[]) || [];
  const rows = (config.rows as string[][]) || [];

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-completed';
      case 'pending':
        return 'status-pending';
      case 'processing':
        return 'status-processing';
      default:
        return '';
    }
  };

  return (
    <div className="table-widget">
      <table>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className={j === 3 ? getStatusClass(cell) : ''}>
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
