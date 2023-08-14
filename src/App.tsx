import { useState, useEffect, SetStateAction, ChangeEvent } from "react";
import DataGenerator from "./components/dataGenerator";
import DataTable from "./components/dataTable";
import { MainData } from "./interfaces/MainData";
import { RegionType } from "./interfaces/RegionType";
import './App.scss';

function App() {
  const [region, setRegion] = useState<RegionType>(RegionType.en);
  const [errorSliderValue, setErrorSliderValue] = useState(0);
  const [errorFieldValue, setErrorFieldValue] = useState(0);
  const [seed, setSeed] = useState(42);
  const [generatedData, setGeneratedData] = useState<MainData[]>([]);

  useEffect(() => {
    const dataGenerator = new DataGenerator(region, errorFieldValue, seed)
    const newData = dataGenerator.generateData(20);
    setGeneratedData(newData);
  }, [region, errorSliderValue, errorFieldValue, seed]);

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setErrorSliderValue(newValue);
    setErrorFieldValue(newValue); 
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setErrorFieldValue(newValue);
    setErrorSliderValue(Math.min(newValue, 10)); 
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100">
      <form className="d-flex flex-row border border-primary p-1 gap-1">
        <select defaultValue="USA" className="form-select" aria-label="Пример выбора по умолчанию" 
          onChange={(e) => setRegion(e.target.value as SetStateAction<RegionType>)}>
          <option value="en">EN</option>
          <option value="fr">FR</option>
          <option value="de">DE</option>
        </select>
        <input type="range" min="0" max="10" step="0.25"
          value={errorSliderValue}
          id="customRange1" 
          onChange={handleSliderChange} />
        <input type="number" min="0" max="1000" step="1" 
          value={errorFieldValue}
          placeholder='Errors' 
          onChange={handleNumberChange} />
        <input type="number" name="name" placeholder='Seed' 
          onChange={(e) => setSeed(Number(e.target.value))} />
        <button type="button" className="btn border-black">Random</button>
      </form>
      <DataTable data={generatedData} />
    </div>
  );
}

export default App;
