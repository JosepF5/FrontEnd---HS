import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import ReceiptCard from "../Receipt/ReceiptCard";
import { addReceipt, getReceipts } from "../../features/receiptSlice";
import { postReceipt, getAllReceipts } from "../../actions/receiptActions";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { getProducts, updateProduct } from "../../features/productSlice";
import { getAllProducts, putProduct } from "../../actions/productActions";
import { getProviders } from "../../features/providerSlice";
import { getAllProviders } from "../../actions/providerActions";
import { useNavigate } from "react-router-dom";
import LogOut from "../LogIn/LogOut";

function Receipt() {
  const [receiptDate, setReceiptDate] = useState("");
  const [receiptNameProvider, setReceiptNameProvider] = useState("");
  const [receiptProduct, setReceiptProduct] = useState("");
  const [receiptAmount, setReceiptAmount] = useState("");
  const [show, setShow] = useState(false);
  const [receiptchecked, setChecked] = useState(true);
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

  type providerType = {
    idProvider: string;
    nameProvider: string;
    dniProvider: number;
    phoneProvider: number;
  };

  type receiptType = {
    idReceipt: string;
    dateReceipt: string;
    nameProviderReceipt: string;
    productReceipt: string;
    amountReceipt: number;
  };
  const products = useSelector((state: RootState) => state.products);
  const providers = useSelector((state: RootState) => state.providers);
  const receipts = useSelector((state: RootState) => state.receipts);
  
  const {user}=useSelector((state: RootState) => state.logged)
  const navigate=useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getAllReceipts().then((res) => {
      dispatch(getReceipts(res));
    });
    getAllProducts().then((res) => {
      dispatch(getProducts(res));
    });
    getAllProviders().then((res) => {
      dispatch(getProviders(res));
    });
    (user===null?navigate("/welcome"):navigate("/receipt"));
  }, []);

  const handleAddReceipts = () => {
    if (
      !receiptDate &&
      !receiptNameProvider &&
      !receiptProduct &&
      !receiptAmount
    )
      return;
    postReceipt(
      receiptDate,
      receiptNameProvider,
      receiptProduct,
      parseInt(receiptAmount)
    ).then((res) => {
      dispatch(addReceipt(res));
    });
    putProduct(
      tempProduct.idProduct,
      tempProduct.nameProduct,
      tempProduct.amountProduct + parseInt(receiptAmount),
      tempProduct.minAmountProduct,
      tempProduct.maxAmountProduct,
      tempProduct.providersProduct,
      tempProduct.descriptionProduct,
      tempProduct.priceProduct
    ).then((res) => {
      dispatch(updateProduct(res));
    });
    setReceiptDate("");
    setReceiptNameProvider("");
    setReceiptProduct("");
    setReceiptAmount("");
    handleClose();
  };

  const handleProductsRequest = (e: any, product: productType) => {
    if (
      e.target.value <= (product.maxAmountProduct-product.amountProduct) &&
      e.target.value &&
      e.target.value > 0
    ) {
      setChecked(false)
      setReceiptAmount(e.target.value)
      setTempProduct(product)
      console.log(tempProduct)
    } else {
      setChecked(true)
      setReceiptAmount('')
    }
  };
  return (
    <div>
      <h1>RECEIPTS</h1>
      <Button variant="success" onClick={handleShow}>
        Create
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Receipt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicMinAmount">
              <Form.Label>Date</Form.Label>
              <Form.Control
                value={receiptDate}
                onChange={(e) => setReceiptDate(e.target.value)}
                type="text"
                placeholder="Date"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Provider</Form.Label>
              <Form.Select
                id="disabledSelect"
                onChange={(e) => setReceiptNameProvider(e.target.value)}
              >
                {providers.map((provider: providerType) => (
                  <option
                    key={provider.idProvider}
                    value={provider.nameProvider}
                  >
                    {provider.nameProvider}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">Product</Form.Label>
              <Form.Select
                id="disabledSelect"
                onChange={(e) => setReceiptProduct(e.target.value)}
              >
                <option value="Default">Ninguno</option>
                {products.map((product: productType) => (
                  <option key={product.idProduct} value={product.nameProduct}>
                    {product.nameProduct}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {products
              .filter(
                (product: productType) => receiptProduct === product.nameProduct
              )
              .map((product: productType) => (
                <Form.Group className="mb-3" key={product.idProduct}>
                  <Form.Label>{product.nameProduct}</Form.Label>
                  <Form.Group>
                    <Form.Label>Price: {product.priceProduct}</Form.Label>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      (Currently {product.amountProduct}/
                      {product.maxAmountProduct})
                    </Form.Label>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Control
                      value={receiptAmount}
                      onChange={(e) => handleProductsRequest(e,product)}
                      type="number"
                      placeholder="Amount"
                    />
                  </Form.Group>
                </Form.Group>
              ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleAddReceipts}
            disabled={receiptchecked}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Provider</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map((receipt: receiptType) => {
            return (
              <ReceiptCard
                key={receipt.idReceipt}
                dateReceipt={receipt.dateReceipt}
                nameProviderReceipt={receipt.nameProviderReceipt}
                productReceipt={receipt.productReceipt}
                amountReceipt={receipt.amountReceipt}
                idReceipt={receipt.idReceipt}
              />
            );
          })}
        </tbody>
      </Table>
      <LogOut/>
    </div>
  );
}

export default Receipt;
