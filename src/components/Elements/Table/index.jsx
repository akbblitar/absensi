import { Link } from 'react-router-dom';

const Table = (props) => {
    const { columns, data } = props;

    return (
        <div className="bg-white border-4 border-black 
            shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-[-0.5deg]">
            <div className="overflow-x-auto p-4">
                <table className="min-w-full border-collapse border-4 border-black">
                    <thead>
                        <tr className="bg-yellow-400 border-b-4 border-black">
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    className="px-6 py-4 text-left text-black font-black 
                                        uppercase tracking-wider border-r-4 border-black
                                        last:border-r-0"
                                >
                                    {typeof column === 'string' ? 
                                        column.replace(/_/g, ' ') : column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y-4 divide-black">
                        {data.map((row, rowIndex) => (
                            <tr 
                                key={rowIndex} 
                                className="hover:bg-blue-100 transition-colors"
                            >
                                {columns.map((column, colIndex) => (
                                    <td 
                                        key={colIndex} 
                                        className="px-6 py-4 text-black font-bold border-r-4 
                                            border-black last:border-r-0"
                                    >
                                        {row[column]}
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