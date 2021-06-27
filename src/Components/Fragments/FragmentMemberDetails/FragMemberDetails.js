import React, { useEffect, useState } from 'react';

const FragMemberDetails = (props) => {
    const [data, setData] = useState(null);
    const [errFlag, setErrFlag] = useState(false);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        if(!props.data) setErrFlag(true);
        setData(props.data);
        setIsPending(props.isPending ? props.isPending === true : false);
    }, [])
    return(
        <div>
            {data &&
                <div>
                    <img width='128px' height='128px' src={data.imageLink}/><br></br>
                    <p>Name: {`${data.firstName} ${data.lastName}`}</p>
                    <p>SID: {data.studentID}</p>
                    <p>Department: {data.department}</p>
                    {isPending && <p>Pending approval</p>}
                </div>
            }
            {!data && <div><p>Loading...</p>{errFlag && <p>An error occured while parsing data.</p>}</div>}
            
        </div>
    );
}

export default FragMemberDetails;