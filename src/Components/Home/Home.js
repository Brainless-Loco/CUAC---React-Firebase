import React from 'react';
import { CollectionNames } from '../../Utilities/Constants';
import { getCollection } from '../../Utilities/FirebaseUtils';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {slides: []};
    }

    componentDidMount() {
        const data = Promise.resolve(getCollection(CollectionNames.slides));
        const tempSlides = [];

        data.then((object) => {
            object.forEach(item => {
                tempSlides.push(item.img_link);
            });

            // Notify the state change to render them.
            this.setState({slides: tempSlides});
        })
    }

    componentDidUpdate() {
        // Code
    }
    
    render() {
        return (
            <div>
                This is Home

                {/* This section is to test the fetched data from the firebase. */}
                {
                    this.state.slides.map((link, idx) => {
                        return(
                            <div key={idx}>
                                <p>{idx + 1}: Image link{link}</p><br/>
                                <img src={link}/>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default Home;