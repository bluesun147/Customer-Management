import React, {Component} from 'react';
import Customer from './components/Customer';
import './App.css';
import { Paper } from '@mui/material';
import { Table } from '@mui/material'; // material ui 프레임워크. 과거 부트스트랩과 비슷. css 없이.
import { TableHead } from '@mui/material';
import { TableBody } from '@mui/material';
import { TableRow } from '@mui/material';
import { TableCell } from '@mui/material';



const customers = [
 {
 'id': 1,
 'image': 'https://placeimg.com/64/64/1',
 'name' : '홍길동',
 'birthday' : '990101',
 'gender' : '남',
 'job' : '대학생',
},
{
 'id': 2,
 'image': 'https://placeimg.com/64/64/2',
 'name' : '가나다',
 'birthday' : '980101',
 'gender' : '여',
 'job' : '프로그래머',
},
{
 'id': 3,
 'image': 'https://placeimg.com/64/64/3',
 'name' : '이이이',
 'birthday' : '970101',
 'gender' : '남',
 'job' : '디자이너',
},
]

class App extends Component {
 render() {
   const {classes} = this.props;
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
          {
            customers.map(c => {
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
            })
          }
       </TableBody>
       </Table>
       
     </Paper>
   );
 }
}

export default App;
//export default withStyles(styles)(App);