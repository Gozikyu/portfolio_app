import React, { useCallback, useState } from "react";
import { TextInput, PrimaryButton } from "../UIkit/index";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SignIn = (props) => {
  const history = useHistory();

  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");

  const signIn = () => {
    axios
      .post(
        process.env.REACT_APP_HOST + ":3001" + "/login",
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
        const createdId = response.data.user_id;
        console.log(createdId);
        props.login();
        history.push({ pathname: "/users/" + createdId });
      })
      .catch((error) => {
        console.log("registration error", error);
        alert("メールアドレスとパスワードの組み合わせが正しくありません。");
      });
  };

  const guestSignIn = () => {
    axios
      .post(
        process.env.REACT_APP_HOST + ":3001" + "/login",
        {
          user: {
            email: "guest@gmail.com",
            password: "password",
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("registration res", response);
        const createdId = response.data.user_id;
        console.log(createdId);
        props.login();
        history.push({ pathname: "/users/" + createdId });
      })
      .catch((error) => {
        console.log("registration error", error);
        alert(
          "ゲストアカウントでログインできませんでした。通信環境をご確認ください。"
        );
      });
  };

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
  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">ログイン</h2>
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
      <div className="guestAccount"></div>
      <div className="center">
        <PrimaryButton label={"ログインする"} onClick={() => signIn()} />
        <div className="module-spacer--medium" />
        <PrimaryButton
          label={"ゲストアカウントでログインする"}
          onClick={() => guestSignIn()}
        />
        <div className="help">
          <p onClick={() => history.push("/signup")}>
            アカウントをお持ちでない方はこちら
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
