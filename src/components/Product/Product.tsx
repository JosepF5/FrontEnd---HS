import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import ProductCard from "../Product/ProductCard";
import { addProduct, getProducts } from "../../features/productSlice";
import { postProduct, getAllProducts } from "../../actions/productActions";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {getProviders} from "../../features/providerSlice";
import {getAllProviders} from "../../actions/providerActions";
import { useNavigate } from "react-router-dom";
import LogOut from "../LogIn/LogOut";
function Product() {
  const [productName, setProductName] = useState("");
  const [productAmount, setProductAmount] = useState("");
  const [productMinAmount, setProductMinAmount] = useState("");
  const [productMaxAmount, setProductMaxAmount] = useState("");
  const [productProvider, setProductProvider] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [show, setShow] = useState(false);

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
    idProvider: string,
    nameProvider: string;
    dniProvider: number;
    phoneProvider: number;
  }
  const providers = useSelector((state: RootState) => state.providers);
  const products = useSelector((state: RootState) => state.products);
  
  const {user}=useSelector((state: RootState) => state.logged)
  const navigate=useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getAllProducts().then((res) => {
      dispatch(getProducts(res));
    });
    getAllProviders().then((res)=>{
      dispatch(getProviders(res));
    });
    (user===null?navigate("/welcome"):navigate("/product"));
  }, []);

  const handleAddProducts = () => {
    if (
      !productName &&
      !productAmount &&
      !productMinAmount &&
      !productMaxAmount &&
      !productProvider &&
      !productDescription &&
      !productPrice
    )
      return;
    postProduct(
      productName,
      parseInt(productAmount),
      parseInt(productMinAmount),
      parseInt(productMaxAmount),
      productProvider,
      productDescription,
      parseInt(productPrice)
    ).then((res) => {
      dispatch(addProduct(res));
    });
    setProductName("");
    setProductAmount("");
    setProductMinAmount("");
    setProductMaxAmount("");
    setProductProvider("");
    setProductDescription("");
    setProductPrice("");
    handleClose();
  };
  return (
    <div>
      <h1>PRODUCTS</h1>
      <Button variant="success" onClick={handleShow}>
        Create
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                type="text"
                placeholder="Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                value={productAmount}
                onChange={(e) => setProductAmount(e.target.value)}
                type="number"
                placeholder="Amount"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicMinAmount">
              <Form.Label>Minimun Amount</Form.Label>
              <Form.Control
                value={productMinAmount}
                onChange={(e) => setProductMinAmount(e.target.value)}
                type="number"
                placeholder="Minimun Amount"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicMaxAmount">
              <Form.Label>Maximum Amount</Form.Label>
              <Form.Control
                value={productMaxAmount}
                onChange={(e) => setProductMaxAmount(e.target.value)}
                type="number"
                placeholder="Maximum Amount"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                type="text"
                placeholder="Description"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                type="number"
                placeholder="Price"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">
                Provider
              </Form.Label>
              <Form.Select id="disabledSelect" onChange={(e) => setProductProvider(e.target.value)}>
              {providers.map((provider: providerType) => 
              <option key={provider.idProvider}>{provider.nameProvider}</option>
              )}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProducts}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Provider</th>
            <th>Price</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: productType) => {
            return (
              <ProductCard
                key={product.idProduct}
                nameProduct={product.nameProduct}
                amountProduct={product.amountProduct}
                minAmountProduct={product.minAmountProduct}
                maxAmountProduct={product.maxAmountProduct}
                providersProduct={product.providersProduct}
                descriptionProduct={product.descriptionProduct}
                priceProduct={product.priceProduct}
                idProduct={product.idProduct}
              />
            );
          })}
        </tbody>
      </Table>
      <LogOut/>
    </div>
  );
}

export default Product;
