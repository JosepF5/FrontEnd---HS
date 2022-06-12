import { auth } from "../../firebase/firebaseConfig";
import { signInWithPopup, GoogleAuthProvider, OAuthCredential } from "firebase/auth";
import { useDispatch } from "react-redux";
import { logInInReducer } from "../../features/loggedInSlice";
import { useNavigate } from "react-router-dom";

const providerGoogleAuth = new GoogleAuthProvider();

const GoogleLogIn: React.FunctionComponent = () => {
  return (
    <div>
      
    </div>
  )
}

export default GoogleLogIn
