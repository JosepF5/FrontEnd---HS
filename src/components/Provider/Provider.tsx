
import React, { useState,useContext,useEffect  } from "react";
import { useSelector,useDispatch } from "react-redux";
import { RootState,AppDispatch,stateType  } from "../../app/store";
import ProviderCard from "../Provider/ProviderCard";
import { addProvider,
   getProviders} from "../../features/providerSlice";
import { postProvider,getAllProviders } from "../../actions/providerActions";
 


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
    (state:stateType)=>state.providers
  )
  /*
  const postsStatus=useSelector(getProviderStatus);
  const error=useSelector(getProviderError);*/
  const dispatch=useDispatch();

  useEffect(()=>{
    getAllProviders().then((res)=>{
        dispatch(getProviders(res));
    }
    )
  }
  ,[]);

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
  /*
  const data=getAllProviders();
  console.log(data.then(res=>
    res.data.map((provider:any)=>{
        return {
            id:provider.id,
            name:provider.name,
            dni:provider.dni,
            phone:provider.phone
        }
        }
    )));
  console.log(providers);*/
  return (
    <div>
       <h1>JEHISON GOD</h1>
      {providers.map((provider:providerType) => {
                return (
                <ProviderCard key={provider.idProvider}
                nameProvider={provider.nameProvider} 
                idProvider={provider.idProvider} 
                dniProvider={provider.dniProvider} 
                phoneProvider={provider.phoneProvider}/>)
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
