
import { ClipLoader } from "react-spinners";

export default function Spinner() {
  return (
    <div className="d-flex justify-content-center align-items-center my-3">
        <ClipLoader
        size={50}
      />
    </div>
  );
}