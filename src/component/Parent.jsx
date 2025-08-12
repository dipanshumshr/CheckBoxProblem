import { nanoid } from "nanoid"
import { useRef, useState } from "react"
import Children from "./children";
import { useReducer } from "react";

export function Parent() {
    const [parentCheck, setParentCheck] = useState(false)
    const [checkChildren, setChildren] = useState(useState([
        { id: nanoid(5), checked: false, subChildren: [] },
        {
            id: nanoid(5),
            checked: false,
            subChildren: [
                { id: nanoid(5), checked: false },
                { id: nanoid(5), checked: false }
            ]
        }
    ]))

    useEffect(() => {
    for (let i = 0; i < checkChildren.length; i++) {
        const child = checkChildren[i];
        if (child.subChildren) {
            for (let j = 0; j < child.subChildren.length; j++) {
                if (!child.subChildren[j].checked) {
                    setParentCheck(false);
                    return
                }
            }
            if (!child.checked) {
                setParentCheck(false)
            }
        } else if (!child.checked) {
            setParentCheck(false)
        }
    }

    setParentCheck(true);
}, [checkChildren]);

    function handleParent(e) {
        const boolean = e.target.checked;
        setParentCheck(boolean);
        setChildren(prev => prev.map(child => ({
            ...child, checked: boolean,
            subChildren: child.subChildren
                ? child.subChildren.map(sub => ({ ...sub, checked: boolean }))
                : child.subChildren
        })));

        // setChildren(prev => {for(let i = 0; i<prev.length ; i++)
        // {
        //   return   {...prev[i], checked : boolean}
        // }})
    }


    function handleCheck(e, id, isSub = false, parentId = null) {


        const boolean = e.target.checked
        // setChildren(prev => prev.map(prev => prev.id === id ? { ...prev, checked: boolean } : prev))  //As mithilesh suggested i used the stale state since react updates states in batches it doesn't immediately updates the state  

        setChildren(prev => prev.map(child => {
            if (isSub && child.id === parentId) {
                const updatedSubs = child.subChildren.map(sub =>
                    sub.id === id ? { ...sub, checked: boolean } : sub
                );
                let parentChecked = true;
                for (let i = 0; i < updatedSubs.length; i++) {
                    if (!updatedSubs[i].checked) {
                        parentChecked = false;
                        break;
                    }
                }
                return { ...child, subChildren: updatedSubs, checked: parentChecked };
            }

            if (!isSub && child.id === id) {
                return {
                    ...child,
                    checked: boolean,
                    subChildren: child.subChildren
                        ? child.subChildren.map(sub => ({ ...sub, checked: boolean }))
                        : child.subChildren
                };
            }
            return child;
        }));
    }

    return (
        <div>
            <label>Parent</label>
            <input type="checkbox" checked={parentCheck} onChange={handleParent} /> 
            {checkChildren.map(child => (
                <div key={child.id}>
                    <label>Child</label>
                    <Children oncheck={(e) => handleCheck(e, child.id)} data={child} />
                    
                    {child.subChildren && child.subChildren.map(sub => (
                        <div key={sub.id} style={{ marginLeft: "40px" }}>
                            <label>Subchild</label>
                            <Children 
                                oncheck={(e) => handleCheck(e, sub.id, true, child.id)} 
                                data={sub} 
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}