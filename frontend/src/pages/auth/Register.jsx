import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useValidation from "../../components/custom/useValdation";
import Spinner from "../../components/layouts/Spinner";
import { registerUserApi } from "../../config/api";
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
      // const res = await axios.post('http://localhost:8000/api/user/register' , user)
      const data = await registerUserApi(user)
      toast.success(data.message)
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
                <input type="text" className="form-control p-2 border border-2 rounded-0 border-dark" id="name"
                  value={user.name}
                  onChange={(e) => setUser({
                    ...user, name: e.target.value
                  })}
                />
               {useValidation(validationErrors, 'name')}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">Email*</label>
                <input type="email" className="form-control p-2 border border-2 rounded-0 border-dark" id="email"
                  value={user.email}
                  onChange={(e) => setUser({
                    ...user, email: e.target.value
                  })}
                />
               {useValidation(validationErrors, 'email')}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-bold">Password*</label>
                <input type="password" className="form-control p-2 border border-2 rounded-0 border-dark" id="password"
                  value={user.password}
                  onChange={(e) => setUser({
                    ...user, password: e.target.value
                  })}
                  />
                {useValidation(validationErrors, 'password')}
              </div>
              {
              loading ? 
              <Spinner /> 
              :
              <button type="submit" className="btn btn-dark w-100 rounded-0 fw-bold">Register</button>
              }
             
            </form>
          </div>
          <div className="card-footer border-dark border-2 text-center">
            <small className="text-muted">Already have an account? <span className="fw-bold" style={{cursor: 'pointer'}} onClick={() => navigate('/login')}>Login</span></small>   
          </div>
        </div>
      </div>
    </div>
  )
}