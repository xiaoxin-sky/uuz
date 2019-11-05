import React from 'react';

import ReFresh from '@/utils/ReFresh.jsx'

class TestReFresh extends React.Component {

  constructor() {
    super();
    this.state = {
      txt: '下拉刷新',
      idx: 0
    }
  }

  freshHandler = () => {
    console.log('刷新一下');
    this.setState((preState) => {
      console.log(preState, 'preState')
      return {
        txt: '下拉刷新执行完成',
        idx: preState.idx + 1
      }
    })
  }

  render() {
    const testTxt = `${this.state.txt}刷新次数${this.state.idx}`;

    return <div className="test-reFresh">
      <ReFresh freshHandler={this.freshHandler}>
        <div className="test-content">{testTxt}</div>
      </ReFresh>
    </div>
  }
}

export default TestReFresh;