import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  
  const submitHandler = async (e) => {

    e.preventDefault();
    const response = await axios.post("http://localhost:3000/user/signin", {
      "email": email,
      "password": password

    })
    console.log(response.data)
    localStorage.setItem("token", response.data.token)
    navigate("/user");

  };

  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <form className=" shadow-2xl flex flex-col  h-90 w-120 justify-center items-center px-8 gap-6 relative rounded-3xl">


        <input
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-200 py-2 text-l px-2 font rounded-md"
          type="text"
          placeholder="Email:"
        />

        <input
          onChange={(e) => setPass(e.target.value)}
          className="w-full bg-gray-200 py-2 text-l px-2 font rounded-md"
          type="password"
          placeholder="Password:"
        />
        <button
          onClick={submitHandler}
          className="mt-7 bottom-3 w-full border-none rounded-xl bg-blue-600 py-3 text-xl text-white font-bold cursor-pointer transition-all duration-300 hover:scale-105"
        >
          Sign in
        </button>

        <div className="text-gray-600">
          New user ? {" "}
          <Link className='text-blue-700 cursor-pointer' to="/signup">
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
