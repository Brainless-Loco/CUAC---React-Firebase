import React from 'react';
import { Helmet } from 'react-helmet';
import './Blogs.css';
// import Pagination from '@material-ui/lab/Pagination';
import { CollectionNames, Constants } from '../../Utilities/Constants';
import { firestore } from '../../Firebase';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { Fragment } from 'react';

class Blogs extends React.Component{


    constructor(props) {
        
        $('.header').addClass("bg-color-1");
        $('.header .logo').addClass("bg-color-1");
        super(props);

        this.state = {numberOfPages: 0, page: 1, isFetchingData: true, data: [], lastNode: null, firstNode: null};
        this.nodeStack = [];
    }

    componentDidMount() {
        this.getTotalNumberOfPages();

        this.getPageData('next');
    }

    getPageData = async (scrollType) => {
        //console.log(msg + ' ' + this.state.page);
        this.setState({isFetchingData: true});

        if(scrollType === 'next') {
            this.getNextPage();
        }
        else {
            this.getPreviousPage();
        }
    }

    getNextPage = async () => {
        // Get pending member data starting from a cursor with a limited number.
        const data = [];
        const collRef = firestore.collection(CollectionNames.blogs);

        const query = collRef.orderBy('createdAt', 'desc')
                            .startAfter(this.state.lastNode == null ? '' : this.state.lastNode.title)
                            .limit(Constants.dataLimitSM);
        
        await query.get().then((snapshot) => {
            snapshot.docs.forEach((obj) => {
                data.push(obj);
            });
            
            //data.sort((a, b) => {return a.data().createdAt > b.data().createdAt;});
            this.setState({data: data, isFetchingData: false, firstNode: snapshot.docs[0], lastNode: snapshot.docs[snapshot.docs.length - 1]});
            if(snapshot.docs.length) this.nodeStack.push(snapshot.docs[0]);
            console.log('first node: ' + this.state.firstNode.data().title + 
                        ' last node: ' + this.state.lastNode.data().title + 
                        ' node stack: ' + this.nodeStack[this.nodeStack.length - 1].data().title);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    getPreviousPage = async () => {
        // Get pending member data starting from a cursor with a limited number.
        const data = [];
        const collRef = firestore.collection(CollectionNames.blogs);

        this.nodeStack.pop();
        
        const query = collRef.orderBy('createdAt', 'desc')
                            .startAt(this.nodeStack[this.nodeStack.length - 1])
                            .limit(Constants.dataLimitSM);
        
        if(this.nodeStack.length) this.nodeStack.pop();


        await query.get().then((snapshot) => {
            snapshot.docs.forEach((obj) => {
                data.push(obj);
            });

            //data.sort((a, b) => {return b.data().createdAt - a.data().createdAt;});
            this.setState({data: data, isFetchingData: false, firstNode: snapshot.docs[0], lastNode: snapshot.docs[snapshot.docs.length - 1]});
            if(snapshot.docs.length) this.nodeStack.push(snapshot.docs[0]);
            console.log('first node: ' + this.state.firstNode.data().title + 
                        ' last node: ' + this.state.lastNode.data().title + 
                        ' node stack: ' + this.nodeStack[this.nodeStack.length - 1].data().title);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    getTotalNumberOfPages() {
        const sizeRef = firestore.collection(CollectionNames.collection_counter).doc(CollectionNames.blogs);
    
        // Asynchronously get data from the firestore.
        // Get total sizze of the collection
        sizeRef.get().then((doc) => {
            if (doc.exists) {
                this.setState({ numberOfPages: Math.ceil(doc.data().size / Constants.dataLimitSM) });
                console.log('Pending members count: ' + doc.data().size);
            } else {
                console.log(`Error! Collection size references ${{ collection: CollectionNames.collection_counter, Document: CollectionNames.pending_members }} does not exist.`);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    handlePageScroll = async (e, val) => {
        if(val < this.state.page) {
            for(let i = val ; i < this.state.page ; i++) await this.getPageData('prev');
        } else {
            for(let i = this.state.page ; i < val ; i++) await this.getPageData('next');
        }
    
        this.setState({page: val});
    }
    
    render() {
        var CommonHTML =(
                        <Fragment>
                            <Helmet>
                                <title>Blogs | CUAC</title>
                            </Helmet>
                             <h1 className="display-4 mt-0 font-weight-bold text-color1 text-center py-2">Welcome to CUAC Blogs</h1>
                        </Fragment>);
        console.log(this.props.location.search);
        if(this.state.isFetchingData || !this.state.numberOfPages) {
            return(
                <div className="Blogs">
                    {CommonHTML}
                    <p>Loading...</p>
                </div>
            );
        } else {
            return(
                <div className="Blogs">
                   {CommonHTML}
                    <div className="d-flex flex-wrap justify-content-center">
                        {this.state.data.map((val, idx) => {
                            return (
                                <div className="blogSample col-md-5 col-lg-4 col-xl-3" key={idx}>
                                    <div className="blog-banner">
                                        <img src="Image/logo.png" alt="" />
                                    </div>
                                    <Link to={location => `/view-blog?viewId=${val.id}`} className="blog-title mb-0 pb-0 float-left">{val.data().title}</Link>
                                    <p className="my-1 blog-basic-desc text-left">
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste modi est esse quod voluptas similique.... 
                                        <Link to={location => `/view-blog?viewId=${val.id}`}  className="mx-1 read-full rounded">Full Blog</Link> 
                                    </p>
                                     <small className="float-left text-dark font-weight-700">{val.data().published}</small>   
                                    {/* <Link>View</Link> */}
                                </div>
                            )
                        })}
                        {/* <Pagination
                            count={this.state.numberOfPages} 
                            page={this.state.page} 
                            variant='outlined' 
                            shape='rounded'
                            onChange={this.handlePageScroll}>

                        </Pagination> */}
                    </div>
                </div>
            );
        }
    }
}

export default Blogs;