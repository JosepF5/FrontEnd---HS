import { productType } from "../features/productSlice";

const getAllBills = async ()=>{
    const response = await fetch(`https://don-rauls.herokuapp.com/get/bills`)
    const data = await response.json()
    return data
}
  
const postBill = async (
    dateBill: string,
    clientBill: string,
    employeeBill: string,
    productsBill: productType[],
    paymentBill: number,) => {

  const response = await fetch(`https://don-rauls.herokuapp.com/create/bill`,
  {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
        dateBill,
        clientBill,
        employeeBill,
        productsBill,
        paymentBill,
    })
  })
  const data = await response.json();
  return data
}

const removeBill = async (idBill: string) => {
    const response = await fetch(`https://don-rauls.herokuapp.com/delete/bill/${idBill}`,
    {
        method:'DELETE'
    })
    return response.ok
}

export {getAllBills, postBill,removeBill}