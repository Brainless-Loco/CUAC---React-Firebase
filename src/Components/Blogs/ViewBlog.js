import React from 'react';
import { firestore } from '../../Firebase';
import { CollectionNames } from '../../Utilities/Constants';
import './ViewBlog.css';

class ViewBlog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {docID: this.props.location.search.substr(8), isFetchingData: true, article: ''};

        this.articleContainerRef = React.createRef();
    }

    componentDidMount() {
        this.fetchBlog(this.state.docID);
    }

    fetchBlog = async (docID) => {
        const collref = firestore.collection(CollectionNames.blogs);
        console.log(docID);
        const docRef = collref.doc(docID);

        await docRef.get().then((snapshot) => {
            this.setState({isFetchingData: false, article: snapshot.data().markup});
            this.articleContainerRef.current.innerHTML = this.state.article;
        })
        .catch((error) => console.log(error));
    }

    render() {
        if(this.state.isFetchingData) {
            return (
                <div className="article">
                    Loading query...
                    <p>{this.props.location.search}</p>
                </div>
            );
        } else {
            if(this.state.article.length) {
                return (
                    <div className='article'>
                        <div ref={this.articleContainerRef} className='container'></div>
                    </div>
                );
            } else {
                return (
                    <div>
                        <br></br><br></br>
                        <br></br><br></br>
                        <p>Oops! Something went wrong!</p>
                    </div>
                );
            }
            
        }
    }
}

export default ViewBlog;