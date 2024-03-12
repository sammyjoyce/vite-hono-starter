import {useEffect, useState} from "react";
import {api} from "../utils/frontend";
import Todo from "../models/Todo";
import {SwipeToDelete} from "../components/SwipeToDelete.tsx";

export function IndexPage() {
    const [todoList, setTodoList] = useState([] as Todo[]);
    const [newTodo, setNewTodo] = useState({title: '', description: ''});

    useEffect(() => {
        (async () => {
            const res = await api.todo.list.$get();
            const result = await res.json();

            if (result.success) {
                setTodoList(result.data);
            } else {
                setTodoList([]);
            }
        })();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setNewTodo({
            ...newTodo,
            [name]: value
        });
    };

    const handleAddItem = async () => {
        const res = await api.todo.$post({
            json: newTodo,
        });

        const result = await res.json();

        if (result.success) {
            setTodoList([...todoList, result.data]);
            setNewTodo({title: '', description: ''}); // Reset the form inputs after submission
        }
    };

    const handleDeleteItem = async (id: number) => {
        const res = await api.todo[':id'].$delete({param: {id: id.toString()}});
        const result = await res.json();
        if (result.success) {
            setTodoList(todoList.filter(t => t.id !== id));
        }
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="my-4 md:text-5xl uppercase bg-clip-text text-transparent bg-gradient-to-br from-green-300 via-blue-500 to-purple-600 text-3xl font-black text-center">Hono
                + Vite Todo List</h1>
            <div className="flex flex-col items-center">
                <input
                    type="text"
                    name="title"
                    className="border border-gray-300 rounded-md px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md"
                    placeholder="Title"
                    value={newTodo.title}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="description"
                    className="border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md"
                    placeholder="Description"
                    value={newTodo.description}
                    onChange={handleInputChange}
                />
                <button
                    className="bg-gradient-to-tl from-green-300 via-blue-500 to-purple-600 text-white rounded-md px-4 py-2 hover:from-green-400 hover:via-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md"
                    onClick={handleAddItem}
                >
                    Add Item
                </button>
            </div>
            <ul className="space-y-4 mt-8">
                {todoList.map(todo => (
                    <SwipeToDelete onSwipe={() => handleDeleteItem(todo.id)}>
                        <li key={todo.id}
                            className="flex items-center bg-white shadow rounded-md p-4 mb-2 max-w-md mx-auto">
                            <div>
                                <h3 className="text-lg font-semibold">{todo.title}</h3>
                                <p>{todo.description}</p>
                            </div>
                            <button
                                className="ml-auto bg-transparent text-purple-600 rounded-full w-6 h-6 flex items-center justify-center hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                onClick={() => handleDeleteItem(todo.id)}
                            >
                                <CrossSmallIcon/>
                            </button>
                        </li>
                    </SwipeToDelete>
                ))}
            </ul>
        </div>
    );
}


export function CrossSmallIcon(
    props: JSX.IntrinsicElements['svg'],
) {
    return (
        <svg
            {...props}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 4L12 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4 12L12 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}