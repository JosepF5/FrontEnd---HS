
import {useState,useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import {RootState} from "../../app/store";
import ProviderCard from "../Provider/ProviderCard";
import {addProvider,getProviders} from "../../features/providerSlice";
import {postProvider,getAllProviders} from "../../actions/providerActions";

function Provider() {
  const [providerName, setProviderName] = useState("");
  const [providerDni, setProviderDni] = useState("");
  const [providerPhone, setProviderPhone] = useState("");

  type providerType = {
    idProvider: string,
    nameProvider: string;
    dniProvider: number;
    phoneProvider: number;
  }

  const providers=useSelector(
    (state:RootState)=>state.providers
  )

  const dispatch=useDispatch();

  useEffect(()=>{
    getAllProviders().then((res)=>{
        dispatch(getProviders(res));
    }
    )
  },[]);

  const handleAddProviders=()=>{
    if(!providerName&&!providerDni&&!providerPhone)return;
      postProvider(providerName,parseInt(providerDni),parseInt(providerPhone))
      .then((res)=>{
        dispatch(addProvider(res));
      })
      setProviderName("")
      setProviderDni("")
      setProviderPhone("")
  }
  return (
    <div>
       <h1>PROVIDERS</h1>
      {providers.map((provider:providerType) => {
                return (
                <ProviderCard key={provider.idProvider}
                nameProvider={provider.nameProvider} 
                idProvider={provider.idProvider} 
                dniProvider={provider.dniProvider} 
                phoneProvider={provider.phoneProvider}
                />)
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

export default Provider
