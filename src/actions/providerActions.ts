const getAllProviders = async ()=>{
    const response = await fetch(`https://don-rauls.herokuapp.com/get/providers`)
    const data = await response.json()
    return data
}
  
const postProvider = async (
    nameProvider: string,
    dniProvider: number,
    phoneProvider: number) => {

  const response = await fetch(`https://don-rauls.herokuapp.com/create/provider`,
  {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
        nameProvider,
        dniProvider,
        phoneProvider,
    })
  })
  const data = await response.json();
  return data
}

const removeProvider = async (idProvider: string) => {
    const response = await fetch(`https://don-rauls.herokuapp.com/delete/provider/${idProvider}`,
    {
        method:'DELETE'
    })
    return response.ok
}

export {getAllProviders, postProvider, removeProvider}