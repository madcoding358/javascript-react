import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faArrowLeft, faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";


class Todo extends Component{

    constructor(props){
        super(props);
        this.priorities = {
            high: 1,
            medium: 2,
            low: 3
        };

        this.state = {
            todos: [
                {
                    id: 1,
                    title: "Water plants",
                    description: "",
                    priority: "medium",
                    done: true,
                    expanded: false
                },
                {
                    id: 2,
                    title: "Read book",
                    description: "Read rich dad and poor dad",
                    priority: "low",              
                    done: false,
                    expanded: false
                },
                {
                    id: 3,
                    title: "Buy Groceries",
                    description: "",
                    priority: "high",
                    done: false,
                    expanded: false
                },
                {
                    id: 4,
                    title: "Take bike for tuning",
                    description: "",
                    priority: "medium",
                    done: true,
                    expanded: false
                },
            ],
            todo: {
                title: "",
                description: "",
                priority: "low",
                done: false,
                expanded: false
            },
            todoError: {
                title: ""
            },
            createTodo: false,
        }

        this.valueChangeHandler = this.valueChangeHandler.bind(this);
        this.saveTodo = this.saveTodo.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.changeTodosProperty = this.changeTodosProperty.bind(this);
    }

    getPriorityClass(priority){
        switch(priority){
            case "high":
                return "border-red-500";
            case "medium":
                return "border-yellow-500";
            case "low":
                return "border-blue-500";
            default:
                return "border-blue-500"
        }
    }

    changeTodosProperty(id, property, value){
        this.setState({
            todos: this.state.todos.map((todo, index) => {
                if(todo.id === id) todo[property] = value;
                return todo;
            })
        })
    }

    valueChangeHandler(field, e){
        e.preventDefault();
        this.setState({
            todo: {
                ...this.state.todo,
                [field]: e.target.value
            }
        });
        if(this.state.todoError[field]){
            this.setState({
                todoError:{
                    [field]: ""
                }
            })
        }
    }

    saveTodo(e){
        e.preventDefault();
        if(this.validateData()){
            this.setState({
                todos: [
                    ...this.state.todos,
                    {
                        id: this.state.todos.length + 1,
                        ...this.state.todo
                    }
                ]
            });
            this.resetForm();
            this.setState({
                createTodo: false
            })
        }
    }

    validateData(){
        let isFormGood = true;
        if(this.state.todo.title === ""){
            this.setState({
                todoError:{
                    title: "Please enter a title for todo"
                }
            });
            isFormGood = false;
        }
        return isFormGood;
    }

    resetForm(){
        this.setState({
            todo: {
                title: "",
                description: "",
                priority: "low",
                done: false
            }
        })
    }

    render(){
        return (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg p-8 w-1/3 bg-green-500 text-white">
                {this.state.createTodo ? (
                    <div id="create-todo">
                        <div className="flex gap-4 mb-6">
                            <button type="button" className="cursor-pointer" onClick={() => {this.setState({createTodo: false})}}>
                                <FontAwesomeIcon className="text-5xl" icon={faArrowLeft} />
                            </button> 
                            <p className="text-5xl text-left">Create Todo</p>
                        </div>
                        <div>
                            <div className="mb-4">
                                <input type="text" placeholder="Title" className={`w-full p-4 text-2xl text-black outline-none ${this.state.todoError.title !== "" ? "border-4 border-red-500" : "border-none"} rounded-md shadow-md `} value={this.state.todo.title} onChange={(e) => {this.valueChangeHandler('title', e)}}/>
                                {this.state.todoError.title !== "" ? (<span className="text-red-500 text-2xl font-semibold">{this.state.todoError.title}</span>) : ''}
                            </div>
                            
                            <select name="priority" id="priority" className="w-full p-4 text-2xl text-black outline-none border-none rounded-md shadow-md mb-4" value={this.state.todo.priority} onChange={(e) => {this.valueChangeHandler('priority', e)}}>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                            <textarea name="description" id="description" placeholder="Description" className="w-full p-4 text-2xl text-black outline-none border-none rounded-md shadow-md mb-4" value={this.state.todo.description} onChange={(e) => {this.valueChangeHandler('description', e)}}></textarea>
                            <button type="button" className="bg-white w-12 h-12 rounded-lg shadow-lg cursor-pointer float-right" onClick={this.saveTodo}>
                                <FontAwesomeIcon className="text-5xl text-green-500" icon={faCheck} />
                            </button> 
                        </div>
                    </div>
                ) : (
                    <div id="todo-list">
                        <div className="flex justify-between mb-6">
                            <p className="text-5xl text-left">Your Todos</p>
                            <button type="button" className="bg-white w-12 h-12 rounded-lg shadow-lg cursor-pointer" onClick={() => {this.setState({createTodo: true})}}>
                                <FontAwesomeIcon className="text-5xl text-green-500" icon={faPlus} />
                            </button> 
                        </div>
                        {
                            this.state.todos.sort((a, b) => this.priorities[a.priority] - this.priorities[b.priority]).map((todo, index) => {
                                return (
                                    <div key={todo.id} className={`w-full p-4 rounded-md shadow-md mb-4 bg-white border-l-8 ${this.getPriorityClass(todo.priority)}`}>
                                        <div className="flex justify-between">
                                            <div className="flex gap-4">
                                                <input type="checkbox" name="done" checked={todo.done} onChange={(e) => this.changeTodosProperty(todo.id, 'done', !todo.done)}/>
                                                <p className={`text-2xl text-black ${todo.done ? "line-through" : ""}`}>{todo.title}</p>
                                            </div>
                                            { todo.description !== "" ? (
                                                <button type="button" onClick={(e) => this.changeTodosProperty(todo.id, 'expanded', !todo.expanded)}><FontAwesomeIcon className="text-2xl text-black" icon={todo.expanded ? faAngleUp : faAngleDown} /></button>
                                                ) : (<></>)
                                            }
                                        </div>
                                        { todo.expanded && todo.description !== "" ?
                                            (<div className="w-full mt-4">
                                                <p className="text-2xl text-black"><span className="text-2xl font-bold">Description : </span> {todo.description}</p>
                                            </div>) : (<></>)
                                        }
                                    </div>
                                );
                            })
                        }
                    </div>
                )}
            </div>
        );
    }
}

export default Todo;

