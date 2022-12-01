import { useState, useEffect } from "react"; //use effect allows for prepopulated data
import { useNavigate, useParams } from "react-router-dom"; //refrenced below 
import { 
        getTaskById, 
        updateTaskById 
    } from "../services/internalApiService";
//imports the function from that file
//exports  function
export const EditTask = (props) => {
    //url route param matching 'id'
    const { id } = useParams();
    const navigate = useNavigate(); //creates navigation obj using useNav hook

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        getTaskById(id) //takes id from parameters above
        .then((data) => {
                const { name, description } = data.results; //destructuring following set lines
                console.log("data is", data.results)
                setName(name);
                setDescription(description);
            })
            .catch(err =>{
                console.log(err)
            });
        },[id]);

    const handleUpdateTaskById = (event) => {
        event.preventDefault();
        //creates a new Task obj using state
        // name: name, is longhand but the key and var name match..
        const updatedTask = {
            name,
            description
        };

        updateTaskById(id, updatedTask)
            .then((data) => {
                console.log(`updated task data: ${data}`);
                navigate(`/tasks`);
            })
            .catch((error) => {
                console.log(`uh oh: ${error}`);
            });
        };

    return (
        <div className="w-50 p-4 rounded mx-auto shadow form">
            <h3 className="text-center">Update Task {name} </h3>
            {/* form onSubmit function defined  above  */}
            <form
                onSubmit={(e) => {
                    handleUpdateTaskById(e)
                }}
            >
                <div className="form-group">
                    <label className="h6">Name</label>
                    <input
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                        type="text"
                        className="form-control"
                        value = {name}
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
                        value = {description}
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
export default EditTask;
