import React, {Component} from 'react';
import Customer from './components/Customer';
import './App.css';
import { Paper } from '@mui/material';
import { Table } from '@mui/material'; // material ui 프레임워크. 과거 부트스트랩과 비슷. css 없이.
import { TableHead } from '@mui/material';
import { TableBody } from '@mui/material';
import { TableRow } from '@mui/material';
import { TableCell } from '@mui/material';

const styles = theme => ({ // 안됨
  root: {
    width: '100%'
  }
})



class App extends Component {
/* 고객 정보를 서버에 접속해 가져오자.
고객 정보는 프로그램 동작 과정중에서 변경될수있는 데이터.
=> state
props는 변경될 수 없는 데이터에 사용
*/
  state = { // 컴포 내에서 변경될수 있는 변수 -> state
    customers: ""
  }

  componentDidMount() { // 모든 컴포넌트 마운트 완료 되었을 때 실행
    this.callApi() // body변수 받아서 state로 설정
    .then(res => this.setState({customers:res})) // then에서 그 이름이 res로 바뀜
    .catch(err => console.log(err));
  }

  callApi = async () => { // 접속하고자 하는 api 주소 넣음
    const response = await fetch('/api/customers'); ////////////
    const body = await response.json() // 고객 목록 json 형태로 출력 됨.
    return body;
  }

 render() {
   //const {classes} = this.props;
   return (
     <Paper>
       <Table>
       <TableHead>
         <TableRow>
           <TableCell>번호</TableCell>
           <TableCell>이미지</TableCell>
           <TableCell>이름</TableCell>
           <TableCell>생년월일</TableCell>
           <TableCell>성별</TableCell>
           <TableCell>직업</TableCell>
         </TableRow>
       </TableHead>
         <TableBody>
          { // 처음 실행시에는 비어있으므로
            this.state.customers ? this.state.customers.map(c => {
              return (
              <Customer
                key = {c.id} // map이용시 key
                id = {c.id}
                image = {c.image}
                name = {c.name}
                birthday = {c.birthday}
                gender = {c.gender}
                job = {c.job} />
              )
            }) :  ""
          }
       </TableBody>
       </Table>
       
     </Paper>
   );
 }
}

export default App;
//export default withStyles(styles)(App);