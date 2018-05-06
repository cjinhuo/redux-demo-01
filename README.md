## react-redux的原理
---------------------
### redux demo
有助于理解redux原理的小例子

##### 下载&&启动

<pre><code>cd 新文件夹
git clone git@github.com:TypeInfos/redux-demo-.git
cd redux-demo-/my-app
npm install =>安装package.json中的依赖
npm start  => 查看网页的console
</pre></code>
##### 

#### Redux强调三个基本原则

* 唯一数据源
* 保持状态只读
* 数据改变只能通过纯函数完成（Reducer）

###### 唯一数据源
唯一数据源指的是应用的状态数据应该只存储在唯一的Store上，在Redux中createStore创建了一个状态树，所以的状态都在上面。

###### 保持状态只读
保持状态只读，就是不能直接修改状态，只能通过派发（dispatch）一个动作（action）对象完成，在react中UI=render（state），也就是说UI界面就是把状态渲染出来给用户看，那不能直接修改状态，那要怎么修改？这就引出了第三个原则。
###### 数据改变只能通过纯函数完成
纯函数就是Reducer，Redux这个名字的前三个字母Red代表的就是Reducer。按照创造者的说法，Redux名字的含义就是Redux+Flux。也就是说Reducer是Redux的精髓所在，它让所有state的返回值都是可预测的。

###### reducer
在Reducx中，每个reducer的函数签名应该都是这样：__reducer(state, action)__

第一个参数state是当前的状态，第二个参数action是接收到的action对象，而reducer函数要做的事情就是根据state和action的值产生一个新的对象返回，注意reducer必须是__纯函数__，也就是说函数的返回结果必须完全__由参数state和acion决定__，而且不产生__副作用__，也不能__修改__state和action对象。

###### createStore
上面的reducer是我们自己写的，但createStore是redux提供的函数，这个函数第一个参数代表更新状态的reducer，第二个参数可选，是状态的初始值，第三个参数可选，代表Store Enhance（增强Store，不过现阶段没用到。）

接下来直接看代码了，唯有实践才能出真理：

```
import {createStore} from 'redux';
import React from 'react';

//定义了action
const ADD_GUN = 'ADD_GUN'
const REMOVE_GUN = 'REMOVE_GUN'

// 接受程序的当前状态(state)以及发生的action
//一般来说state有个初始值，但是没有也可以

//reducer
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
//输出第一次state
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
```


##### 上面的顺序如下
store(state) -> dispach(action) -> reducer -> new state

>先创建action
>>再创建reducer（counter）
>>>createStore创建一个store状态树（这是redux帮我们管理的），创建的时候会执行一次reducer
>>>>订阅函数（自己编写函数内容），store中state改变时会被调用
>>>>>>dispatch（action），分发action，把state和action传入reducer中的case执行语句，返回新状态

因为上面只是个简单的例子，没有与render（还记得上面说过：UI=render(state)）结合起来，真正的顺序应该是：
UI -> store(state)  -> dispach(action) -> middleware -> reducer -> new state -> UI


-------------

喜欢的话，可以star下😄
