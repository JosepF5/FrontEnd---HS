import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firebaseConfig";

function SignIn() {
    
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const signInForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (password && userName) {
      createUserWithEmailAndPassword(auth, userName, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("****user****");
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("*** sign in error ***");
          console.log(errorMessage);
        });

      setUserName("");
      setPassword("");
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
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
        <button onClick={(e) => signInForm(e)}>Sign in</button>
        <br />
      </form>
    </div>
  );
}

export default SignIn;
