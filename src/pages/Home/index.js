import styles from './index.less';
import { Button } from 'antd-mobile';
import { connect } from 'dva';
import React, { Component } from 'react';

/**
 * 首页
 */

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // 页面加载完成
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type:"common/getFirstTagList"
    })
  }

  render() {
    return (
      <div>
        <Button>Home</Button>
      </div>
    );
  }
}


Home.propTypes = {
};

export default connect(
  ({ loading, common }) => ({ loading, common })
)(Home);