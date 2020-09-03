import React, { useState } from "react";
//import { useForm } from "react-hook-form";

const defaultFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
}

const defaultFormErrors = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
}

const ContactForm = () => {
  const [data, setData] = useState();
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [formErrors, setFormErrors] = useState(defaultFormErrors);

  /*const { register, errors, handleSubmit } = useForm({
    mode: "onChange",
  });*/

  const onChange = (event) => {
    setFormValues({...formValues, [event.target.name]: event.target.value});

    if(event.target.value === ""){
      setFormErrors({...formErrors, [event.target.name]: "required"});
    }
    //else if(event.target.value.length > 3 && event.target.name === "firstName"){
    //  setFormErrors({...formErrors, [event.target.name]: "too long"});
    //} // oh no! this was a bad idea, so this piece of form validation was removed. ish.
    else{
      setFormErrors({...formErrors, [event.target.name]: ""});
    }
  }

  const onSubmit = (event) => {
    event.preventDefault();
    Object.values(formErrors).forEach(item => {
      if (item !== ""){
        return;
      }});

    //console.log(formValues);
    setData({...formValues});
    setFormValues(defaultFormValues);
    setFormErrors(defaultFormErrors);
  };

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="firstName">First Name*</label>
          <input
            id="firstName"
            name="firstName"
            placeholder="Edd"
            value={formValues.firstName}
            onChange={onChange}
            /*ref={register({ required: true, maxLength: 3 })}*/
          />
          {formErrors.firstName && (
            <p>Looks like there was an error: {formErrors.firstName}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName">Last Name*</label>
          <input
            id="lastName"
            name="lastName"
            placeholder="Burke"
            value={formValues.lastName}
            onChange={onChange}
            /*ref={register({ required: true })}*/
          />
          {formErrors.lastName && (
            <p>Looks like there was an error: {formErrors.lastName}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" placeholder="bluebill1049@hotmail.com">
            Email*
          </label>
          <input id="email" name="email" 
            value={formValues.email}
            onChange={onChange} /*ref={register({ required: true })}*/ />
          {formErrors.email && (
            <p>Looks like there was an error: {formErrors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" onChange={onChange}
          value={formValues.message}
          /*ref={register({ required: false })}*/ />
        </div>
        {data && (
          <pre data-testid="echo" style={{ textAlign: "left", color: "white" }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
        <input type="submit" data-testid="submit" />
      </form>
    </div>
  );
};

export default ContactForm;
