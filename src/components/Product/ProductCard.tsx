import { useDispatch } from "react-redux";
import { productType } from "../../features/productSlice";
import { deleteProduct } from "../../features/productSlice";
import { removeProduct } from "../../actions/productActions";
import Button from 'react-bootstrap/Button';
function ProductCard({
  nameProduct,
  amountProduct,
  minAmountProduct,
  maxAmountProduct,
  providersProduct,
  descriptionProduct,
  idProduct,
  priceProduct,
}: productType) {
  const dispatch = useDispatch();

  const handleProduct = async () => {
    removeProduct(`${idProduct}`).then((res) => {
      if (res) {
        dispatch(deleteProduct(idProduct));
      }
    });
  };

  return (
    <tr>
      <td>{idProduct}</td>
      <td>{nameProduct}</td>
      {amountProduct<=minAmountProduct?<td style={{color:'red'}}>{amountProduct}</td>:<td style={{color:'green'}}>{amountProduct}</td>}
      <td>{providersProduct}</td>
      <td>{priceProduct}</td>
      <td><Button onClick={() => handleProduct()} variant="danger">Delete</Button></td>
    </tr>
  );
}

export default ProductCard;
