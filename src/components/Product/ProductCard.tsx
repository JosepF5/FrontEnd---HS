import {useDispatch} from "react-redux";
import {productType} from '../../features/productSlice'
import {deleteProduct} from "../../features/productSlice";
import {removeProduct} from "../../actions/productActions";
function ProductCard({nameProduct,
  amountProduct,
  minAmountProduct,
  maxAmountProduct,
  providersProduct,
  descriptionProduct,
  idProduct,
  priceProduct}:productType) {

  const dispatch = useDispatch()

  const handleProduct = async () =>{
    removeProduct(`${idProduct}`).then((res)=>{
      if (res){
        dispatch(deleteProduct(idProduct))
      }
  })}

  return (
    <div>
        <h5>{nameProduct}</h5>
        <h5>{amountProduct}</h5>
        <h5>{minAmountProduct}</h5>
        <h5>{maxAmountProduct}</h5>
        <h5>{providersProduct}</h5>
        <h5>{descriptionProduct}</h5>
        <h5>{priceProduct}</h5>
        <button onClick={() => handleProduct()}>DELETE</button>
    </div>
  )
}

export default ProductCard
