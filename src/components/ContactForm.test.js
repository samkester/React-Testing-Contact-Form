import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import ContactForm from "./ContactForm";

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
    screen.getByLabelText(/first name/i);
    screen.getByLabelText(/last name/i);
    screen.getByLabelText(/email/i);
    screen.getByLabelText(/message/i);
    screen.getByTestId(/submit/i);
    
    // check that all temporary fields are currently absent
    expect(screen.queryAllByText(/error/i).length).toBe(0);
    expect(screen.queryByText(/{/)).toBeNull;
});

test("writes and validates good data", () => {
    render(<ContactForm />);

    const firstName = screen.getByLabelText(/first name/i);
    const lastName = screen.getByLabelText(/last name/i);
    const email = screen.getByLabelText(/email/i);
    const message = screen.getByLabelText(/message/i);

    // attempt to set all four input fields
    fireEvent.change(firstName, {target: {value: testInputGood.firstName }});
    fireEvent.change(lastName, {target: {value: testInputGood.lastName }});
    fireEvent.change(email, {target: {value: testInputGood.email }});
    fireEvent.change(message, {target: {value: testInputGood.message }});

    // check that the fields have their inputs
    expect(firstName).toHaveValue(testInputGood.firstName);
    expect(lastName).toHaveValue(testInputGood.lastName);
    expect(email).toHaveValue(testInputGood.email);
    expect(message).toHaveValue(testInputGood.message);

    // check that there are no error fields
    expect(screen.queryAllByText(/error/i).length).toBe(0);
    // this is what failed with the max length validator

    // check that the button is enabled - button state is NYI
    //expect(screen.getByTestId(/submit/i)).not.toHaveAttribute("disabled", true);
});

test("writes and validates bad data", async () => {
    render(<ContactForm />);

    // attempt to set all four input fields
    fireEvent.change(firstName, {target: {value: testInputGood.firstName }});
    fireEvent.change(lastName, {target: {value: testInputGood.lastName }});
    fireEvent.change(email, {target: {value: testInputGood.email }});
    fireEvent.change(message, {target: {value: testInputGood.message }});

    fireEvent.change(screen.getByLabelText(/first name/i), {target: {value: "" }});
    fireEvent.change(screen.getByLabelText(/last name/i), {target: {value: "" }});
    fireEvent.change(screen.getByLabelText(/email/i), {target: {value: "" }});
    fireEvent.change(screen.getByLabelText(/message/i), {target: {value: "" }});

    // check that the fields have their inputs
    expect(screen.getByLabelText(/first name/i)).toHaveValue("");
    expect(screen.getByLabelText(/last name/i)).toHaveValue("");
    expect(screen.getByLabelText(/email/i)).toHaveValue("");
    expect(screen.getByLabelText(/message/i)).toHaveValue("");

    // check that there are three error fields
    //console.log(screen.queryAllByText(/error/i));

    expect(screen.queryAllByText(/error/i)).toHaveLength(3);

    //expect(await screen.findAllByText(/error/i)).toHaveLength(3);

    // check that the button is disabled - button state is NYI
    //expect(screen.getByTestId(/submit/i)).toHaveAttribute("disabled", true);
});

test("submit data and recieve reply", async () => {
    render(<ContactForm />)
    
    // attempt to set all four input fields
    fireEvent.change(screen.getByLabelText(/first name/i), {target: {value: "Joe" }});
    fireEvent.change(screen.getByLabelText(/last name/i), {target: {value: testInputGood.lastName }});
    fireEvent.change(screen.getByLabelText(/email/i), {target: {value: testInputGood.email }});
    fireEvent.change(screen.getByLabelText(/message/i), {target: {value: testInputGood.message }});
    
    //console.log(screen.getByLabelText(/message/i).value);
    
    // click the button
    fireEvent.click(screen.getByTestId("submit"));
    
    //expect(screen.getByTestId("submit")).toBeInTheDocument();

    expect(screen.getByTestId("echo")).toBeInTheDocument();
    //expect(screen.getByTestId("echo")).toHaveTextContent(JSON.stringify(testInputGood, null, 2).replace("\n", "?"));
    // I tried to get clever here, but exactly matching the stringify() with the same stringify, but squished into a `pre` block and back again, is non-trivial
    // if I have time I might look up how to make arbitrary tests and try using parse instead

    //expect(await screen.findByTestId("echo")).toBeInTheDocument();
    //expect(await screen.findByText(/lastName/i)).toBeInTheDocument();
});