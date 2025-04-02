import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const handleApiError = (
  error: unknown,
  defaultMessage = "Something went wrong"
) => {
  if (error instanceof AxiosError) {
    const errorMessage = error.response?.data?.message || defaultMessage;
    toast.error(errorMessage);
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error(defaultMessage);
  }
};
