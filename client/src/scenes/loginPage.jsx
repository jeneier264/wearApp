import { Fragment, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import styles from "../style";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const registerSchema = yup.object().shape({
  userName: yup.string().required("required"),
  password: yup.string().required("required"),
  bio: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  userName: yup.string().required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  userName: "",
  password: "",
  bio: "",
  picture: "",
};

const initialValuesLogin = {
  userName: "",
  password: "",
};

const LoginPage = () => {
  const [pageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const [succesReg, setSuccessReg] = useState(false);

  // pop-up notification about successful registration
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessReg(false);
  };

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  const register = async (values, onSubmitProps) => {
    var imgUrl = "";
    // this allows us to send form info with image
    const formData = new FormData();
    const cloudData = new FormData();

    cloudData.append("file", values.picture);
    cloudData.append("upload_preset", "wearapp");
    cloudData.append("cloud_name", "dpclhozin");

    await fetch(" https://api.cloudinary.com/v1_1/dpclhozin/image/upload", {
      method: "post",
      body: cloudData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        imgUrl = data.url;
      })
      .catch((err) => console.log(err));

    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("profilePicture", imgUrl);

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }

    setSuccessReg(true);
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate(`/profile/${loggedIn.user._id}`);
    }
  };

  const handleForSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleForSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <div
          className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary via-primary to-primary
                    relative flex flex-col justify-center min-h-screen overflow-hidden"
        >
          <div
            className={`w-full ${styles.flexCenter} flex-col  p-6 m-auto rounded-md  lg:max-w-md `}
          >
            <Link to="/">
              <img
                src={logo}
                alt="wearApp"
                className="w-[180px] h-[42px] m-4"
              />
            </Link>
            <form onSubmit={handleSubmit}>
              <div>
                <label for="username" className={`${styles.logLabel}`}>
                  username
                </label>
                <input
                  className={`${styles.logInput}`}
                  onChange={handleChange}
                  value={values.userName}
                  name="userName"
                  onError={
                    Boolean(touched.userName) && Boolean(errors.userName)
                  }
                  onBlur={handleBlur}
                />
              </div>
              <div>
                <label for="password" className={`${styles.logLabel}`}>
                  password
                </label>
                <input
                  className={`${styles.logInput}`}
                  type="password"
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  onBlur={handleBlur}
                />
              </div>
              {isRegister && (
                <>
                  <label for="bio" className={`${styles.logLabel}`}>
                    bio
                  </label>
                  <textarea
                    rows={2}
                    className={`${styles.logInput}`}
                    onChange={handleChange}
                    value={values.bio}
                    name="bio"
                    onError={Boolean(touched.bio) && Boolean(errors.bio)}
                    onBlur={handleBlur}
                  />
                  <div className="w-full border border-gray-900 border-dashed p-3 cursor-pointer">
                    <Dropzone
                      acceptedFiles=".jpg, .jpeg, .png"
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        setFieldValue("picture", acceptedFiles[0])
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p className={`${styles.dropzone}`}>
                              Add picture here
                            </p>
                          ) : (
                            <div className="flex justify-between">
                              <p className={`${styles.dropzone}`}>
                                {values.picture.name}
                              </p>
                              <EditOutlinedIcon fontSize="small" />
                            </div>
                          )}
                        </div>
                      )}
                    </Dropzone>
                  </div>
                </>
              )}
              <div class="mt-6" id="hey">
                <button
                  type="submit"
                  className={`${styles.logButton} font-josefin`}
                >
                  {isLogin ? "login" : "register"}
                </button>
              </div>
              <p className="mt-8 text-xs font-light text-center text-gray-700 font-josefin">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <span
                  onClick={() => {
                    setPageType(isLogin ? "register" : "login");
                    resetForm();
                  }}
                  className="ml-2 cursor-pointer font-bold text-neutral-900 hover:underline"
                >
                  {isLogin ? "Sign up" : "Log in"}
                </span>
              </p>
            </form>
            <Snackbar
              open={succesReg}
              autoHideDuration={6000} // make it last less??
              onClose={handleClose}
              message="User has been successfully registered!"
              action={action}
            />
          </div>
        </div>
      )}
    </Formik>
  );
};

export default LoginPage;
