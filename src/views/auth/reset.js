import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { instance } from "../../lib/interceptors";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const FormError = ({ errorMessage }) => (
  <span role="alert" className="font-medium text-red-500">
    {errorMessage}
  </span>
);

export default function Reset({ match }) {
  const history = useHistory();

  const code = match.params.code;

  const formSchema = code
    ? Yup.object().shape({
        password: Yup.string()
          .required("Password is mendatory")
          .min(3, "Password must be at 3 char long"),
        confirmPassword: Yup.string()
          .required("Please type your password one more time.")
          .oneOf([Yup.ref("password")], "Passwords does not match"),
      })
    : Yup.object().shape({
        email: Yup.string().required("Email is required"),
      });

  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  async function onSubmit() {
    const { email, password, confirmPassword } = getValues();
    if (email) {
      console.log(email);
      await instance
        .get(`api/auth/send-password-reset-email/${email}`)
        .then(function (res) {
          console.log(res);
        })
        .catch(function (error) {
          console.log("err : ", error);
        })
        .then(function () {
          history.push("/");
        });
    } else if (password && confirmPassword) {
      console.log(password);
      await instance
        .post("api/auth/reset-password", { code, password })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (error) {
          console.log("err : ", error);
        })
        .then(function () {
          // history.push("/");
        });
    }
  }

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            {code ? (
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div className="text-blueGray-400 text-center mb-3 font-bold">
                    <small>Enter your new password</small>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="password"
                        name="password"
                        {...register("password", {
                          required: true,
                          minLength: 3,
                        })}
                        type="password"
                        placeholder="Enter your password"
                      />
                      {errors.password && (
                        <FormError errorMessage={errors?.password?.message} />
                      )}
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="password"
                      >
                        Confirm Password
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="confirmPassword"
                        name="confirmPassword"
                        {...register("confirmPassword", {
                          required: true,
                          minLength: 3,
                        })}
                        type="password"
                        placeholder="Check your Password"
                      />
                      {errors.confirmPassword && (
                        <FormError
                          errorMessage={errors?.confirmPassword.message}
                        />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Reset Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-blueGray-500 text-sm font-bold">
                      Enter the mail to find the password
                    </h6>
                  </div>
                  <hr className="mt-6 border-b-1 border-blueGray-300" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div className="text-blueGray-400 text-center mb-3 font-bold">
                    <small>Enter your Email</small>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Email
                      </label>
                      <input
                        {...register("email", {
                          required: "Email is required",
                        })}
                        required
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                      />
                      {errors.name?.message && (
                        <FormError errorMessage={errors.name?.message} />
                      )}
                    </div>

                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Confirm
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2 text-left"></div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-blueGray-200">
                  <small>Create new account</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
