import React, { useCallback, useState, useEffect } from "react";
import { TextInput, PrimaryButton } from "../UIkit/index";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

const UserEdit = (props) => {
  const history = useHistory();
  const location = useLocation();

  const [username, setUsername] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [confirmPassword, setConfirmPassword] = useState(""),
    [currentUser, setCurrentUser] = useState(false);

  const urlId = location.pathname.split("/")[2];

  const checkCorrectUser = () => {
    axios
      .get("http://localhost:3001/login", { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          const currentUserId = response.data.user.id;
          if (urlId == currentUserId) {
            setCurrentUser(true);
            return;
          } else {
            alert("ログイン中のユーザー情報以外は編集できません");
            history.push("/");
          }
        } else {
          // alert("ログインしてください");
          // history.push("/signin");
        }
      })
      .catch((error) => {
        alert(
          "ログインステータスエラーが起きました。通信環境をお確かめください。"
        );
        console.log("ログインステータスエラー", error);
      });
  };

  useEffect(() => {
    checkCorrectUser();
  }, []);

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

  if (!currentUser) {
    console.log("render");
    return <p>読み込み中です</p>;
  } else {
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
        {console.log("render")}

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
            label={"アカウント情報を変更する"}
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

              axios
                .patch(
                  "http://localhost:3001/users/" + urlId,
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
                  console.log("registration res", response);
                  const createdId = response.data.id;
                  console.log(createdId);
                  history.push({ pathname: "/users/" + createdId });
                })
                .catch((error) => {
                  console.log("registration error", error);
                });
              // event.preventDefault()
            }}
          />
        </div>
      </div>
    );
  }
};
export default UserEdit;
