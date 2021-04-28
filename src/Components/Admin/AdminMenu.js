import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import { firestore } from '../../Firebase';
import { CollectionNames, Constants } from '../../Utilities/Constants';

class AdminMenu extends React.Component {
    render() {
        return (
            <div>
                <p>Menu</p>
                <ul>
                    <li>
                        <Link to='/admin/member-db'>Member database</Link>
                    </li>
                    <li>
                        <Link to='#'>Event database</Link>
                    </li>
                    <li>
                        <Link to='#'>Photo database</Link>
                    </li>
                    <li>
                        <Link to='#'>Blog database</Link>
                    </li>
                    <li>
                        <Link to='#'>Inventory</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export const MemberDbMenu = () => {
        return (
        <div>
            <Link to='/admin/'>Back</Link><br></br>
            <Link to='/admin/'>Dashboard</Link><br></br>
            <p>Member database menu</p>
            <ul>
                <li>
                    <Link to='/admin/pending-members'>Pending members</Link>
                </li>
                <li>
                    <Link to='/admin/members'>View all members</Link>
                </li>
            </ul>
        </div>
    );
}

class PendingMembers extends React.Component{
    // Keep a history of visited first nodes
    nodeStack = [];

    constructor(props) {
        super(props);
        this.state = {numberOfPages: 0, page: 1, pendingMembers: null, isFetchingData: true, lastNode: null, firstNode: null};
    }

    componentDidMount() {
        this.getTotalNumberOfPages();

        this.getPageData('next');
    }

    getPageData = async (scrollType) => {
        //console.log(msg + ' ' + this.state.page);
        this.setState({isFetchingData: true});

        // Get pending member data starting from a cursor with a limited number.
        const data = [];
        const collRef = firestore.collection(CollectionNames.pending_members);
        
        let query;
        if(scrollType === 'next') {
            query = collRef.orderBy('firstName')
                        .startAfter(this.state.lastNode)
                        .limit(Constants.dataLimitSM);
        }
        else {
            this.nodeStack.pop();

            query = collRef.orderBy('firstName')
                            .startAt(this.nodeStack[this.nodeStack.length - 1])
                            .limit(Constants.dataLimitSM);
            
            if(this.nodeStack.length) this.nodeStack.pop();
        }

        await query.get().then((snapshot) => {
            snapshot.docs.forEach((obj) => {
                data.push(obj.data());
            });

            this.setState({pendingMembers: data, isFetchingData: false, firstNode: snapshot.docs[0], lastNode: snapshot.docs[snapshot.docs.length - 1]});
            this.nodeStack.push(snapshot.docs[0]);
            console.log('first node: ' + this.state.firstNode.data().firstName + 
                        ' last node: ' + this.state.lastNode.data().firstName + 
                        ' node stack: ' + this.nodeStack[this.nodeStack.length - 1].data().firstName);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    getTotalNumberOfPages() {
        const sizeRef = firestore.collection(CollectionNames.collection_counter).doc(CollectionNames.pending_members);

        // Asynchronously get data from the firestore.
        // Get total sizze of the collection
        sizeRef.get().then((doc) => {
            if (doc.exists) {
                this.setState({ numberOfPages: Math.ceil(doc.data().size / 10) });
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
        if(!this.state.numberOfPages || this.state.isFetchingData) return <p>Loading...</p>;

        return (
            <div>
                <Link to='/admin/member-db'>Back</Link><br></br>
                <Link to='/admin/'>Dashboard</Link><br></br>
                <p>Currently at page: {this.state.page}</p>

                <table>
                    <thead>
                        <tr>
                            <td>Index</td>
                            <td>First name</td>
                            <td>Last name</td>
                            <td>Student ID</td>
                            <td>Department</td>
                            <td>Avatar</td>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Render fetched data in the table. */}
                        {
                            this.state.pendingMembers.map((val, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{val.firstName}</td>
                                        <td>{val.lastName}</td>
                                        <td>{val.studentID}</td>
                                        <td>{val.department}</td>
                                        <td><img src={val.imageLink} width='64px' height='64px'></img></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <Pagination 
                    count={this.state.numberOfPages} 
                    page={this.state.page} 
                    variant='outlined' 
                    shape='rounded'
                    onChange={this.handlePageScroll}/>
            </div>
        );
    }
}

export const MembersList = () => {
    return (
        <div>
            <Link to='/admin/member-db'>Back</Link><br></br>
            <Link to='/admin/'>Dashboard</Link><br></br>
            <h3>TODO:</h3>
            <ol>
                <li><strong>Fetch data from firestore.</strong></li>
                <li><strong>Implement pagination.</strong></li>
                <li><strong>Mutate database accordingly.</strong></li>
            </ol>
        </div>
    );
}

export default AdminMenu;
export {PendingMembers};