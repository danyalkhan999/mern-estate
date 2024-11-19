import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      // manage google auth
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("Could not be able to sign in with google", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="flex flex-row items-center gap-1 mt-2 bg-gray-100 shadow-lg p-1.5 justify-center cursor-pointer rounded-md hover:bg-gray-200"
    >
      <img
        className="w-8"
        src="https://www.transparentpng.com/thumb/google-logo/colorful-google-logo-transparent-clipart-download-u3DWLj.png"
        alt="Colorful Google Logo transparent clipart download @transparentpng.com"
      ></img>
      <p className="flex gap-1 items-center">
        Sign In with
        <p className="tracking-wide">
          <span className="blue google text-lg">G</span>
          <span className="red google text-lg">o</span>
          <span className="yellow google text-lg">o</span>
          <span className="blue google text-lg">g</span>
          <span className="red google text-lg">l</span>
          <span className="blue google text-lg">e</span>
        </p>
      </p>
    </button>
  );
};

export default OAuth;
