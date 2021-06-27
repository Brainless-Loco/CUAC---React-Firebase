import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { CardMedia } from '@material-ui/core';

const AddInventoryItem = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenDialog = () => {
        setIsOpen(true);
    }

    const handleCloseDialog = () => {
        setIsOpen(false);
    }

    return (
        <div>
            <Button varient='outlined' onClick={handleOpenDialog}>
                Add new Item
            </Button>
            <Dialog open={isOpen} onClose={handleCloseDialog}>
                <DialogTitle>Item Information Form</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        label='Item name'
                        type='text'
                        fullWidth />
                    <TextField
                        margin='dense'
                        label='Item description'
                        type='text'
                        fullWidth />
                    <Card>
                        <CardMedia image='todo' ></CardMedia>
                        <CardContent>
                            <div>TODO</div>
                        </CardContent>
                    </Card>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddInventoryItem;