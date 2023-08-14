import { MainData } from "../interfaces/MainData";

function DataTable({ data }: { data: MainData[]}) {
  return (
    <div className="data-table border border-primary m-3 w-100">
      <table className="table">
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
              <td>{index + 1}</td>
              <td>{item.randomIdentifier}</td>
              <td>{item.name}</td>
              <td>{item.address}</td>
              <td>{item.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
