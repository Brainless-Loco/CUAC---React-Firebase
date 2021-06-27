import React, { useCallback, useEffect, useRef, useState } from 'react';
import { firestore } from '../../../Firebase';
import { CollectionNames, Constants } from '../../../Utilities/Constants';
import AnEvent from '../../AnEvent/AnEvent';
import FragmentEvent from '../../Fragments/FragmentEvent/FragmentEvent';

const ViewEvents = () => {
    const [events, setEvents] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [hasReachedTheEnd, setHasReachedTheEnd] = useState(false);
    const [lastNode, setLastNode] = useState(null);

    const observer = useRef();
    const lastNodeRef = useCallback(node => {
        if(isFetching) return;

        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && !hasReachedTheEnd) {
                console.log('Visible', node);
                getNextEvents();
            }
        });

        console.log(node);
        if(node) observer.current.observe(node.childNodes[0]);
    }, [isFetching, hasReachedTheEnd]);

    const getNextEvents = async () => {
        setIsFetching(true);
        

        const collRef = firestore.collection(CollectionNames.events);

        const query = collRef.orderBy('happeningAt')
                            .startAfter(lastNode)
                            .limit(Constants.dataLimitXSM);

        await query.get().then((snapshot) => {
            setIsFetching(false);

            if(!snapshot.docs.length) {
                setHasReachedTheEnd(true);
                return;
            } else {
                if(snapshot.docs.length < Constants.dataLimitXSM) setHasReachedTheEnd(true);
                setLastNode(snapshot.docs[snapshot.docs.length - 1]);
                setEvents([...events, ...snapshot.docs]);
            }
        });
    }

    useEffect(() => {
        getNextEvents();
    }, []);

    return (
        <div>
            <strong>TODO: Add view event details feature and options to edit them here.</strong>
            <ul>
                {events.map((obj, idx) => {
                    if(idx < events.length - 1) return <FragmentEvent key={idx} data={obj.data()}></FragmentEvent>
                    else return <FragmentEvent nodeRef={lastNodeRef} key={idx} data={obj.data()}></FragmentEvent>
                })}
            </ul>

            {isFetching && <p>Loading...</p>}
        </div>
    );
}

export default ViewEvents;