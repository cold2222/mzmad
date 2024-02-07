import styles from "./App3.module.css"
import { useState, useEffect } from "react";

function App() {
  const[loading,setLoading] = useState(true);
  const[coins,setCoins] = useState([])
  const[money,setMoney] = useState(0);
  const [selectedOption, setSelectedOption] = useState('0');
  const [result, setResult] = useState(0);
  const [resultName, setResultName] = useState("");

  const moneyChange = (e) =>{
    const inputMoney = e.target.value;
    console.log(inputMoney)
    setMoney(inputMoney);
  }
  const handleSelectChange = (e) => {
    const selectVal = e.target.value.split(",");
    setSelectedOption(selectVal[0]);
    setResultName(selectVal[1]);
  };

  const calculateResult = () => {
    const selectedValue = selectedOption;
    const calculatedResult = money / selectedValue;
    setResult(calculatedResult.toFixed(2));
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then((response) => response.json())
    .then((json) => {
      setCoins(json);
      setLoading(false);
    });
  },[])
  return <div style={{ display: 'flex', alignItems: 'center', flexDirection : 'column'}}>
    <h1>The Coins! {loading ? "" :`(${coins.length})`}</h1>
    {loading ? <strong>Loading...</strong> : 
    <select style={{ marginBottom: '10px' }} onChange={handleSelectChange}>
      {coins.map((coin,index) => 
      <option value={`${coin.quotes.USD.price},${coin.name}`} key={index}>
        {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
      </option>)}
    </select>}
    돈
    <input type="number" onChange={moneyChange} placeholder="$"/>
    <span style={{marginTop : '10px'}}>변환된값</span>
    <div>
    코인이름<input value={resultName} readOnly/>
    변환된코인<input value={result} readOnly/>
    </div>
    <button onClick={calculateResult}>컨버트</button>
  </div>;
}

export default App;
