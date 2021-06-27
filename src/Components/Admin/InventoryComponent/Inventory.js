import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { CollectionNames, Constants } from '../../../Utilities/Constants';
import { firestore } from '../../../Firebase';
import ReactPaginate from 'react-paginate';
import AddInventoryItem from './AddInventoryItem';

const Inventory = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [data, setData] = useState([]);
    const [previousPage, setPreviousPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const dataLimit = Constants.dataLimitSM;

    useEffect(() => {
        // Code
        getPageCount();
        getData();
    }, [pageCount, currentPage, previousPage]);

    const getPageCount = async () => {
        if(pageCount) return;

        const sizeRef = firestore.collection(CollectionNames.collection_counter).doc(CollectionNames.inventory);

        sizeRef.get().then((doc) => {
            setPageCount(Math.ceil(doc.data().size / dataLimit));
        }).catch((error) => console.log(error.message));
    }

    const getData = async () => {
        if(!pageCount || isFetching || currentPage * dataLimit < data.length) return;

        setIsFetching(true);

        const collRef = firestore.collection(CollectionNames.inventory);
        const query = collRef.orderBy('itemName')
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
        const selected = data?.selected ?? 0;
        setCurrentPage(selected);
    }

    return(
        <div className='wrapper'>
            <Link to='/admin/'>Back</Link><br></br>
            <Link to='/admin/'>Dashboard</Link><br></br>
            {(isFetching || !pageCount) && <p>Loading...</p>}
            {pageCount && 
                <div>
                    {!isFetching && 
                        <div>
                            {data.map((obj, idx) => {
                                const idxVal = idx - dataLimit * currentPage;
                                return (idxVal >= 0 && idxVal < dataLimit) ?
                                    <p key={idx}>Item {idx}: {obj.data().itemName}</p> : null;
                            })}                            
                        </div>}
                        
                    <AddInventoryItem/>

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

export default Inventory;