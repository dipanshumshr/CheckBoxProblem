import { nanoid } from "nanoid"
import { useRef, useState } from "react"
import Children from "./children";
import { useReducer } from "react";

export function Parent() {
    const [parentCheck, setParentCheck] = useState(false)
    const [checkChildren, setChildren] = useState([{
        id: nanoid(5),
        checked: false
    }, {
        id: nanoid(5),
        checked: false
    }, {
        id: nanoid(5),
        checked: false
    }])

    const ref = useRef(null)

    function handleParent(e) {
        const boolean = e.target.checked;

        setParentCheck(boolean)
        setChildren(prev => prev.map(val => ({ ...val, checked: boolean })))

        // setChildren(prev => {for(let i = 0; i<prev.length ; i++)
        // {
        //   return   {...prev[i], checked : boolean}
        // }})
    }


    function handleCheck(e, id) {


        const boolean = e.target.checked 
        // setChildren(prev => prev.map(prev => prev.id === id ? { ...prev, checked: boolean } : prev))  //As mithilesh suggested i used the stale state since react updates states in batches it doesn't immediately updates the state  
 
        const updatedState = checkChildren.map((prev) => prev.id === id ? { ...prev, checked: boolean } : prev); 

        setChildren(updatedState)


        for (let i in updatedState) {
            if (!updatedState[i].checked) {
                setParentCheck(false)
                return
            }
        }

        setParentCheck(true);
    }

    return (
        <div>
            <label>Parent</label>
            {/* Here i used it as value earlier due to that it was causing the issue  */}
            <input type="checkbox" checked={parentCheck} onChange={handleParent} /> 
            {checkChildren.map(child =>(
                <div key={child.id}>
                    <label> child</label>
                    <Children oncheck={handleCheck} data={child} />
                </div>
            ))}
        </div>)
}
