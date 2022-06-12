import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import BillCard from "../Bill/BillCard";
import { addBill, getBills } from "../../features/billSlice";
import { postBill, getAllBills } from "../../actions/billActions";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { getProducts } from "../../features/productSlice";
import { getAllProducts } from "../../actions/productActions";
function Bill() {
  const [billDate, setBillDate] = useState("");
  const [billClient, setBillClient] = useState("");
  const [billEmployee, setBillEmployee] = useState("");
  const [billProducts, setBillProducts] = useState<productType[]>([]);
  const [billPayment, setBillPayment] = useState("");
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  type productType = {
    idProduct: string;
    nameProduct: string;
    amountProduct: number;
    minAmountProduct: number;
    maxAmountProduct: number;
    providersProduct: string;
    descriptionProduct: string;
    priceProduct: number;
  };

  type billType = {
    idBill: string;
    dateBill: string;
    clientBill: string;
    employeeBill: string;
    productsBill: productType[];
    paymentBill: number;
  };
  const products = useSelector((state: RootState) => state.products);
  const bills = useSelector((state: RootState) => state.bills);

  const dispatch = useDispatch();

  useEffect(() => {
    getAllBills().then((res) => {
      dispatch(getBills(res));
    });
    getAllProducts().then((res) => {
      dispatch(getProducts(res));
    });
  }, []);

  const handleAddBills = () => {
    if (
      !billDate &&
      !billClient &&
      !billEmployee &&
      !billProducts &&
      !billPayment
    )
      return;
    postBill(
      billDate,
      billClient,
      billEmployee,
      billProducts,
      parseInt(billPayment)
    ).then((res) => {
      dispatch(addBill(res));
    });
    setBillDate("");
    setBillClient("");
    setBillEmployee("");
    setBillProducts([]);
    setBillPayment("");
    handleClose();
  };
  return (
    <div>
      <h1>BILLS</h1>
      <Button variant="success" onClick={handleShow}>
        Create
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicMinAmount">
              <Form.Label>Date</Form.Label>
              <Form.Control
                value={billDate}
                onChange={(e) => setBillDate(e.target.value)}
                type="text"
                placeholder="Date"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicMaxAmount">
              <Form.Label>Client</Form.Label>
              <Form.Control
                value={billClient}
                onChange={(e) => setBillClient(e.target.value)}
                type="text"
                placeholder="Client"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Employee</Form.Label>
              <Form.Control
                value={billEmployee}
                onChange={(e) => setBillEmployee(e.target.value)}
                type="text"
                placeholder="Employee"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Payment</Form.Label>
              <Form.Control
                value={billPayment}
                onChange={(e) => setBillPayment(e.target.value)}
                type="number"
                placeholder="Payment"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Product</Form.Label>
              <Form.Select
                id="disabledSelect"
                onChange={(e) => {
                  setBillProducts((prevProducts) => [...prevProducts]);
                }}
              >
                {products.map((product: productType) => (
                  <option key={product.idProduct} value={product.nameProduct}>
                    {product.nameProduct}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              {products.map((product: productType) => (
                <Form.Check
                  type={"checkbox"}
                  id={`default-checkbox`}
                  label={product.nameProduct}
                  key={product.idProduct}
                  onChange={(e) => setChecked(checked!)}
                />
              ))}
            </Form.Group>
            <Form.Group className="mb-3">{}</Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddBills}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Client</th>
            <th>Employee</th>
            <th>Date</th>
            <th>Products</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill: billType) => {
            return (
              <BillCard
                key={bill.idBill}
                dateBill={bill.dateBill}
                clientBill={bill.clientBill}
                employeeBill={bill.employeeBill}
                productsBill={bill.productsBill}
                paymentBill={bill.paymentBill}
                idBill={bill.idBill}
              />
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Bill;
