import { useState } from "react";
import Navbar from "../components/nav-bar";
import { iconsURL } from "../lib/icons";
import { useAuthStore } from "../store/use-auth-store";
import { useNavigate } from "react-router-dom";
const ChooseCharacter = () => {
  const navigate = useNavigate();
  const images = Array.from(
    { length: 16 },
    (_, i) => `${iconsURL}/${i + 1}.png`
  );
  const [activeImage, setActiveImage] = useState<string>(images[0]);
  const { authUser, updateProfile } = useAuthStore();

  const handleUpdate = () => {
    if (authUser) {
      authUser.profilePic = activeImage;
      updateProfile(authUser);
      navigate("/");
    }
  };
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="rounded-lg shadow-cl w-full h-[calc(100vh-8rem)]">
          <div className="h-full rounded-lg overflow-hidden">
            <Navbar />
            <div className="mt-28">
              <h1 className="text-center text-xl mb-4">Choose your Avatar</h1>
              <div className="">
                <img
                  src={activeImage}
                  alt={`Selected image`}
                  className="w-28 h-auto rounded-full shadow-md mx-auto border-4 border-white/85"
                />
              </div>
              <div className="container mx-auto max-w-md mt-8 w-60 md:w-full">
                <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3">
                  {images.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      onClick={
                        activeImage !== src
                          ? () => setActiveImage(src)
                          : undefined
                      }
                      alt={`Image ${index + 1}`}
                      className="h-auto rounded-xl shadow-md w-full"
                    />
                  ))}
                </div>
              </div>
              <div className="w-full flex items-center">
                <button
                  type="button"
                  className="btn btn-primary mx-auto mt-8"
                  onClick={handleUpdate}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChooseCharacter;
