import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { firestore } from '../../../Firebase';
import { CollectionNames, Constants } from '../../../Utilities/Constants';
import FragMemberDetails from '../../Fragments/FragmentMemberDetails/FragMemberDetails';

const ViewPendingMembers = () => {
    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [previousPage, setPreviousPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const dataLimit = Constants.dataLimitSM;

    useEffect(() => {
        getPageCount();
        getData();
    }, [currentPage, previousPage, pageCount]);

    const getPageCount = async () => {
        if(pageCount) return;

        const sizeRef = firestore.collection(CollectionNames.collection_counter).doc(CollectionNames.pending_members);

        // Asynchronously get data from the firestore.
        // Get total size of the collection
        sizeRef.get().then((doc) => {
            setPageCount(Math.ceil(doc.data().size / dataLimit));
        }).catch((error) => console.log(error.message));
    }

    const getData = async () => {
        if(!pageCount || isFetching || currentPage * dataLimit < data.length) return;

        setIsFetching(true);
        const collref = firestore.collection(CollectionNames.pending_members);

        const query = collref.orderBy('firstName')
                            .startAfter(!data.length ? '' : data[data.length - 1])
                            .limit(dataLimit);
        query.get().then((snapshot) => {
            if(snapshot.docs.length) {
                setData([...data, ...snapshot.docs]);
                setIsFetching(false);
                if(previousPage < currentPage) setPreviousPage(previousPage + 1);
            }
        }).catch((error) => {
            setIsFetching(false);
            console.log(error.message);
        });
    }

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    }

    return (
        <div className='wrapper'>
            <Link to='/admin/member-db'>Back</Link><br></br>
            <Link to='/admin/'>Dashboard</Link><br></br>

            {(isFetching || !pageCount) && <p>Loading...</p>}
            {pageCount &&
                <div>
                    {!isFetching && 
                        <div>
                            {data.map((obj, idx) => {
                                const idxVal = idx - dataLimit * currentPage;
                                return (idxVal >= 0 && idxVal < dataLimit) ?
                                    <FragMemberDetails data={obj.data()} isPending={true} key={idx}/> : null;
                            })}
                        </div> 
                    }
                    
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}></ReactPaginate>
                </div>
            }
        </div>
    );
}

export default ViewPendingMembers;