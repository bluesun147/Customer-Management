// 고객 추가
import React from "react";
import {post} from 'axios'; // 서버와의 통신 목적 라이브러리. post 방식으로 고객 추가 데이터를 서버로 보낼수 있도록
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { withStyles } from "@mui/material";

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});/*
            <form onSubmit={this.handleFormSubmit} >
                <h1>고객 추가</h1> */
                {/* 실제로 서버로 데이터가 전달될때는 name속성 값 기준으로. */}
                /*프로필 이미지: <input type = "file" name = "file" file = {this.state.file} value = {this.state.fileName} onChange = {this.handleFileChange} /><br/>
                이름: <input type = "text" name = "userName" value = {this.state.userName} onChange = {this.handleValueChange} /><br/>
                생년월일: <input type = "text" name = "birthday" value = {this.state.birthday} onChange = {this.handleValueChange} /><br/>
                성별: <input type = "text" name = "gender" value = {this.state.gender} onChange = {this.handleValueChange} /><br/>
                직업: <input type = "text" name = "job" value = {this.state.job} onChange = {this.handleValueChange} /><br/>
                <button type = "submit">추가하기</button>
            </form>
            */

class CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null, // 사용자 프로필 이미지를 file형태로 보낼 수 있게
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false // 현재 다이얼로그 열려있는지 체크 
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
        .then((response) => {
            console.log(response.data);
            // 고객 목록 데이터 불러오는 과정은 비동기적으로 실행됨 => 
            // 고객 데이터 추가한 이후에 고객 목록 불러오는것 순서 보장 못함.
            // 고객을 추가한 '이후에' 서버로부터 응답 받고 비로소 고객 목록 불러오도록 설정해야 함
            // 응답 받고 나서 refresh 하도록.
            this.props.stateRefresh(); // 전체 페이지 새로고침 없이 고객 목록만.
        })
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false // 추가버튼 누르면 자동을 모달창 닫아짐
        })
    }

    handleFileChange = (e) => { // 파일값 변경시 불러올 메서드
        this.setState({
            file: e.target.files[0], // 파일 중 첫번째 것
            fileName : e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () => {
        const url = '/api/customers'; // api 주소로 데이터 보내도록
        const formData = new FormData(); // 
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);

        const config = { // 파일 포함된 데이터 서버로 전송할때는
            headers: { // 웹 표준에 맞는 헤더 추가해야 함.
                'content-type': 'multipart/form-data' // 전달할 데이터에 파일 포함시
            }
        }
        return post(url, formData, config); // axios
    }

    handleClickOpen = () => { // 사용자가 고객 추가버튼 눌러서 고객 추가 모달 창 뜨도록
        this.setState({
            open: true
        });
    }

    handleClose = () => { // 닫기 창 눌렀다면
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        })
    }

    render() {

        const { classes } = this.props;

        return(
            <div>
                <Button variant = "contained" color = "primary" onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>
                <Dialog open = {this.state.open} onClose = {this.handleClose}> 
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <input className = {classes} accept = "image/*" id = "raised-button-file" type = "file" file = {this.state.file} value = {this.state.fileName} onChange = {this.handleFileChange} /><br/>
                        <label htmlFor = "raised-button-file">
                            <Button variant = "contained" color = 'primary' component = 'span' name = 'file'>
                                {this.state.fileName === '' ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <TextField label = "이름" type = "text" name = "userName" value = {this.state.userName} onChange = {this.handleValueChange} /><br/>
                        <TextField label = "생년월일" type = "text" name = "birthday" value = {this.state.birthday} onChange = {this.handleValueChange} /><br/>
                        <TextField label = "성별" type = "text" name = "gender" value = {this.state.gender} onChange = {this.handleValueChange} /><br/>
                        <TextField label = "직업" type = "text" name = "job" value = {this.state.job} onChange = {this.handleValueChange} /><br/>
                    </DialogContent>

                    <DialogActions>
                        <Button variant = "contained" color = 'primary' onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant = "outlined" color = 'primary' onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default CustomerAdd;