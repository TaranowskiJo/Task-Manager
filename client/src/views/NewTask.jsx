import { useState } from "react";
import { useNavigate } from "react-router-dom"; //refrenced below in NewTask()
import { createTask } from "../services/internalApiService";


export const NewTask = (props) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate(); //creates navigation obj using useNav hook


    const handleNewTaskSubmit = (e) => {
        e.preventDefault();

        //creates a new Task obj using state
        const newTask = {
            // name: name, is longhand but the key and var name match..
            name,
            description
        }
    
        // passes this state info into the function createTask from intenalApiServicde
        createTask(newTask)
            //service returns only the data
            //if using axios directly, you need to use res.data
            .then(data =>{
                console.log("new task data: ", data.results) //when in doubt add .results or checkout console on site
                navigate(`/tasks/${data.results._id}`) //calls useNav to navigate us to this url
            })
            //errors may not exist, contitionally added using state
            .catch(error => {
                setErrors(error.response?.data?.errors);
                console.log(error.response)
            })
    }



    return (
        <div className="w-50 p-4 rounded mx-auto shadow form">
        <h3 className="text-center">New Task</h3>
        {/* form onSubmit function defined  above  */}
        <form
            onSubmit={(e) => {
                handleNewTaskSubmit(e)
            }}
        >
            <div className="form-group">
                <label className="h6">Name</label>
                <input onChange={(event) => {
                    setName(event.target.value);}}
                    type="text"
                    className="form-control"
                />
                { 
                    name.length == 0? <p className='text-danger'> </p> :
                        name.length < 2 ?
                            <p className='text-danger'>Must be at least 2 characters in length!</p> : null
                        }
            </div>

            <div className="form-group">
                <label className="h6">Description</label>
                <textarea
                onChange={(event) => {
                    setDescription(event.target.value);
                }}
                    type="text"
                    className="form-control"
                ></textarea>
                { 
                    description == 0? <p className='text-danger'> </p> :
                        description.length < 5 ?
                            <p className='text-danger'> Must be at least 5 characters in length! </p> : null
                        }
            </div>

            <button className="btn btn-sm btn-outline-success mt-3 solo-btn">
                Submit
            </button>
        </form>
    </div>
    )
    
} 
//exports a default
export default NewTask;
