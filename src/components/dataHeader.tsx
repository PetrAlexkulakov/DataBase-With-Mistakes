import { ChangeEvent, SetStateAction, useEffect, useState } from 'react'
import { MainData } from '../interfaces/MainData';
import { RegionType } from '../interfaces/RegionType';
import DataGenerator from './dataGenerator';

const DataHeader = ({ setGeneratedData }: { setGeneratedData: React.Dispatch<React.SetStateAction<MainData[]>> }) => {
    const [region, setRegion] = useState<RegionType>(RegionType.en);
    const [errorSliderValue, setErrorSliderValue] = useState(0);
    const [errorFieldValue, setErrorFieldValue] = useState(0);
    const [seed, setSeed] = useState(0);

    useEffect(() => {
        const dataGenerator = new DataGenerator(region, errorFieldValue, seed)
        const newData = dataGenerator.generateData(20);
        setGeneratedData(newData);
    }, [region, errorSliderValue, errorFieldValue, seed, setGeneratedData]);

    const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        setErrorSliderValue(newValue);
        setErrorFieldValue(newValue); 
    };

    const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        setErrorFieldValue(Math.min(newValue, 1000));
        setErrorSliderValue(Math.min(newValue, 10)); 
    };

    return (
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
            <input type="number" min="0" max="1000" step="0.25" 
            value={Math.min(errorFieldValue, 1000)}
            placeholder='Errors' 
            onChange={handleNumberChange} />
            <input type="number" name="name" placeholder='Seed'
            value={seed}
            onChange={(e) => setSeed(Number(e.target.value))} />
            <button type="button" className="btn border-black"
            onClick={() => setSeed(Math.floor(Math.random() * 1000))}>Random</button>
        </form>
    )
}

export default DataHeader
