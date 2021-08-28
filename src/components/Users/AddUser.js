import { useState, useRef, Fragment } from "react";
import Card from "../Ui/Card";
import Button from "../Ui/Button";
import ErrorModal from "../Ui/ErrorModal";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
    const nameInputRef = useRef();
    const ageInputRef = useRef();
    const [error, setError] = useState("");

    const addUserHandler = (event) => {
        event.preventDefault();

        const enteredUsername = nameInputRef.current.value;
        const enteredAge = ageInputRef.current.value;

        //Validation
        if (
            enteredUsername.trim().length === 0 ||
            enteredAge.trim().length === 0
        ) {
            setError({
                title: "Invalid input",
                message:
                    "Please enter a valid name and age (non-empty values).",
            });
            return;
        }

        if (+enteredAge < 1) {
            setError({
                title: "Invalid age",
                message: "Please enter a valid age (greater than 0).",
            });
            return;
        }

        //Lifting state up
        props.onAddUser(enteredUsername, enteredAge);

        //Form clear
        nameInputRef.current.value = '';
        ageInputRef.current.value = '';
    };

    const errorHandler = () => setError(null)

    return (
        <Fragment>
            {error && (
                <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />
            )}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">User name</label>
                    <input
                        id="username"
                        type="text"
                        ref={nameInputRef}
                    />
                    <label htmlFor="age">Age (Years)</label>
                    <input
                        id="age"
                        type="number"
                        ref={ageInputRef}
                    />
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </Fragment>
    );
};

export default AddUser;
