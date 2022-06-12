import { useDispatch } from "react-redux";
import { receiptType } from "../../features/receiptSlice";
import { deleteReceipt } from "../../features/receiptSlice";
import { removeReceipt } from "../../actions/receiptActions";
import Button from 'react-bootstrap/Button';
function ReceiptCard({
  dateReceipt,
  nameProviderReceipt,
  productReceipt,
  amountReceipt,
  idReceipt,
}: receiptType,amount:number) {
  const dispatch = useDispatch();

  const handleReceipt = async () => {
    removeReceipt(`${idReceipt}`).then((res) => {
      if (res) {
        dispatch(deleteReceipt(idReceipt));
      }
    });
  };
  return (
    <tr>
      <td>{dateReceipt}</td>
      <td>{nameProviderReceipt}</td>
      <td>{productReceipt}</td>
      <td>{amountReceipt}</td>
      <td><Button onClick={() => handleReceipt()} variant="danger">Delete</Button></td>
    </tr>
  )
}

export default ReceiptCard
