// pages/detail/detail.js
const datas = require('../../datas/list-data.js');
const appDates = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj: {},
    index:null,
    isCollected: false,
    isMysicPlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    // 获取参数值
    const index = options.index;
    // 更新data中的状态值、
    this.setData({
      detailObj: datas.list_data[index],
      index
    });

    // 根据本地的缓存判断用户是否收藏当前的文章
    const detailStrong = wx.getStorageSync('isCollected');

    if (!detailStrong) {
      // 在缓存中，初始化空对象
      wx.setStorageSync('isCollected', {})
    }

    // 判断用户是否收藏
    if (detailStrong[index]){ // 收藏过
      this.setData({
        isCollected: true
      })
    }

    // 监听音乐播放
    wx.onBackgroundAudioPlay(() => {
      console.log('音乐播放')
      // 修改isMusicPlay状态值
      this.setData({
        isMysicPlay:true
      });
      // 修改appDates中的数据
      appDates.data.isPlay = true;
      appDates.data.pageIndex = index;
    })

    // 判断音乐是都在播放
    if(appDates.data.isPlay && appDates.data.pageIndex === index){
      this.setData({
        isMysicPlay: true
      });
    };


    // 监听音乐暂停
    wx.onBackgroundAudioPause(()=>{
      console.log('音乐暂停')
      // 修改isMusicPlay状态值
      this.setData({
        isMysicPlay: false
      });
      // 修改appDates中的数据
      appDates.data.isPlay = false;
      // appDates.data.pageIndex = index;

    })
  },

  handleCollection(){
    const isCollected = !this.data.isCollected;
    // 更新状态
    this.setData({
      isCollected
    });
    // 提示用户
    const title = isCollected ? '收藏成功' : '取消收藏';
    wx.showToast({
      title,
      icon: 'success'
    });
    // 缓存数据到本地
    // {1:true ,2:false}
    const {index} = this.data;
    wx.getStorage({
      key: 'isCollected',
      success:(datas) => {
        const obj = datas.data;
        obj[index] = isCollected;
        wx.setStorage({
          key: "isCollected",
          data: obj,
          success: () => {

          }
        })
      },
    })
  },

  handleMusicPlay(){
    // 处理音乐播放
    const isMysicPlay = !this.data.isMysicPlay;
    this.setData({
      isMysicPlay
    });

    // 控制音乐播放
    if(isMysicPlay){
      // 播放音乐
      let {dataUrl,title} = this.data.detailObj.music;
      wx.playBackgroundAudio({
        dataUrl,
        title
      })
    }else{
      // 暂停音乐
      wx.pauseBackgroundAudio()
    }
  },

  // 点击分享功能
  handleShare(){
    wx.showActionSheet({
      itemList: ['分享到朋友圈','分享到qq空间','分享到微博'],
    })
  }


})