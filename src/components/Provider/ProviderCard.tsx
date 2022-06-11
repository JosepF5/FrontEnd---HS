import {useDispatch} from "react-redux";
import {providerType} from '../../features/providerSlice'
import {deleteProvider} from "../../features/providerSlice";
import {removeProvider} from "../../actions/providerActions";
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
    <div>
        <h5>{nameProvider}</h5>
        <h5>{dniProvider}</h5>
        <h5>{phoneProvider}</h5>
        <button onClick={() => handleProvider()}>DELETE</button>
    </div>
  )
}

export default ProviderCard
