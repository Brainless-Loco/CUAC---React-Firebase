import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { firestore } from '../../../Firebase';
import { CollectionNames, Constants } from '../../../Utilities/Constants';
import FragmentBlog from '../../Fragments/FragmentBlog/FragmentBlog';

const ViewBlogsAdmin = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [previousPage, setPreviousPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [data, setData] = useState([]);
    const dataLimit = Constants.dataLimitXSM;

    useEffect(() => {
        getPageCount();
        getData();
        console.log('Pages', 'Previous page: ' + previousPage + ' Current page: ' + currentPage);
    }, [pageCount, currentPage, previousPage]);

    const getPageCount = async () => {
        if(pageCount) return;

        const sizeRef = firestore.collection(CollectionNames.collection_counter).doc(CollectionNames.blogs);

        // Asynchronously get data from the firestore.
        // Get total size of the collection
        sizeRef.get().then((doc) => {

            setPageCount(Math.ceil(doc.data().size / dataLimit));
        }).catch((error) => console.log(error.message));
    }

    const getData = async () => {
        if(isFetching || !pageCount || currentPage * dataLimit < data.length) return;

        setIsFetching(true);
        const collref = firestore.collection(CollectionNames.blogs);

        const query = collref.orderBy('createdAt', 'desc')
                            .startAfter(!data.length ? '' : data[data.length - 1])
                            .limit(dataLimit);
        query.get().then((snapshot) => {
            if(snapshot.docs.length) {
                snapshot.docs.map((data, idx) => console.log(data.data()));

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

    return (
        <div>
            <Link to='/admin/blog-db'>Back</Link><br></br>
            <Link to='/admin/'>Dashboard</Link><br></br>
            {(isFetching || !pageCount) && <p>Loading...</p>}
            {pageCount && 
                <div>
                    {!isFetching && 
                        <div>
                            {data.map((obj, idx) => {
                                const idxVal = idx - dataLimit * currentPage;
                                return (idxVal >= 0 && idxVal < dataLimit) ?
                                    <FragmentBlog data={obj.data()} key={idx}></FragmentBlog> : null;
                            })}                            
                        </div>}
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

export default ViewBlogsAdmin;