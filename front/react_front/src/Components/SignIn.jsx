import React, { useCallback, useState } from "react";
import { TextInput, PrimaryButton } from "./UIkit/index";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { signIn } from "../reducks/users/operations";
// import { push } from "connected-react-router";

const SignIn = (props) => {
  //   const dispatch = useDispatch();
  //   const selector = useSelector((state) => state);

  const history = useHistory();

  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );
  console.log("signin");
  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">SIGN IN</h2>
      <div className="module-spacer--medium" />
      <TextInput
        fullWidth={true}
        label={"メールアドレス"}
        multiline={false}
        rows={1}
        required={true}
        value={email}
        type={"email"}
        onChange={inputEmail}
      />
      <TextInput
        fullWidth={true}
        label={"パスワード"}
        multiline={false}
        rows={1}
        required={true}
        value={password}
        type={"password"}
        onChange={inputPassword}
      />
      <div className="guestAccount">
        <h3>ゲストアカウント</h3>
        <p>メールアドレス: guest@gmail.com</p>
        <p>パスワード: password</p>
      </div>
      <div className="module-spacer--medium" />

      <div className="center">
        {/* <PrimaryButton
          label={"Sign in"}
          onClick={() => dispatch(signIn(email, password))}
        />
 */}
        <PrimaryButton
          label={"ログインする"}
          onClick={
            () =>
              axios
                .post(
                  "http://localhost:3001/login",
                  {
                    user: {
                      email: email,
                      password: password,
                    },
                  },
                  { withCredentials: true }
                )
                .then((response) => {
                  console.log("registration res", response);
                  const createdId = response.data.id;
                  console.log(createdId);
                  props.login();
                  history.push({ pathname: "/users/" + createdId });
                })
                .catch((error) => {
                  console.log("registration error", error);
                  alert(
                    "メールアドレスとパスワードの組み合わせが正しくありません。"
                  );
                })
            // event.preventDefault()
          }
        />

        <div className="module-spacer--medium" />
        <div className="help">
          {/* <p onClick={() => dispatch(push("/signup"))}>
            アカウントをお持ちでない方はこちら
          </p>
          <p onClick={() => dispatch(push("/signin/reset"))}>
            パスワードを忘れた方はこちら
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
