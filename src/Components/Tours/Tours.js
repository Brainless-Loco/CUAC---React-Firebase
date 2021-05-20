import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import $ from 'jquery';
import './Tours.css';
import AnEvent from '../AnEvent/AnEvent';
import { firestore } from '../../Firebase';
import { CollectionNames, Constants } from '../../Utilities/Constants';

const Tours = () => {
    $('.header').addClass("bg-color-1");
    $('.header .logo').addClass("bg-color-1");

    const [lastNode, setLastNode] = useState(null);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [hasReachedTheEnd, setHasReachedTheEnd] = useState(false);
    const now = new Date();

    const getNextEvents = async () => {
        setIsFetching(true);

        const collRef = firestore.collection(CollectionNames.events);

        const query = collRef.orderBy('happeningAt')
                            .startAfter(lastNode)
                            .where('happeningAt', '>=', now.getTime())
                            .limit(Constants.dataLimitXSM);

        await query.get().then((snapshot) => {
            setIsFetching(false);

            if(!snapshot.docs.length) {
                setHasReachedTheEnd(true);
                return;
            } else {
                if(snapshot.docs.length < Constants.dataLimitXSM) setHasReachedTheEnd(true);
                setLastNode(snapshot.docs[snapshot.docs.length - 1]);
                setUpcomingEvents([...upcomingEvents, ...snapshot.docs]);
            }
        });
    }

    useEffect(() => {
        getNextEvents();
    }, [])

    return (
        <div className="EventsPage">
            <Helmet>
                <title>Events | CUAC</title>
            </Helmet>
            <h1 className="display-4 mt-0 font-weight-bold text-color1 text-center py-2">Upcoming Events</h1>

            {/* Ekhane ekta Map cholbe */}
            {/* Chalailam manchitro */}
            <div className="col-md-9 col-lg-7 mx-auto">
                {isFetching && <p>Loading...</p>}
                {upcomingEvents.map((obj, idx) => {
                    console.log(obj.data());
                    return <AnEvent data={obj.data()} docId={obj.id}></AnEvent>
                })}
            </div>
            <button type='button' className="join-us-button" onClick={getNextEvents} disabled={hasReachedTheEnd || isFetching}>Show more...</button>


        </div>
    );
};

export default Tours;