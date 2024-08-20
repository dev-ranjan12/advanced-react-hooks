import React, { useCallback, useReducer } from "react";

const initialState = {
	step: 1,
	name: "",
	email: "",
	confirmation: false,
};

const formReducer = (state, action) => {
	switch (action.type) {
		case "NEXT_STEP":
			return { ...state, step: state.step + 1 };
		case "PREVIOUS_STEP":
			return { ...state, step: state.step - 1 };
		case "SET_NAME":
			return { ...state, name: action.payload };
		case "SET_EMAIL":
			return { ...state, email: action.payload };
		case "SET_CONFIRMATION":
			return { ...state, confirmation: action.payload };
		default:
			return state;
	}
};

const App = () => {
	const [state, dispatch] = useReducer(formReducer, initialState);
	const handleNext = useCallback(() => dispatch({ type: "NEXT_STEP" }), []);
	const handlePrevious = useCallback(
		() => dispatch({ type: "PREVIOUS_STEP" }),
		[]
	);
	const setName = useCallback(
		(e) => dispatch({ type: "SET_NAME", payload: e.target.value }),
		[]
	);
	const setEmail = useCallback(
		(e) => dispatch({ type: "SET_EMAIL", payload: e.target.value }),
		[]
	);
	const setConfirmation = useCallback(
		(e) => dispatch({ type: "SET_CONFIRMATION", payload: e.target.checked }),
		[]
	);

	return (
		<div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
			<h2>Multi-Step Form</h2>
			{state.step === 1 && (
				<div>
					<label>Name:</label>
					<input type="text" value={state.name} onChange={setName} />
					<br />
					<button onClick={handleNext}>Next</button>
				</div>
			)}
			{state.step === 2 && (
				<div>
					<label>Email:</label>
					<input type="email" value={state.email} onChange={setEmail} />
					<br />
					<button onClick={handlePrevious}>Previous</button>
					<button onClick={handleNext}>Next</button>
				</div>
			)}
			{state.step === 3 && (
				<div>
					<label>
						<input
							type="checkbox"
							checked={state.confirmation}
							onChange={setConfirmation}
						/>
						Confirm Details
					</label>
					<br />
					<button onClick={handlePrevious}>Back</button>
					<button onClick={() => alert("Form Submitted")}>Submit</button>
				</div>
			)}
		</div>
	);
};

export default App;
