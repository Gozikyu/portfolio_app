import React, { useCallback, useState } from "react";
import { TextInput, PrimaryButton } from "../UIkit/index";
import axios from "axios";
import { useHistory } from "react-router-dom";
import SignIn from "./SignIn";

const SignUp = (props) => {
  const history = useHistory();

  const [username, setUsername] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [confirmPassword, setConfirmPassword] = useState("");

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
        const createdId = response.data.id;
        console.log(createdId);
        props.login();
        history.push({ pathname: "/users/" + createdId });
      })
      .catch((error) => {
        console.log("registration error", error);
        alert("メールアドレスとパスワードの組み合わせが正しくありません。");
      });
  };

  const signUp = () => {
    axios
      .post(
        process.env.REACT_APP_HOST + ":3001" + "/users",
        {
          user: {
            name: username,
            email: email,
            password: password,
            password_confirmation: confirmPassword,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        signIn();
      })
      .catch((error) => {
        console.log("registration error", error);
      });
  };

  const inputUsername = useCallback(
    (event) => {
      setUsername(event.target.value);
    },
    [setUsername]
  );

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

  const inputConfirmPassword = useCallback(
    (event) => {
      setConfirmPassword(event.target.value);
    },
    [setConfirmPassword]
  );

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">アカウント登録</h2>
      <div className="module-spacer--medium" />
      <TextInput
        fullWidth={true}
        label={"ユーザーネーム"}
        multiline={false}
        rows={1}
        required={true}
        value={username}
        type={"text"}
        onChange={inputUsername}
      />
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
      <TextInput
        fullWidth={true}
        label={"パスワード(確認)"}
        multiline={false}
        rows={1}
        required={true}
        value={confirmPassword}
        type={"password"}
        onChange={inputConfirmPassword}
      />

      <div className="module-spacer--medium" />

      <div className="center">
        <PrimaryButton
          label={"アカウントを登録する"}
          onClick={() => {
            if (
              username === "" ||
              email === "" ||
              password === "" ||
              confirmPassword === ""
            ) {
              alert("必須項目が入力されていません。");
              return false;
            }
            if (!email.match(/@/)) {
              alert("正しいメールアドレスを入力してください。");
              return false;
            }
            if (password.length < 6) {
              alert("パスワードは６文字以上である必要があります。");
              return false;
            }
            if (password !== confirmPassword) {
              alert("パスワードと確認用パスワードが一致しません。");
              return false;
            }

            signUp();
          }}
        />
        <div className="help">
          <p onClick={() => history.push("/signin")}>
            アカウントをお持ちの方はこちら
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
