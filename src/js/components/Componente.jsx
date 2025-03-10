import React, { useState } from "react";
import Card from "./Card";

const Component = () => {
    const [input, setInput] = useState("Escribe una tarea...");
    const [array, setArray] = useState([]);

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    const handleAddTask = () => {
        if (input.trim() !== "") {
            setArray([input, ...array]);
            setInput("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleAddTask();
        }
    };

    const handleDeleteTask = (deleteTask) => {
        setArray(array.filter(task => task !== deleteTask));
    };

    return (
        <div className="d-flex flex-column align-items-center mb-3">
            <input 
                type="text" 
                style={{ height: "6vh", width: "30vw", fontSize: "1.2em", border: "1px solid grey", paddingLeft: "20px" }} 
                value={input}
                className="inpt mb-1"
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                onFocus={() => input === "Escribe una tarea..." && setInput("")}
                onBlur={() => input === "" && setInput("Escribe una tarea...")}
            />
           <div>
                {array.map((el, index) => (
                    <div key={index} style={{ position: "relative" }} className="task-container">
                        <Card title={el} />
                        <i id="icon" className="fa-solid fa-xmark delete-icon" onClick={() => handleDeleteTask(el)}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Component;
