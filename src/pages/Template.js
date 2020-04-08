import { connect } from 'dva';
import React, { Component } from 'react';
import styles from './index.less';
import { Button } from 'antd-mobile';

/**
 * 模板页
 */

class Template extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // 页面加载完成
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Button>Template</Button>
      </div>
    );
  }
}


Template.propTypes = {
};

export default connect()(Template);