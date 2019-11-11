import React from 'react'
import "./app.css"
import Header from '../header/header'
import List from '../list/list'
import Footer from '../footer/footer'
import Filter from "../filter/filter"
import Search from "../search/search"
const data = [
  {title: "drink coffee", important: false, done: false, id: 1},
  {title: "go to bed", important: false, done: false, id: 2},
  {title: "eat pizza", important: false, done: false, id: 3},
  {title: "go for a walk", important: false, done: false, id: 4},
];

class App extends React.Component {

  state = {
    list: data,
    filter: false,
    search: false
  };

  add = (value) => {
    if(value === "") return;
    this.setState({
      list: [
        ...this.state.list,
        {title:value, important: false, done: false}
      ]
    })
  };


  changeList = (search) => {
    this.setState({search});
  }
  searchFunc = (list, search) => {
    if(!search) return list;  
    return list.filter(e => {
      return e.title.toLowerCase().indexOf(search.toLowerCase()) !== -1  
  });
  }

  changeStatus = (id, name) => {
    const { list=[] } = this.state;
    list.some((el) => {
      if(el.id === id) el[name] = !el[name];
    });
    this.setState({list})
  };

  remove = (id) => {
    const {list} = this.state;
    const index = list.findIndex(el => el.id === id);
    const newArr = [
        ...list.slice(0, index),
        ...list.slice(index+1, list.length)
    ];
    this.setState({list: newArr})
  };

  filterFunc = (type) => {
    let filter = false;
    if(type !== "all") filter = type;
    this.setState({filter})
  };

  useFilter = (list, filter) => {
    if(!filter) return list;
    const newArr = list.filter(el => {
      return el[filter]
    });
    return newArr
  };

  render(){
    const { list, filter, search } = this.state;
    const newCount = list.length;
    let newList = this.useFilter(list, filter);
    newList = this.searchFunc(newList, search);
    
    return(
      <div className={`wrap`}>
        <div className={"main-container"}>
          <Search changeList={this.changeList}/>
          <Header count = {newCount}/>
          <Filter  filterFunc = {this.filterFunc} filter={filter}/>
          <List
              data={newList}
              changeStatus={this.changeStatus}
              remove = {this.remove}/>
          <Footer add={this.add}/>
        </div>
      </div>
    )
  }
}

export default App


