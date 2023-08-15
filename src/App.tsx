import { useState, } from "react";
import DataTable from "./components/dataTable";
import { MainData } from "./interfaces/MainData";
import './App.scss';
import DataHeader from "./components/dataHeader";

function App() {
  const [generatedData, setGeneratedData] = useState<MainData[]>([]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100">
      <DataHeader setGeneratedData={setGeneratedData} />
      <DataTable data={generatedData} />
    </div>
  );
}

export default App;
