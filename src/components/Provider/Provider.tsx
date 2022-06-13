
import {useState,useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import {RootState} from "../../app/store";
import ProviderCard from "../Provider/ProviderCard";
import {addProvider,getProviders} from "../../features/providerSlice";
import {postProvider,getAllProviders} from "../../actions/providerActions";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import LogOut from "../LogIn/LogOut";
function Provider() {
  const [providerName, setProviderName] = useState("");
  const [providerDni, setProviderDni] = useState("");
  const [providerPhone, setProviderPhone] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  type providerType = {
    idProvider: string,
    nameProvider: string;
    dniProvider: number;
    phoneProvider: number;
  }

  const providers=useSelector(
    (state:RootState)=>state.providers
  )

  const {user}=useSelector((state: RootState) => state.logged)
  const navigate=useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    getAllProviders().then((res)=>{
        dispatch(getProviders(res));
    });
    (user===null?navigate("/welcome"):navigate("/provider"));
  },[]);

  const handleAddProviders=()=>{
    if(!providerName&&!providerDni&&!providerPhone)return;
      postProvider(providerName,parseInt(providerDni),parseInt(providerPhone))
      .then((res)=>{
        dispatch(addProvider(res));
      })
      setProviderName("")
      setProviderDni("")
      setProviderPhone("")
      handleClose();
  }
  return (
    <div>
       <h1>PROVIDERS</h1>
       <Button variant="success" onClick={handleShow}>
        Create
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Provider</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={providerName}
                onChange={(e) => setProviderName(e.target.value)}
                type="text"
                placeholder="Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDNI">
              <Form.Label>DNI</Form.Label>
              <Form.Control
                value={providerDni}
                onChange={(e) => setProviderDni(e.target.value)}
                type="number"
                placeholder="DNI"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                value={providerPhone}
                onChange={(e) => setProviderPhone(e.target.value)}
                type="number"
                placeholder="Phone"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProviders}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>DNI</th>
            <th>Phone</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
        {providers.map((provider:providerType) => {
                return (
                <ProviderCard key={provider.idProvider}
                nameProvider={provider.nameProvider} 
                idProvider={provider.idProvider} 
                dniProvider={provider.dniProvider} 
                phoneProvider={provider.phoneProvider}
                />)
      })}
        </tbody>
      </Table>
      <LogOut/>
    </div>
  )
}

export default Provider
