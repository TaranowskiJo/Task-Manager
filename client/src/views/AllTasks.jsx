import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { getAllTasks, deleteTaskById } from "../services/internalApiService";

const AllTasks = (props) =>{
    const [allTasks, setAllTasks] = useState([]);

    useEffect(() => {
        getAllTasks()
            .then(data => {
                console.log(data.results)
                setAllTasks(data.results)
            })
            .catch(error =>[
                console.log(error)
            ])
    },[])

    const handleDelete = (idToDelete) => {
        deleteTaskById(idToDelete)
            .then(data => {
                // There's no reason to stay on the page after the one item being viewed
                // has been deleted.
                console.log("delete and yeet")
                const filteredTasks = allTasks.filter((task) => {
                    return task._id !== idToDelete
            })
            setAllTasks(filteredTasks)
            })
            .catch(err => {
                console.log(err)
            })
        }

    return (
        <div className="base">
            <h2 className="page-title">All Tasks</h2>
            <div className="main-contanier">
                {allTasks.map((task) => {
                    const { _id, name, description} = task;
                    return (
                        <div key={_id} className="task shadow rounded border p-4">
                            <Link 
                                to={`/tasks/${_id}`} className="task-name">
                                    {name}
                            </Link>
                            <p>{description}</p>
                            <div className="task-buttons">
                                <Link to={`/tasks/${_id}/edit`} className="btn btn-sm btn-outline-dark mx-1">
                                    EDIT 
                                </Link>
                                <button onClick={(e => handleDelete(_id))} className="btn btn-sm btn-outline-danger mx-1">
                                    Complete
                                </button>
                            </div>
                        </div>
                        ) } )
                }
            </div>
        </div>
    )

}


export default AllTasks;