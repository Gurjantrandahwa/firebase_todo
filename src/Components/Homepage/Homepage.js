import React, {useEffect, useState} from "react";
import "./Homepage.css";
import {signOut, onAuthStateChanged} from "firebase/auth";
import {auth, db} from "../../Common/firebase";
import {useNavigate} from "react-router-dom";
import {uid} from "uid";
import {set, ref, onValue, remove, update} from "firebase/database";
import {Button, IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';


export default function Homepage() {
    const [todo, setTodo] = useState("")
    const [todos, setTodos] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [tempUidd, setTemUidd] = useState("")
    const navigate = useNavigate();
    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate("/")
        })
            .catch(err => {
                alert(err.message)
            });
    }
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                onValue(ref(db, `/${auth.currentUser.uid}`), snapshot => {
                    setTodos([]);
                    const data = snapshot.val();
                    if (data !== null) {
                        Object.values(data).map((todo,index)=> {
                            setTodos((oldArray) => [...oldArray, todo])
                        })
                    }
                })
            } else if (!user) {
                navigate("/")
            }
        })
    }, [])
    const writeToDatabase = () => {
        const uidd = uid();
        set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
            todo: todo,
            uidd: uidd
        });
        setTodo("")
    }
    const handleEditConfirm = () => {
        update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
            todo: todo,
            tempUidd: tempUidd
        });
        setTodo("")
        setIsEdit(false)
    }
    const handleDelete = (uid) => {
        remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
    }
    const handleUpdate = (todo) => {
        setIsEdit(true)
        setTodo(todo.todo)
        setTemUidd(todo.uidd)

    }
    return <div className={"homepage"}>
        <input type={"text"}
               className={"add-edit-input"}
               placeholder={"Add Todo..."}
               value={todo}
               onChange={(e) => setTodo(e.target.value)}
        />
        {todos.map(todo=> {
            return <div className={"todo"}>
                <h1>{todo.todo}</h1>
                <div className={"icon-container"}>
                    <EditIcon onClick={() => handleUpdate(todo)} className={"edit-icon"} fontSize={"large"}/>
                    <DeleteIcon onClick={() => handleDelete(todo.uidd)} className={"delete-icon"} fontSize={"large"}/>
                </div>

            </div>

        })}
        {
            isEdit ?(
                <div>
                    <CheckIcon onClick={handleEditConfirm}  className={"check"}/>
                </div> ): (
                    <div>
                            <AddIcon onClick={writeToDatabase} className={"add-button"}/>

                    </div>
                )
        }

        <Button onClick={handleSignOut} className={"logout-btn"}>Sign Out</Button>
    </div>
}