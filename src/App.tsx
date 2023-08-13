import { useState, useEffect, SetStateAction } from "react";
import DataGenerator from "./components/dataGenerator";
import DataTable from "./components/dataTable";
import { MainData } from "./interfaces/MainData";
import { RegionType } from "./interfaces/regionType";

function App() {
  const [region, setRegion] = useState<RegionType>(RegionType.en);
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
      <form className="d-flex flex-row border border-primary p-1 gap-1">
        <select defaultValue="USA" className="form-select" aria-label="Пример выбора по умолчанию" 
          onChange={(e) => setRegion(e.target.value as SetStateAction<RegionType>)}>
          <option value="en">EN</option>
          <option value="fr">FR</option>
          <option value="de">DE</option>
        </select>
        <input type="range" min="0" max="10" step="0.25" className="form-range" id="customRange1" 
          onChange={(e) => setErrorSliderValue(Number(e.target.value))} />
        <input type="number" name="name" placeholder='Errors' 
          onChange={(e) => setErrorFieldValue(Number(e.target.value))} />
        <input type="number" name="name" placeholder='Seed' 
          onChange={(e) => setSeed(Number(e.target.value))} />
        <button type="button" className="btn border-black">Random</button>
      </form>
      <DataTable data={generatedData} />
    </div>
  );
}

export default App;
