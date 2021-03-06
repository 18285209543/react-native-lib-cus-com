import React, { Component } from 'react';
import PropTypes  from 'prop-types';
import {
    View,
    Modal,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

import ImageViewer from 'react-native-image-zoom-viewer';
import {StyleSheetAdapt} from "../api/StyleSheetAdapt";

import img from './../res/error.png';
import imageLeft from './../res/leftWhite.png';
import {Theme} from "../api/Theme";

/**
 * 查看大图
 * **/
export class ImageView extends Component {

    //imageView = null;
    static base;

    static propTypes = {
        imageUrls:PropTypes.array,//图片路径数组
        iconLeft:PropTypes.number
    }

    // 构造
    constructor(props) {
        super(props);
        ImageView.base = this;
        // 初始状态
        this.state = {
            visible:false,//是否显示
            imageUrls:[],//显示图片数组路径
            imageIndex:0,//图片数据地址，第几张
            indicator:true,//指示器
        };

    }

    /**
     * 显示图片
     * @param bool bool,//是否显示，true:显示，false：隐藏，默认是true
     * @param imageUrls array,//图片数组
     * @param index int,//地址，初始显示第几张图片
     * **/
    static show(bool,imageUrls,index){
        // console.log('ccc')
        bool = bool == undefined ? false : bool;
        imageUrls = imageUrls == undefined ? [] : imageUrls;
        index = index == undefined ? 0 : index;
        /* [{
             url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
             // Pass props to <Image />.
             props: {
                 // headers: ...
             }
         }]*/
        let imageList = [];
        imageUrls.forEach((val,i,arr)=>{
            imageList.push({
                url: val,
                // Pass props to <Image />.
                isLoad:index == i ? false : true,//是否加载 true:未加载；false：未加载
                props: {
                    // headers: ...
                    onLoadStart:()=>{
                        // console.info("onLoadStart","onLoadStart")
                        //  ImageView.base.setState({indicator:true});
                    },
                    onLoadEnd:()=>{
                        // console.info("onLoadEnd","onLoadEnd")
                        ImageView.base.setState({indicator:false});
                    }
                }
            });
        });
        ImageView.base.setState({
            visible: bool,//是否显示
            imageUrls:imageList,
            imageIndex:index
        });

    }

    /**
     * 显示图片
     * @param bool bool,//是否显示，true:显示，false：隐藏，默认是true
     * @param imageUrls array,//图片数组
     * @param index int,//地址，初始显示第几张图片
     * **/
    show(bool,imageUrls,index){
        // console.log('ccc')
        // console.info("imageUrls index="+index,imageUrls);
        bool = bool == undefined ? false : bool;
        imageUrls = imageUrls == undefined ? [] : imageUrls;
        index = index == undefined ? 0 : index;
        /* [{
             url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
             // Pass props to <Image />.
             props: {
                 // headers: ...
             }
         }]*/
        let imageList = [];
        imageUrls.forEach((val,i,arr)=>{
            imageList.push({
                url: val,
                isLoad:index == i ? false : true,//是否加载 true:未加载；false：未加载
                // Pass props to <Image />.
                props: {
                    // headers: ...
                    onLoadStart:()=>{
                        // console.info("onLoadStart","onLoadStart")
                        // this.setState({indicator:true});
                    },
                    onLoadEnd:()=>{
                        // console.info("onLoadEnd","onLoadEnd")
                        this.setState({indicator:false});
                    }
                }
            });
        });
        this.setState({
            visible: bool,//是否显示
            imageUrls:imageList,
            imageIndex:index
        });

    }

    onRequestClose(){
    }

    render(){
        ImageView.base = this;

        let { indicator,imageUrls,imageIndex,visible } = this.state;

        const renderHeader = <TouchableOpacity style={styles.iconLeft}
                                               delayPressIn={0}
                                               delayPressOut={0}
                                               onPressIn={() =>{

                                                   this.setState({visible:false});
                                               }}>
            <Image source={imageLeft}
                   style={styles.imgLeft}/>
        </TouchableOpacity>;

        return(

            <Modal {...this.props}
                   animationType={"none"}
                   ref="imageView"
                   visible={visible}
                   onRequestClose={()=> this.onRequestClose()}>

                <ImageViewer imageUrls={imageUrls} // 照片路径
                             enableImageZoom={true} // 是否开启手势缩放
                             index={imageIndex} // 初始显示第几张
                             failImageSource={img} // 加载失败图片
                             onChange={(index) => {
                                 if(imageUrls[index].isLoad)
                                 {
                                     imageUrls[index].isLoad = false;
                                     this.setState({
                                         imageUrls:imageUrls,
                                         imageIndex:index,
                                         indicator:true
                                     });
                                 }
                             }} // 图片切换时触发
                             renderHeader={() =>renderHeader}
                    /*footerContainerStyle={
                        {
                            bottom: 200, //position: "absolute", zIndex: 9999
                        }
                    }*/
                             onClick={() => { // 图片单击事件,我在这里设置退出
                                 /*this.setNativeProps({
                                     visible:false
                                 });*/
                                 /*this.imageView.setNativeProps({
                                     visible:false
                                 });*/
                                 //this.imageView.visible = false;
                                 /* ImageView.base.refs.imageView.setNativeProps({
                                      visible:false
                                  });*/
                                 //this.setState({visible:false});
                             }}/>

                {
                    indicator
                    &&<ActivityIndicator size="large"
                                         style={styles.inditor}
                                         color={Theme.Colors.themeColor}/>
                }
            </Modal>
        );

    }

}

const styles = StyleSheetAdapt.create({
    imgLeft:{
        resizeMode:"contain",
        width:30,
        height:30,
    },

    inditor:{
        position: "absolute",
        zIndex: 10, //z轴方向的层级，越大越在顶部
        marginTop:'0.5h',
        marginLeft:'0.5w'
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    spinner: {
        marginBottom: 50
    },
    iconLeft:{
        width:60,
        height:50,
        top:20,
        //backgroundColor: '#d35400',
        position: "absolute",
        zIndex: 9999, //z轴方向的层级，越大越在顶部
        justifyContent:'center',
        alignItems:'center',
    }
});