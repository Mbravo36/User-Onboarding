import React from "react";

function NewUser({details}){
    if (!details) {
        return <h3>Working fetching your new user&apos;s details...</h3>
      }
      return(
        <div>
        <h2>{details.name}</h2>
        <p>Email: {details.email}</p>
        </div>
    )
}
export default NewUser;