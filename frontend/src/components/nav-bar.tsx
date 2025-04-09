import { Link } from "react-router-dom";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useAuthStore } from "../store/use-auth-store";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg"
    >
      <div className="container px-4 h-16 w-full">
        <div className="flex items-center justify-between h-full w-[97vw]">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
                <img src="/logo.png" alt="TypeTale Logo" />
              </div>
              <h1 className="text-lg font-bold">TaleType</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {authUser && (
              <>
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn m-1">
                    <img
                      src={authUser?.profilePic || "/avatar.png"}
                      alt={authUser?.fullName}
                      className="size-8 object-cover rounded-full "
                    />
                  </div>
                  <ul
                    className={` menu dropdown-content rounded-box z-1 w-52 p-2 shadow-sm ml-[-150px] bg-base-100`}
                  >
                    <li>
                      <Link
                        to={"/settings"}
                        className={`bg-base-100 hover:bg-base-200 gap-2 transition-colors
              `}
                      >
                        <Settings className="w-4 h-4" />
                        <span className="hidden sm:inline">Themes</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/profile"}
                        className={`bg-base-100 hover:bg-base-200 gap-2`}
                      >
                        <User className="size-5" />
                        <span className="hidden sm:inline">Profile</span>
                      </Link>
                    </li>
                    <li>
                      <button
                        className="flex gap-2 items-center bg-base-100 hover:bg-base-200"
                        onClick={logout}
                      >
                        <LogOut className="size-5" />
                        <span className="hidden sm:inline">Logout</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
