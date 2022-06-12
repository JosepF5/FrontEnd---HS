import { auth } from "../../firebase/firebaseConfig";
import {
  signInWithPopup,
  GoogleAuthProvider,
  OAuthCredential,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { logInInReducer } from "../../features/loggedInSlice";
import { useNavigate } from "react-router-dom";

const providerGoogleAuth = new GoogleAuthProvider();

const GoogleLogIn: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signInWithGoogleButton = () => {
    signInWithPopup(auth, providerGoogleAuth)
      .then((result) => {
        const credential: OAuthCredential | null =
          GoogleAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
        const user = result.user;
        dispatch(logInInReducer(user));
        navigate("/welcome");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  return (
    <div>
      <button onClick={signInWithGoogleButton}>Log in with google</button>
    </div>
  );
};

export default GoogleLogIn;
