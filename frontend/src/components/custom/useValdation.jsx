
export default function useValidation(errors, field) {
    return (
      <>
        {errors?.[field]?.map((errorMsg, index) => (
          <div key={index} className="text-danger mt-1 fw-bold">
            {errorMsg}
          </div>
        ))}
      </>
    );
}
/* // <div className="text-danger mt-1">{errors?.[field] && errors[field][0]}</div> */
