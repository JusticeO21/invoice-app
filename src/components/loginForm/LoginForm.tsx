import FormLabel from "../InvoiceForm/FormLabel";
import TextField from "../TextField/TextField";
import { useForm, SubmitHandler } from "react-hook-form";
import FormGroup from "../InvoiceForm/FormGroup";
import styles from "./LoginForm.module.css";
import { Heading } from "../heading/Heading";
import Button from "../button/Button";
import { Text } from "../text/Text";
import { getErrorMessage } from "../InvoiceForm/Form";
import { useLoginMutation } from "../../Redux/authApi";
import { useAppDispatch } from "../../Hooks/useRedux";
import { setCredentials } from "../../Redux/authSlice";
import { toast, ToastContainer, Zoom } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../../Redux/authSlice";

interface LoginData {
  username: string;
  password: string;
}
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginData>();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    const notify = () =>
      toast.success(`Success! You have successfully Sign in.`);

    try {
      const result = await login(data).unwrap();
      if (result.token) {
        dispatch(
          setCredentials({ token: result.token, username: data.username })
        );
        navigate("/");
        notify();
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(() => {
          dispatch(logout());
          console.log("OUUUUUUT");
        }, 3_600_000);
        setTimeoutId(newTimeoutId);
        reset();
      }
    } catch (error) {
      toast.error("Please check your connection");
    }
  };

  return (
    <>
      <ToastContainer transition={Zoom} />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Heading>Login Here</Heading>
        <FormGroup error={errors?.username && "error"}>
          <FormLabel
            htmlFor="username"
            error={getErrorMessage(errors?.username)}
          >
            username
          </FormLabel>
          <TextField
            type="text"
            {...register("username", {
              required: "Email is required",
              pattern: {
                value: emailPattern,
                message: "Please enter a valid email address",
              },
            })}
          />
        </FormGroup>

        <FormGroup error={getErrorMessage(errors?.password)}>
          <FormLabel
            htmlFor="password"
            error={getErrorMessage(errors?.password)}
          >
            password
          </FormLabel>
          <TextField
            type="text"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
        </FormGroup>

        <Button type="submit">
          <Text>{isLoading ? "Loading ..." : "Log In"}</Text>
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
