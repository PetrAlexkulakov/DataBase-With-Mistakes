import { useState, useEffect } from "react";
import DataGenerator from "./components/dataGenerator";
import DataTable from "./components/dataTable";
import { MainData } from "./interfaces/MainData";

function App() {
  const [region, setRegion] = useState("USA");
  const [errorSliderValue, setErrorSliderValue] = useState(0);
  const [errorFieldValue, setErrorFieldValue] = useState(0);
  const [seed, setSeed] = useState(42);
  const [generatedData, setGeneratedData] = useState<MainData[]>([]);

  useEffect(() => {
    const dataGenerator = new DataGenerator(region, errorSliderValue, errorFieldValue, seed)
    const newData = dataGenerator.generateData();
    setGeneratedData(newData);
  }, [region, errorSliderValue, errorFieldValue, seed]);

  return (
    <div className="app">
      <form className="d-flex flex-column border border-primary p-1 gap-1">
        <select className="form-select" aria-label="Пример выбора по умолчанию" 
          onChange={(e) => setRegion(e.target.value)}>
          <option selected value="USA">USA</option>
          <option value="2">Два</option>
          <option value="3">Три</option>
        </select>
        <input type="range" min="0" max="10" step="0.25" className="form-range" id="customRange1" 
          onChange={(e) => setErrorSliderValue(Number(e.target.value))} />
        <input type="number" name="name" placeholder='Errors' 
          onChange={(e) => setErrorFieldValue(Number(e.target.value))} />
        <input type="number" name="name" placeholder='Seed' 
          onChange={(e) => setSeed(Number(e.target.value))} />
        <button type="button" className="btn border-primary">Random</button>
      </form>
      <DataTable data={generatedData} />
    </div>
  );
}

export default App;
