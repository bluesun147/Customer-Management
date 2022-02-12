// 고객 컴포넌트
import React from "react";
import { TableCell } from "@mui/material";
import { TableRow } from "@mui/material";

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
            </TableRow>
        )
    }
}

export default Customer;