import { useSelector } from "react-redux";


export default function Profile() {
  const {user} = useSelector((state) => state.user);
  return (
    <div className="row mt-4">
      <div className="col-md-6 offset-md-3">
        <div className="card">
          <ul className="list-group list-group-flush list-odded">
            <li className="list-group-item">
              <strong>Name:</strong>   <i className="bi bi-person"></i> {user?.name}
            </li>
            <li className="list-group-item">
              <strong>Email:</strong> <i className="bi bi-envelope"></i> {user?.email}
            </li>
            <li className="list-group-item">
              <strong>Joined At:</strong>  <i className="bi bi-calendar"></i> {new Date(user?.created_at).toLocaleDateString()}
            </li>   

          </ul>
        </div>
      </div>
    </div>
  );
}