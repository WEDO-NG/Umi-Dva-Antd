import { connect } from 'dva';
import React, { Component, useEffect, useState } from 'react';
import styles from './index.scss';
import { Spin } from 'antd'
import router from 'umi/router';


/**
 *  router.push("/xxxx")
 * 模板页
 */

const Example = props => {
    const {
        loading,
        dispatch
    } = props

    useEffect(() => {
        componentDidMount()
        return () => {
            componentWillUnMount()
        }
    }, [])

    /**
     * 页面加载完成
     */
    const componentDidMount = () => {

    }

    /**
     * 页面销毁
     */
    const componentWillUnMount = () => {

    }

    return (
        <div className={styles.ExamplePage}>
            Example
        </div>
    )


}

export default connect(({ loading }) => ({
    loading
})
)(Example);

