import { useState } from "react"
function Children({oncheck , data})
{

    function handleChange(e, id)
    {
        oncheck(e, id)
    }

    return <input type="checkbox" checked={data.checked} onChange={(e) => handleChange(e , data.id)}/>
}

export default Children