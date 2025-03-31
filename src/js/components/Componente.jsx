import React, { useEffect, useState } from "react";
import Card from "./Card";

const Component = () => {
    const api = "https://playground.4geeks.com/todo";
    const user = "albertpregonas";
    const [input, setInput] = useState("");
    const [array, setArray] = useState([]);

    // Código API
    useEffect(() => {
        getTask();
    }, []);

    // GET
    const getTask = () => {
        fetch(`${api}/users/${user}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.json())
        .then(data => {
            console.log("Tareas recibidas:", data.todos);
            if (Array.isArray(data.todos)) {
                let falseTodos = data.todos.filter(item => item.is_done !== true)
                setArray(falseTodos)
                // setArray(data.todos);
            } else {
                console.error("La respuesta no contiene un array válido");
            }
        })
        .catch(error => console.error("Error al obtener tareas:", error));
    };

    // POST
    const postTask = () => {
        const newTask = { label: input, is_done: false };
        setArray([...array, newTask]); // Faster but not optimal because the browser state and the server could get out of sync
    
        fetch(`${api}/todos/${user}`, {
            method: "POST",
            body: JSON.stringify(newTask),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.json())
        .then(() => {
            getTask();
        })
        .catch(error => console.error("Error al añadir tarea:", error));
    };

    // PUT
    const putTask = (id) => {
        const changeTask = { label: input, is_done: true };
        fetch(`${api}/todos/${id}`, {
            method: "PUT",
            body: JSON.stringify(changeTask),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => {
            if (resp.ok) {
                setArray(prevArray => prevArray.filter(task => task.id !== id));
                return resp.json();
            }
        })       
        .then((data) => {
            console.log(data)
        })
        .catch(error => console.error("Error al añadir tarea:", error));
    };

    const handleDeleteTask = (deleteTask) => {
        fetch(`${api}/todos/${deleteTask.id}`, {
            method:"DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(resp => {
            if (resp.ok) {
                setArray(prevArray => prevArray.filter(task => task.id !== deleteTask.id));
                // getTask();
                return resp.json()
            }
        }).then((data) => {
            console.log(data)
        }).catch(error => console.error("Error al añadir tarea:", error));
    }

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    const handleAddTask = () => {
        if (input.trim() !== "") {
            postTask();
            setInput("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleAddTask();
        }
    };

    return (
        <div className="d-flex flex-column align-items-center mb-3">
            <input 
                type="text" 
                style={{ height: "6vh", width: "30vw", fontSize: "1.2em", border: "1px solid grey", paddingLeft: "20px" }} 
                value={input}
                className="inpt mb-1 rounded-1 bg-dark text-light"
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder="Escribe una tarea..."
                // onFocus={() => input === "Escribe una tarea..." && setInput("")}
                // onBlur={() => input === "" && setInput("Escribe una tarea...")}
            />
            <div>
                {array.map((el, index) => (
                    <div key={index} style={{ position: "relative" }} className="task-container">
                        <Card title={el.label} />
                        <i id="icon" className="fa-solid fa-xmark delete-icon" onClick={() => handleDeleteTask(el)}/>
                        <i className="fa-solid fa-check change-icon" onClick={() => putTask(el.id)}/>
                    </div>
                ))}
            </div>
            <footer className="text-light mt-3">
                {array.length === 0 
                    ? "No hay tareas, añadir tareas" 
                    : `Tienes ${array.length} tarea${array.length > 1 ? "s" : ""}`}
            </footer>
        </div>
    );
};

export default Component;