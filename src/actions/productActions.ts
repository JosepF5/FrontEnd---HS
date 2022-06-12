const getAllProducts = async ()=>{
    const response = await fetch(`https://don-rauls.herokuapp.com/get/products`)
    const data = await response.json()
    return data
}
  
const postProduct = async (
    nameProduct: string,
    amountProduct: number,
    minAmountProduct: number,
    maxAmountProduct: number,
    providersProduct: string,
    descriptionProduct: string,
    priceProduct: number) => {

  const response = await fetch(`https://don-rauls.herokuapp.com/create/product`,
  {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
        nameProduct,
        amountProduct,
        minAmountProduct,
        maxAmountProduct,
        providersProduct,
        descriptionProduct,
        priceProduct
    })
  })
  const data = await response.json();
  return data
}

const removeProduct = async (idProduct: string) => {
    const response = await fetch(`https://don-rauls.herokuapp.com/delete/product/${idProduct}`,
    {
        method:'DELETE'
    })
    return response.ok
}

const putProduct = async (idProduct: string,
    nameProduct: string,
    amountProduct: number,
    minAmountProduct: number,
    maxAmountProduct: number,
    providersProduct: string,
    descriptionProduct: string,
    priceProduct: number) => {
  const response = await fetch(`https://don-rauls.herokuapp.com/update/product/${idProduct}`,
  {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      nameProduct,
      amountProduct,
      minAmountProduct,
      maxAmountProduct,
      providersProduct,
      descriptionProduct,
      priceProduct
  })
  })
  const data = await response.json()
  return data
}

export {getAllProducts, postProduct,removeProduct,putProduct}