import { AppBar, Dialog, Slide, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import './AnEvent.css';



 

const Transition = React.forwardRef(function Transition(props, ref) {
return <Slide direction="down" ref={ref} {...props} />;
});


const AnEvent = (props) => {

    const {title, bannerLink, happeningAt, detailsMarkup} = props.data;
    const [open, setOpen] = React.useState(false);

    return (
        <div className="AnEvent">
            <div className="EventCover">
                <img src={bannerLink} alt="" srcset="" />
            </div>
            <div className="EventDetails p-2">

                <h2 className="h4 text-white mb-1">{title}</h2>
                <small className="text-white"><i class="fas h5 mb-0 fa-calendar-alt"></i> {new Date(happeningAt).toDateString()} </small>
                {/* Manipulate the details markup. */}
                <div className="text-left mb-1 text-white"> 
                    {detailsMarkup}
                </div>

                {/* I'll work on the 'cost' field later */}

                <h5 className="text-left h5 my-1 text-white">Cost: 1500 BDT Only</h5>
                <button className="full-details-button" onClick={()=>setOpen(true)}>Full Details</button>


                <Dialog className="Eventdialogue" fullScreen open={open} onClose={()=>setOpen(false)} TransitionComponent={Transition}>
                    <AppBar className="d-flex p-2 justify-content-between Appbar">
                        <Toolbar>
                            <Typography variant="h6" className="text-color1 title text-left">
                                Here will be an Event Title 2022
                            </Typography>
                            <butoon className="ml-auto p-4" onClick={()=>setOpen(false)}>
                                <i className="far mt-3 text-color1 h2 fa-times-circle"></i>
                            </butoon>
                        </Toolbar>
                    </AppBar>
                    <div className="content">
                        <div className="col-md-5 float-left">
                            <img src="Image/logo.png" alt="" />
                        </div>
                        <div className="col-md-7 float-left">
                            <h2 className="h2 my-0 title text-color1">{title}</h2>
                            <div className="details-wrapper">
                                {detailsMarkup}
                            </div>
                        </div>
                    </div>
    
                    {/* I'll work on the 'cost' field later */}
    
                    <h5 className="text-left h5 my-1 text-white">Cost: 1500 BDT Only</h5>
                    <button className="full-details-button" onClick={()=>this.setState({open: true})}>Full Details</button>
    
    
                </Dialog>
                </div>
            </div>
    );
};

export default AnEvent;