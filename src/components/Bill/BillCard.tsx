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
}: billType) {
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
      <td>{idBill}</td>
      <td>{clientBill}</td>
      <td>{employeeBill}</td>
      <td>{dateBill}</td>
      <td>{paymentBill}</td>
      <td><Button onClick={() => handleBill()} variant="danger">Delete</Button></td>
    </tr>
  );
}

export default BillCard;
