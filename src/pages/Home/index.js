import { connect } from 'dva';
import React, { Component, useEffect, useState } from 'react';
import styles from './index.scss';
import { Spin } from 'antd'


/**
 *  
 * 首页
 */

const Home = props => {
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
        <div className={styles.HomePage}>
            Home
        </div>
    )


}

export default connect(({ loading }) => ({
    loading
})
)(Home);

