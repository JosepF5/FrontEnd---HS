const getAllProducts = async ()=>{
    const response = await fetch(`http://localhost:8080/get/products`)
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

  const response = await fetch(`http://localhost:8080/create/product`,
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
    const response = await fetch(`http://localhost:8080/delete/product/${idProduct}`,
    {
        method:'DELETE'
    })
    return response.ok
}

export {getAllProducts, postProduct,removeProduct}