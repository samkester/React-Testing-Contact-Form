import React from "react";
import { render, screen } from "@testing-library/react";
import ContactForm from "./ContactForm";

const getFirstNameField = () => {screen.getByLabelText(/first name/i)};
const getLastNameField = () => {screen.getByLabelText(/last name/i)};
const getEmailField = () => {screen.getByLabelText(/email/i)};
const getMessageField = () => {screen.getByLabelText(/message/i)};
const getErrorFields = () => {screen.queryAllByText(/error/i)}; //not "get" b/c there are some tests where we want 0 error fields
const getButton = () => {screen.getByTestId(/submit/i)};
const getEchoField = () => {screen.queryByText(/{/)}; // should appear in any valid JSON response

const testInputGood = {
    firstName: "George",
    lastName: "Jetson",
    email: "gjetson@spacely.com",
    message: "JETSON! YOU'RE FIRED!"
};

const testInputBad = {
    firstName: "",
    lastName: "",
    email: "",
    message: ""
};

test("renders ContactForm elements", () => {
    // check that the form renders
    render(<ContactForm />);

    // check that all permanent fields are present
    getFirstNameField();
    getLastNameField();
    getEmailField();
    getMessageField();
    getButton();
    
    // check that all temporary fields are currently absent
    expect(getErrorFields.length).toBe(0);
    expect(getEchoField).toBeNull;
});
