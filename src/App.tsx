
import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import logo from './logo.svg'
import './App.css'
import { RootState } from "./app/store";
import ProviderCard from "./components/ProviderCard";
import { addProvider } from "./features/providerSlice";

function App() {
  const [providerName, setProviderName] = useState("");
  const [providerDni, setProviderDni] = useState("");
  const [providerPhone, setProviderPhone] = useState("");

  const providers=useSelector(
    (state:RootState)=>state.providers.value
  )

  const dispatch=useDispatch();
  
  const handleAddProviders=()=>{
    if(!providerName&&!providerDni&&!providerPhone)return;
    dispatch(addProvider({
      id:(Math.random()*(1000)).toString(),
      name:providerName,
      dni:parseInt(providerDni),
      phone:parseInt(providerPhone)
      }))
      setProviderName("")
  }

  return (
    <div className="App">
      <h1>JEHISON GOD</h1>
      {providers.map((provider) => {
                return <ProviderCard 
                name={provider.name} 
                index={provider.id} 
                dni={provider.dni} 
                phone={provider.phone}/>
      })}
      <div className="reservation-input-container">

        <p>Nombre</p>
        <input
            value={providerName}
            onChange={(e)=>setProviderName(e.target.value)}
        />
        <p>DNI</p>
        <input
            value={providerDni}
            onChange={(e)=>setProviderDni(e.target.value)}
        />
        <p>Telefono</p>
        <input
            value={providerPhone}
            onChange={(e)=>setProviderPhone(e.target.value)}
        />
        <button onClick={handleAddProviders}>Add</button>
      </div>
    </div>
  )
}

export default App
