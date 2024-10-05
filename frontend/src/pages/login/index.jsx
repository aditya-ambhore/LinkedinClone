import UserLayout from "@/layout/UserLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";
import { loginUser, registerUser } from "@/config/redux/action/authAction";
import { emptyMessage } from "@/config/redux/reducer/authReducer";

function LoginComponent() {
  const authState = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch(); // Fixed typo: dispath -> dispatch
  const [isLoginMethod, setIsLoginMethod] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  // useEffect(() => {
  //   if (authState.loggedIn) {
  //     router.push("/dashboard");
  //   }
  // }, [authState.loggedIn]);

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     router.push("/dashboard");
  //   }
  // }, []);

  // useEffect(() => {
  //   dispatch(emptyMessage());
  // }, [isLoginMethod]);

  useEffect(() => {
    if (authState.loggedIn) {
      router.push("/dashboard");
    }
  }, [authState, router]);

  const handleRegister = () => {
    console.log("Register");
    dispatch(registerUser({ username, password, email, name }));
  };
  const handleLogin = () => {
    console.log("Login");
    dispatch(loginUser({ email, password }));
  };

  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          <div className={styles.cardContainer_left}>
            <p className={styles.cardleft_heading}>
              {isLoginMethod ? "Sign In" : "Sign Up"}
            </p>

            <p style={{ color: authState?.isError ? "red" : "green" }}>
              {authState.message}
            </p>

            <div className={styles.inputContainers}>
              {!isLoginMethod && (
                <div className={styles.inputRow}>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.inputField}
                    type="text"
                    placeholder="Username"
                  />
                  {!isLoginMethod && (
                    <input
                      onChange={(e) => setName(e.target.value)}
                      className={styles.inputField}
                      type="text"
                      placeholder="Name"
                    />
                  )}
                </div>
              )}
              <input
                onChange={(e) => setEmail(e.target.value)}
                className={styles.inputField}
                type="email"
                placeholder="Email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className={styles.inputField}
                type="password"
                placeholder="Password"
              />
              <div
                onClick={() => {
                  if (isLoginMethod) {
                    handleLogin();
                  } else {
                    handleRegister();
                  }
                }}
                className={styles.buttonWithOutline}
              >
                <p>{isLoginMethod ? "Sign In" : "Sign Up"}</p>
              </div>
            </div>
          </div>

          <div className={styles.cardContainer_right}>
            {isLoginMethod ? (
              <p>Don't Have an Account </p>
            ) : (
              <p>Already Have an Account</p>
            )}

            <div
              onClick={() => {
                setIsLoginMethod(!isLoginMethod);
              }}
              style={{ color: "black", textAlign: "center" }}
              className={styles.buttonWithOutline}
            >
              <p>{isLoginMethod ? "Sign Up" : "Sign In"}</p>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
export default LoginComponent;

// import UserLayout from "@/layout/UserLayout";
// import { useRouter } from "next/router";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import styles from "./style.module.css";
// import { loginUser, registerUser } from "@/config/redux/action/authAction";

// function LoginComponent() {
//   const authState = useSelector((state) => state.auth);
//   const router = useRouter();
//   const dispatch = useDispatch(); // Fixed typo: dispath -> dispatch
//   const [isLoginMethod, setIsLoginMethod] = useState(false);
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     if (authState.loggedIn) {
//       router.push("/dashboard");
//     }
//   }, [authState, router]);

//   const handleRegister = () => {
//     console.log("Register");
//     dispatch(registerUser({ username, password, email, name })); // Fixed dispatch typo
//   };
//   const handleLogin = () => {
//     console.log("Login");
//     dispatch(loginUser({ email, password })); // Added login handler
//   };

//   return (
//     <UserLayout>
//       <div className={styles.container}>
//         <div className={styles.cardContainer}>
//           <div className={styles.cardContainer_left}>
//             <p className={styles.cardleft_heading}>
//               {isLoginMethod ? "Sign In" : "Sign Up"}
//             </p>

//             <p style={{ color: authState?.isError ? "red" : "green" }}>
//               {authState.message.message}
//             </p>

//             <div className={styles.inputContainers}>
//               <div className={styles.inputRow}>
//                 <input
//                   onChange={(e) => setUsername(e.target.value)}
//                   className={styles.inputField}
//                   type="text"
//                   placeholder="Username"
//                 />
//                 {!isLoginMethod && (
//                   <input
//                     onChange={(e) => setName(e.target.value)}
//                     className={styles.inputField}
//                     type="text"
//                     placeholder="Name"
//                   />
//                 )}
//               </div>
//               <input
//                 onChange={(e) => setEmail(e.target.value)}
//                 className={styles.inputField}
//                 type="email"
//                 placeholder="Email"
//               />
//               <input
//                 onChange={(e) => setPassword(e.target.value)}
//                 className={styles.inputField}
//                 type="password"
//                 placeholder="Password"
//               />
//               <div
//                 onClick={() => {
//                   if (isLoginMethod) {
//                     handleLogin(); // Added login functionality
//                   } else {
//                     handleRegister();
//                   }
//                 }}
//                 className={styles.buttonWithOutline}
//               >
//                 <p>{isLoginMethod ? "Sign In" : "Sign Up"}</p>
//               </div>
//             </div>
//           </div>
//           <div className={styles.cardContainer_right}></div>
//         </div>
//       </div>
//     </UserLayout>
//   );
// }
// export default LoginComponent;
