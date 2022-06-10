
import React, { useState,useContext,useEffect  } from "react";
import { useSelector,useDispatch } from "react-redux";
import logo from './logo.svg'
import './App.css'
import { RootState } from "./app/store";
import ProviderCard from "./components/ProviderCard";
import { addProvider } from "./features/providerSlice";
import { postProvider,getAllProviders } from "./actions/providerActions";

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
    /*
    dispatch(addProvider({
      id:(Math.random()*(1000)).toString(),
      name:providerName,
      dni:parseInt(providerDni),
      phone:parseInt(providerPhone)
      }))
    */
      postProvider(providerName,parseInt(providerDni),parseInt(providerPhone),dispatch)
      setProviderName("")
      setProviderDni("")
      setProviderPhone("")
  }
  const data=getAllProviders();
  console.log(data);
  console.log(providers);
  
  return (
    <div className="App">
      <h1>JEHISON GOD</h1>
      {providers.map((provider) => {
                return <ProviderCard 
                nameProvider={provider.name} 
                idProvider={provider.id} 
                dniProvider={provider.dni} 
                phoneProvider={provider.phone}/>
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
