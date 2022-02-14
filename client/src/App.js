import React, {Component} from 'react';
import Customer from './components/Customer';
import './App.css';
import { Paper } from '@mui/material';
import { Table } from '@mui/material'; // material ui 프레임워크. 과거 부트스트랩과 비슷. css 없이.
import { TableHead } from '@mui/material';
import { TableBody } from '@mui/material';
import { TableRow } from '@mui/material';
import { TableCell } from '@mui/material';
import { CircularProgress } from '@mui/material';

const styles = theme => ({ // 안됨
  root: {
    width: '100%'
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
})

/*
리액트의 컴포넌트 라이프 사이클
1. constructor 
2. componentWillMount : 컴포 마운트 전에
3. render : 실제 컴포를 화면에 그리고
4. componentDidMount
*/

class App extends Component {
/* 고객 정보를 서버에 접속해 가져오자.
고객 정보는 프로그램 동작 과정중에서 변경될수있는 데이터.
=> state
props는 변경될 수 없는 데이터에 사용
*/
  state = { // 컴포 내에서 변경될수 있는 변수 -> state
    customers: "",
    completed: 0,
    progress: 0
  }

  /*progress = () => {
    const { completed } = this.state;
    this.setState({completed: completed >= 100 ? 0 : completed + 1}); // 100 되는 순간 0으로 줄어들고 그렇지 않으면 1씩 증가
  }*/

  // 여기서 api 비동기적 호출
  /*componentDidMount() { // 모든 컴포넌트 마운트 완료 되었을 때 실행
    this.timer = setInterval(this.progress, 20);
    this.callApi() // body변수 받아서 state로 설정
    .then(res => this.setState({customers:res})) // then에서 그 이름이 res로 바뀜. 상태변화
    .catch(err => console.log(err));
  }*/


  componentDidMount() { // 모든 컴포넌트 마운트 완료 되었을 때 실행
    this.timer = setInterval(() => {
      this.setState({progress : this.state.progress >= 100 ? 0 : this.state.progress + 1}); // 100 되는 순간 0으로 줄어들고 그렇지 않으면 1씩 증가
    });
    //this.callApi() // body변수 받아서 state로 설정
    //.then(res => this.setState({customers:res})) // then에서 그 이름이 res로 바뀜. 상태변화
    //.catch(err => console.log(err));
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
            }) : 
            <TableRow>
              <TableCell colSpan="6" align='center'>
                <CircularProgress/>
              </TableCell>
            </TableRow>
          }
       </TableBody>
       </Table>
       
     </Paper>
   );
 }
}

export default App;
//export default withStyles(styles)(App);