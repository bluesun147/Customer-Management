import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";

class CustomerDelete extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    deleteCustomer(id) { // 아이디가 id인 고객 삭제
        // api/customers/7
        const url = 'api/customers/' + id;
        fetch(url, { // 해당 url에 접속해서 delete
            method: 'DELETE'
        });
        // 삭제가 이뤄지고 새로 목록 출력
        this.props.stateRefresh();
    }
    
    render() {
        return (
            <div>
                <Button variant = "contained" color = 'secondary' onClick={this.handleClickOpen}>삭제</Button>
                <Dialog open = {this.state.open} onClose = {this.handleClose}>
                <DialogTitle onClose = {this.handleClose}>
                        삭제 경고
                    </DialogTitle>
                        
                    <DialogContent>
                        <Typography gutterBottom>
                            선택된 고객 정보가 삭제됩니다.
                        </Typography>
                    </DialogContent>

                    <DialogActions>
                        <Button variant = 'contained' color='primary' onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</Button>
                        <Button variant = 'outlined' color='primary' onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog> 
            </div>
        )
    }
}

export default CustomerDelete;