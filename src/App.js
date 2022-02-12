import React, {Component} from 'react';
import Customer from './components/Customer';
import './App.css';

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
   return (
     <div>
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
     </div>
   );
 }
}

export default App;