import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    // Remove any spaces that might have been pasted
    const noSpacesValue = value.replace(/\s/g, "");

    // Your state update logic here, for example:
    setFormData((prev) => ({
      ...prev,
      [id]: noSpacesValue,
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };
  // console.log("form", formData);

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success == false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      console.log(data);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error ? <p className="text-red-600 text-center">{error}</p> : ""}
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          pattern="^\S*$"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          pattern="^\S*$"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          pattern="^\S*$"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-85"
        >
          {loading ? "Processing..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Already have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700 ">Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
