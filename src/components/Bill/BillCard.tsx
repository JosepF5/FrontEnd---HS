import { useDispatch } from "react-redux";
import { billType } from "../../features/billSlice";
import { deleteBill } from "../../features/billSlice";
import { removeBill } from "../../actions/billActions";
import Button from 'react-bootstrap/Button';
function BillCard({
  dateBill,
  clientBill,
  employeeBill,
  productsBill,
  idBill,
  paymentBill,
}: billType,amount:number) {
  const dispatch = useDispatch();

  const handleBill = async () => {
    removeBill(`${idBill}`).then((res) => {
      if (res) {
        dispatch(deleteBill(idBill));
      }
    });
  };

  return (
    <tr>
      <td>{clientBill}</td>
      <td>{employeeBill}</td>
      <td>{productsBill.map((product) =>
        <div key={product.idProduct}>
          {product.nameProduct}
          <br />
        </div>
      )}</td>
      <td>{paymentBill}</td>
      <td><Button onClick={() => handleBill()} variant="danger">Delete</Button></td>
    </tr>
  );
}

export default BillCard;
