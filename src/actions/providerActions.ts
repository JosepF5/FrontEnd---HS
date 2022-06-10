const getAllProviders = async ()=>{
    const response = await fetch(`http://localhost:8080/get/providers`)
    const data = await response.json()
    return data
}
  
  const postProvider = async (provider:string) => {
    const response = await fetch(`http://localhost:8081/api/v1/save/provider`,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(provider)
    })
    const data = await response.json();
    return data
  }
  
  const deleteProviderBack = async (id:string) => {
    const response = await fetch(`http://localhost:8081/api/v1/delete/provider/${id}`,
    {
      method: 'DELETE'
    })
    return response
  }
  
  
  export {getAllProviders, postProvider, deleteProviderBack}