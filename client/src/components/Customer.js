// 고객 컴포넌트
import React from "react";
import { TableCell } from "@mui/material";
import { TableRow } from "@mui/material";
import CustomerDelete from "./CustomerDelete";

class Customer extends React.Component {
    render() { // props는 기본적으로 Component가 포함하고 있음
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src = {this.props.image} alt = "profile"/></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.birthday}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.job}</TableCell>
                {/* 부모 컴포넌트에서 넘어온 stateRefresh 함수 그내로 넘겨주면 됨 */}
                <TableCell><CustomerDelete stateRefresh = {this.props.stateRefresh} id = {this.props.id}/></TableCell>
            </TableRow>
        )
    }
}

export default Customer;