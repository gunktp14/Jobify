import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  //global state and useNavigate
  const navigate = useNavigate();
  const {
    user,
    isLoading,
    showAlert,
    displayAlert,
    registerUser,
    loginUser,
    setupUser,
  } = useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember, confirm_password } = values;

    if (
      !email ||
      !password ||
      (!isMember && !name) ||
      (!isMember && !confirm_password)
    ) {
      displayAlert();
      return;
    }

    if (!isMember && confirm_password !== password) {
      displayAlert("confirm password must be the same with password!");
      return;
    }

    const currentUser = { name, email, password };

    if (isMember) {
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "Login Successful! Redirecting...",
      });
    } else {
      setupUser({
        currentUser,
        endPoint:"register",
        alertText:"User Created! Redirecting..."
      })
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {/*name input*/}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            values={values.name}
            handleChange={handleChange}
          />
        )}
        {/*email input*/}
        <FormRow
          type="email"
          name="email"
          values={values.email}
          handleChange={handleChange}
        />
        {/*password input*/}
        <FormRow
          type="password"
          name="password"
          values={values.password}
          handleChange={handleChange}
        />
        {!values.isMember && (
          <FormRow
            type="password"
            name="confirm_password"
            values={values.password}
            handleChange={handleChange}
            labelText="Repeat password"
          />
        )}
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button
            type="button"
            onClick={toggleMember}
            className="member-btn"
            disabled={isLoading}
          >
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
