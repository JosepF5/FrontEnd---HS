import { addProvider } from "../features/providerSlice"

interface Provider {
    idProvider: string;
    nameProvider: string;
    dniProvider: number;
    phoneProvider: number;
}


const getAllProviders = async ()=>{
    const response = await fetch(`http://localhost:8080/get/providers`)
    const data = await response.json()
    console.log(data)
    return data
}
  
const postProvider = async (
    nameProvider: string,
    dniProvider: number,
    phoneProvider: number,dispatch: any) => {

  const provider={
      nameProvider,
      dniProvider,
      phoneProvider,
  }
  const response = await fetch(`http://localhost:8080/create/provider`,
  {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(provider)
  })
  const data = await response.json();
  dispatch(addProvider(data))
}
  
  
  export {getAllProviders, postProvider}