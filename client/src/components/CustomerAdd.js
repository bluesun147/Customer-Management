// 고객 추가
import React from "react";
import {post} from 'axios'; // 서버와의 통신 목적 라이브러리. post 방식으로 고객 추가 데이터를 서버로 보낼수 있도록

class CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null, // 사용자 프로필 이미지를 file형태로 보낼 수 있게
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
        .then((response) => {
            console.log(response.data);
        })
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        })
        window.location.reload(); // 새로고침
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

    render() {
        return( // 
            <form onSubmit={this.handleFormSubmit} >
                <h1>고객 추가</h1>
                {/* 실제로 서버로 데이터가 전달될때는 name속성 값 기준으로. */}
                프로필 이미지: <input type = "file" name = "file" file = {this.state.file} value = {this.state.fileName} onChange = {this.handleFileChange} /><br/>
                이름: <input type = "text" name = "userName" value = {this.state.userName} onChange = {this.handleValueChange} /><br/>
                생년월일: <input type = "text" name = "birthday" value = {this.state.birthday} onChange = {this.handleValueChange} /><br/>
                성별: <input type = "text" name = "gender" value = {this.state.gender} onChange = {this.handleValueChange} /><br/>
                직업: <input type = "text" name = "job" value = {this.state.job} onChange = {this.handleValueChange} /><br/>
                <button type = "submit">추가하기</button>
            </form>

        )
    }
}

export default CustomerAdd;