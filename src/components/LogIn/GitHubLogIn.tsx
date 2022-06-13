import { auth } from "../../firebase/firebaseConfig";
import {
  signInWithPopup,
  GithubAuthProvider,
  OAuthCredential,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { logInInReducer } from "../../features/loggedInSlice";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const providerGithubAuth = new GithubAuthProvider();

const GitHubLogIn: React.FunctionComponent = () =>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const signInWithGithubButton = () => {
    signInWithPopup(auth, providerGithubAuth)
      .then((result) => {
        const credential: OAuthCredential | null =
        GithubAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
        const user = result.user;
        dispatch(logInInReducer(user));
        navigate("/welcome");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GithubAuthProvider.credentialFromError(error);
      });
  };
  return (
    <div>
      <Button variant="primary" onClick={signInWithGithubButton}>
      Github
      </Button>
    </div>
  )
}

export default GitHubLogIn
