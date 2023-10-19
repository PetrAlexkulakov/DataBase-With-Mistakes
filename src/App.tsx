import { useState, } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import DataTable from "./components/dataTable";
import { MainData } from "./interfaces/MainData";
import DataHeader from "./components/dataHeader";
import './App.scss';
import { RegionType } from "./interfaces/RegionType";
import DataGenerator from "./components/dataGenerator";

function App() {
  const [region, setRegion] = useState<RegionType>(RegionType.en);
  const [errorSliderValue, setErrorSliderValue] = useState(0);
  const [errorFieldValue, setErrorFieldValue] = useState(0);
  const [seed, setSeed] = useState(0);
  const [generatedData, setGeneratedData] = useState<MainData[]>([]);
  const [hasMoreData, setHasMoreData] = useState(true);

  const loadMoreData = () => {
    const dataGenerator = new DataGenerator(region, errorFieldValue, seed)
    const newData = dataGenerator.generateData(10);

    if (newData.length === 0) {
      setHasMoreData(false);
    } else {
      setGeneratedData(prevData => [...prevData, ...newData]);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100">
      <DataHeader setGeneratedData={setGeneratedData} 
      region={region} 
      setRegion={setRegion} 
      errorSliderValue={errorSliderValue} 
      setErrorSliderValue={setErrorSliderValue}
      errorFieldValue={errorFieldValue}
      setErrorFieldValue={setErrorFieldValue}
      seed={seed}
      setSeed={setSeed}
      />
      <InfiniteScroll
        dataLength={generatedData.length}
        next={loadMoreData}
        hasMore={hasMoreData}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more data to load</p>}
        className="border border-primary mt-3 w-75"
      >
        <DataTable data={generatedData} />
      </InfiniteScroll>
    </div>
  );
}

export default App;
