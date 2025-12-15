import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [validationErrors, setValidationErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate();

  const registerNewUser = async (e) => {
    e.preventDefault()
    setValidationErrors(null)
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:8000/api/user/register' , user)
      toast.success(res.data.message)
      navigate('/login')
    } catch (error) {
if (error?.response?.status === 422) {
       setValidationErrors(error.response.data.errors) 
      }
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row my-5">
      <div className="col-md-6 mx-auto">
        <div className="card border-dark border border-2 shadow rounded-0">
          <div className="card-header border-dark border-2 bg-white text-center mt-2">
            <h5>Register</h5>
          </div>
          <div className="card-body">
            <form onSubmit={(e) => registerNewUser(e)}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-bold">Name*</label>
                <input type="text" className="form-control" id="name"
                  value={user.name}
                  onChange={(e) => setUser({
                    ...user, name: e.target.value
                  })}
                />
                <div
                  className="text-danger mt-1">
                  {validationErrors?.name && validationErrors.name[0]}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">Email*</label>
                <input type="email" className="form-control" id="email"
                  value={user.email}
                  onChange={(e) => setUser({
                    ...user, email: e.target.value
                  })}
                />
                <div
                  className="text-danger mt-1">
                  {validationErrors?.email && validationErrors.email[0]}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-bold">Password*</label>
                <input type="password" className="form-control" id="password"
                  value={user.password}
                  onChange={(e) => setUser({
                    ...user, password: e.target.value
                  })}

                />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}