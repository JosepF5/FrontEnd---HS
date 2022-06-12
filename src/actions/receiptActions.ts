const getAllReceipts = async ()=>{
    const response = await fetch(`https://don-rauls.herokuapp.com/get/receipts`)
    const data = await response.json()
    return data
}
  
const postReceipt = async (
    dateReceipt: string,
    nameProviderReceipt: string,
    productReceipt: string,
    amountReceipt: number) => {

  const response = await fetch(`https://don-rauls.herokuapp.com/create/receipt`,
  {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
        dateReceipt,
        nameProviderReceipt,
        productReceipt,
        amountReceipt
    })
  })
  const data = await response.json();
  return data
}

const removeReceipt = async (idReceipt: string) => {
    const response = await fetch(`https://don-rauls.herokuapp.com/delete/receipt/${idReceipt}`,
    {
        method:'DELETE'
    })
    return response.ok
}

export {getAllReceipts, postReceipt, removeReceipt}