import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase/firebaseConfig";

const LogIn: React.FunctionComponent = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const logInForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (userName && password) {
      signInWithEmailAndPassword(auth, userName, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("**** user credentials ****");
          console.log(userCredential);
          console.log("**** user ***");
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("*** Log in error ***");
          console.log(errorMessage);
        });
      setPassword("");
      setUserName("");
    }
  };
  return (
    <div>
      <h1>Log In</h1>
      <form>
        <label htmlFor="username">Username</label>
        <br />
        <input
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          name="username"
          value={userName}
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          value={password}
        />
        <br />
        <button onClick={(e) => logInForm(e)}>Log In</button>
        <br />
      </form>
    </div>
  );
};

export default LogIn;
