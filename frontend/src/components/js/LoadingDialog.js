import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import LinearProgress from "@material-ui/core/LinearProgress";
import MuiDialogContent from '@material-ui/core/DialogContent';
import Divider from "@material-ui/core/Divider";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
}))(MuiDialogContent);

export default function LoadingDialog(props) {

    return (
            <Dialog
                open={props.isfetching}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
                fullWidth={true}
            >
                <DialogTitle >{"Fetching data..."}</DialogTitle>
                <Divider />
                <DialogContent>
                    <LinearProgress variant="indeterminate"/>
                </DialogContent>
            </Dialog>
    );
}
