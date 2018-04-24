import {createStore} from 'redux';
import React from 'react';


const ADD_GUN = 'ADD_GUN'
const REMOVE_GUN = 'REMOVE_GUN'

// 接受程序的当前状态(state)以及发生的action
//一般来说state有个初始值，但是没有也可以

export function counter(state=10, action){
    console.log('执行了counter');
    switch(action.type){
        case ADD_GUN:
            return state+1;
        case REMOVE_GUN:
            return state-1;
        default:
            return 10;
        // 返回修改后的新状态(newState)
    }
}

// 创建一个state用来存储状态树
// createStroe接收三个参数：createStore(reducer, preloadState, enhance)
//reducer为function。当dispatch一个action时，此函数接收action来更新state
//preloadState初始化State
//enhancer 为function。用来增强store, Redux 定义有applyMiddleware来增强store
// 执行了一次counter，但因为没有action，所以执行default，所以return 10;
const store = createStore(counter);

const init = store.getState();

console.log(init);

function listener(){
    const current = store.getState();
    console.log(`现在有机枪${current}`);
}
//订阅listener函数，一旦store有变换就执行一次
store.subscribe(listener);

//分发action
// 执行了一次counter
store.dispatch({type:ADD_GUN});
// 执行了一次counter
store.dispatch({type:ADD_GUN});
// 执行了一次counter
store.dispatch({type:ADD_GUN});
// 执行了一次counter
store.dispatch({type:REMOVE_GUN});

export default class Gun extends React.Component{
    render(){
        return(
            <div>
                <h1 style={{backgroundColor:"deepskyblue",textAlign:"center",color:"white"}}>看控制台</h1>
            </div>
        )
    }
}