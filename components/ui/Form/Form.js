import React from "react";
import styled from "styled-components";
import axios from "axios";
import { helpers } from "../../../utils";
import StyledInput from "../../elements/Input";
import Label from "../../elements/Label";
const Form = ({ Fields, Action, Redirect, className = "GrbForm", props }) => {
  const [FormState, SetFormState] = React.useState(Fields);
  const submit = (e) => {
    e.preventDefault();
    if (Action) {
      Action(FormState);
    }
  };

  React.useEffect(() => {
    SetFormState(Fields);
  }, [Fields]);
  const FormGenerator = () => {
    const elements = [];
    for (let field in FormState) {
      elements.push(
        <div
          className={`inputFields ${
            FormState[field].type === "submit" ? "SubmitButton" : ""
          }`}
          key={field}
        >
          <StyledInput
            checked={FormState[field].checked}
            name={FormState[field].name}
            as={FormState[field].as ? FormState[field].as : "input"}
            type={FormState[field].type}
            id={field}
            pattern={`.{${
              FormState[field].minlength ? FormState[field].minlength : 0
            },${FormState[field].maxlength ? FormState[field].maxlength : ""}}`}
            size={FormState[field].size}
            placeholder={FormState[field].placeholder}
            fontcolorinvert="true"
            backgroundcolorinvert="true"
            step={FormState[field].step}
            required={FormState[field].required}
            disabled={FormState[field].disabled}
            value={FormState[field].value}
            onChange={(e) => {
              SetFormState({
                ...FormState,
                [field]: { ...FormState[field], value: e.target.value },
              });
              if (FormState[field].Change)
                FormState[field].Change(FormState[field].value);

              if (FormState[field].type === "Checkbox")
                SetFormState({
                  ...FormState,
                  [field]: { ...FormState[field], checked: e.target.checked },
                });
            }}
            onClick={(e) => {
              if (FormState[field].click)
                FormState[field].click(FormState[field].value);
            }}
          >
            {FormState[field].as === "select"
              ? FormState[field].option.map((element, index) => (
                  <option value={element} key={helpers.generateKey(index)}>
                    {element}
                  </option>
                ))
              : null}
          </StyledInput>
          {FormState[field].label ? (
            <Label htmlFor={field}>{FormState[field].label}</Label>
          ) : (
            ""
          )}
        </div>
      );

    }
    return elements;
  };
  return (
    <StyledForm onSubmit={submit} className={className}>
      {FormGenerator()}
    </StyledForm>
  );
};
const StyledForm = styled.form`
  width: 100%;
  height: 80%;
`;

export default Form;
// fields exemple
// const Fields =
//     {
//      UserName:{
//         type: "text",
//         placeholder: "UserName",
//         value:""
//       },
//       Password:{
//         type: "Password",
//         placeholder: "Password",
//         value:""
//       },
//       Email:{
//         type: "Email",
//         placeholder: "Email",
//         value:"",
//         required:true
//       },
//       Message:{
//         as:"textarea",
//         type: "text",
//         placeholder: "Your Message",
//         value:""
//       },
//       Checkbox:{
//         label: "Checkbox",
//         type: "Checkbox",
//         placeholder: "",
//         value:""
//       },
// ASelect: {
//   name: "Sexe",
//   label: "Sexe",
//   as: "select",
//   value: "",
//   option:["Male","Female"]
// },
