// 고객 컴포넌트
import React from "react";

class Customer extends React.Component {
    render() { // props는 기본적으로 Component가 포함하고 있음
        return (
            <div>
                <CustomerProfile id = {this.props.id} image = {this.props.image} name = {this.props.name}/>
                <CustomerInfo birthday = {this.props.birthday} gender = {this.props.gender} job = {this.props.job}/>
            </div>
        )
    }
}

class CustomerProfile extends React.Component {
    render() { // 사용자의 id, img
        return (
            <div>
                <img src ={this.props.image} alt = "profile" />
                <h2>{this.props.name}({this.props.id})</h2>
            </div>
        )
    }
}

class CustomerInfo extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.birthday}</p>
                <p>{this.props.gender}</p>
                <p>{this.props.job}</p>
            </div>
        )
    }
}

export default Customer;