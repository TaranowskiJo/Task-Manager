import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { 
        getTaskById, 
        deleteTaskById 
    } from '../services/internalApiService';


const OneTask = (props) => {
    const { id } = useParams(); //pulls id out of the parameters
    const [task, setTask] = useState(null);

    const navigate = useNavigate(); //creates navigation obj using useNav hook

    // console.log(id);
    useEffect(() => {
        getTaskById(id) //takes id from parameters above
            .then(data => {
                console.log("data is", data)
                setTask(data.results)
            })
            .catch(err =>{
                console.log(err)
            })
        },[id])

        const handleDelete = () => {
            deleteTaskById(id)
                .then(data => {
                // There's no reason to stay on the page after the one item being viewed
                // has been deleted.
                console.log("delete and yeet")
                navigate("/tasks")
            })
            .catch(err => {
                console.log(err)
            })
        }
        if(task === null){
            return <h2> nothing to delete </h2>
        }

    const {  name, description } = task;
    return (
        <div className="form w-50 mx-auto shadow mb-4 rounded border p-4 text-center">
            <h1 className="display-3">
                    {name}
            </h1>
            <p>{description}</p>
            <div className="task-buttons">
                <Link to={`/tasks/${id}/edit`} className="btn btn-sm btn-outline-dark mx-1">
                    EDIT 
                </Link>
                <button onClick={(e => handleDelete(id))} className="btn btn-sm btn-outline-danger mx-1">
                    Complete
                </button>
            </div>

        </div>
        
        )

}
//ONLY 1 Defaul per file
export default OneTask;