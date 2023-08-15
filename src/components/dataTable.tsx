import { MainData } from "../interfaces/MainData";

function DataTable({ data }: { data: MainData[]}) {
  return (
    <table className="table w-100">
      <thead>
        <tr>
          <th>Number</th>
          <th>Random Identifier</th>
          <th>Name</th>
          <th>Address</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className="wrapped-cell">{index + 1}</td>
            <td className="wrapped-cell">{item.randomIdentifier}</td>
            <td className="wrapped-cell">{item.name}</td>
            <td className="wrapped-cell">{item.address}</td>
            <td className="wrapped-cell">{item.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
