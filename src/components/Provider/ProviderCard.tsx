import {useDispatch} from "react-redux";
import {providerType} from '../../features/providerSlice'
import {deleteProvider} from "../../features/providerSlice";
import {removeProvider} from "../../actions/providerActions";
import Button from 'react-bootstrap/Button';
function ProviderCard({nameProvider,
  idProvider,
  dniProvider,
  phoneProvider}:providerType) {

  const dispatch = useDispatch()
  const handleProvider = async () =>{
    removeProvider(`${idProvider}`).then((res)=>{
      if (res){
        dispatch(deleteProvider(idProvider))
      }
  })}

  return (
    <tr>
    <td>{nameProvider}</td>
    <td>{dniProvider}</td>
    <td>{phoneProvider}</td>
    <td><Button onClick={() => handleProvider()} variant="danger">Delete</Button></td>
    </tr>
  )
}

export default ProviderCard
