import Navbar from "../components/nav-bar";
import { iconsURL } from "../lib/icons";
const ChooseCharacter = () => {
  const images = Array.from(
    { length: 16 },
    (_, i) => `${iconsURL}/${i + 1}.png`
  );

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="rounded-lg shadow-cl w-full h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Navbar />
            <div className="container mx-auto max-w-xl">
              <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-4">
                {images.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Image ${index + 1}`}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChooseCharacter;
