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
import { getProducts,updateProduct } from "../../features/productSlice";
import { getAllProducts,putProduct } from "../../actions/productActions";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
function Bill() {
  const [billDate, setBillDate] = useState("");
  const [billClient, setBillClient] = useState("");
  const [billEmployee, setBillEmployee] = useState("");
  const [billProducts, setBillProducts] = useState<productType[]>([]);
  const [billPayment, setBillPayment] = useState("");
  const [show, setShow] = useState(false);
  const [billchecked, setChecked] = useState(true);
  const [prodName, setProdName] = useState("");
  const [prodRequest, setProdRequest] = useState("");
  const [tempProduct, setTempProduct] = useState<productType>({
    idProduct: "",
    nameProduct: "",
    amountProduct: 0,
    minAmountProduct: 0,
    maxAmountProduct: 0,
    providersProduct: "",
    descriptionProduct: "",
    priceProduct: 0,
  });
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
  const {user}=useSelector((state: RootState) => state.logged)
  const navigate=useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getAllBills().then((res) => {
      dispatch(getBills(res));
    });
    getAllProducts().then((res) => {
      dispatch(getProducts(res));
    });
    (user===null?navigate("/welcome"):navigate("/bill"));
  }, []);

  const handleAddBills = () => {
    if (
      !billDate &&
      !billClient &&
      !billEmployee &&
      !billProducts &&
      !billPayment
    )return;
    postBill(
      billDate,
      billClient,
      billEmployee,
      billProducts,
      parseInt(billPayment)
    ).then((res) => {
      dispatch(addBill(res));
    });
    putProduct(
      tempProduct.idProduct,
      tempProduct.nameProduct,
      tempProduct.amountProduct-parseInt(prodRequest),
      tempProduct.minAmountProduct,
      tempProduct.maxAmountProduct,
      tempProduct.providersProduct,
      tempProduct.descriptionProduct,
      tempProduct.priceProduct,
    ).then((res) => {
      dispatch(updateProduct(res));
    })
    setBillDate("");
    setBillClient("");
    setBillEmployee("");
    setBillPayment("");
    setProdRequest("");
    setBillProducts([]);
    handleClose();
  };

  const handleProductsRequest = (e: any,product:productType) => {
    console.log(e.target.value)
    if(e.target.value<=product.amountProduct&&e.target.value&&e.target.value>0){
      setChecked(false)
      setBillPayment((e.target.value*product.priceProduct).toString())
      setTempProduct(product)
      setBillProducts([tempProduct])
      //console.log(product)
      //console.log(tempProduct)
      console.log(billProducts)
    }
    else{
      setChecked(true)
      setBillPayment('')
    }
    setProdRequest(e.target.value)
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
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Product</Form.Label>
              <Form.Select id="disabledSelect" onChange={(e) => setProdName(e.target.value)}>
                <option value="Default">Ninguno</option>
                {products.map((product: productType) => (
                  <option key={product.idProduct} value={product.nameProduct}>
                    {product.nameProduct}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {products.filter(
                (product: productType) => prodName === product.nameProduct
              )
              .map((product: productType) => (
                <Form.Group className="mb-3" key={product.idProduct}>
                  <Form.Label>{product.nameProduct}</Form.Label>
                  <Form.Group>
                  <Form.Label>Price: {product.priceProduct}</Form.Label>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>(Currently {product.amountProduct}/{product.maxAmountProduct})</Form.Label>
                  </Form.Group>
                  <Row>
                    <Col>
                    <Form.Control
                    value={prodRequest}
                    onChange={(e)=>handleProductsRequest(e,product)}
                    type="number"
                    placeholder="Amount of products you want to buy"
                    />
                    </Col>
                  </Row>
                  
                </Form.Group>
              ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddBills} disabled={billchecked}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Client</th>
            <th>Employee</th>
            <th>Product</th>
            <th>Payment</th>
            <th>Delete</th>
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
