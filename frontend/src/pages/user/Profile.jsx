import { useSelector } from "react-redux";


export default function Profile() {
  const {user} = useSelector((state) => state.user);
  return (
    <div className="row mt-4">
      <div className="col-md-4">
          <ul className="list-group shadow-lg">
            <li className="list-group-item border border-3 border-dark mb-1">
              <strong>Name:</strong>   <i className="bi bi-person"></i> {user?.name}
            </li>
            <li className="list-group-item border border-3 border-dark mb-1">
              <strong>Email:</strong> <i className="bi bi-envelope"></i> {user?.email}
            </li>
            <li className="list-group-item border border-3 border-dark mb-1">
              <strong>Joined At:</strong>  <i className="bi bi-calendar"></i> {new Date(user?.created_at).toLocaleDateString()}
            </li>   

          </ul>
      </div>
    </div>
  );
}