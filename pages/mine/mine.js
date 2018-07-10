// mine.js

// 自定义标签
var iconPath = "../../images/icons/"
var iconType = [
  {
    "listTitle":"赞助记录",
    "icon": iconPath + "history.png",
  },
   {
     "listTitle": "兑换记录",
     "icon": iconPath + "duihuan.png",
  },
   {
     "listTitle": "规则说明",
     "icon": iconPath + "guize.png",
  },
   {
     "listTitle": "联系我们",
     "icon": iconPath + "phone.png",
   }
]
var tabs = [
    {
        "icon": iconPath + "mark.png",
        "iconActive": iconPath + "markHL.png",
        "title": "日记",
        "extraStyle": "",
    },
    {
        "icon": iconPath + "collect.png",
        "iconActive": iconPath + "collectHL.png",
        "title": "收藏",
        "extraStyle": "",
    },
    {
        "icon": iconPath + "like.png",
        "iconActive": iconPath + "likeHL.png",
        "title": "喜欢",
        "extraStyle": "",
    },
    {
        "icon": iconPath + "more.png",
        "iconActive": iconPath + "moreHL.png",
        "title": "更多",
        "extraStyle": "border:none;",
    },
]
var userInfo = {
    avatar: "https://pic4.zhimg.com/e515adf3b_xl.jpg",
    nickname: "小闹钟",
    sex: "♂",  // 0, male; 1, female
    meta: '1篇日记',
}


Page({

    // data
    data: {
        // 展示的tab标签
        iconType: iconType,

        // 当前选中的标签
        currentTab: "tab1",

        // 高亮的标签索引
        highLightIndex: "0",

        // 模态对话框样式 
        modalShowStyle: "",

        // 待新建的日记标题
        diaryTitle: "",

        // TODO 用户信息
        userInfo: userInfo,
    },

    // 隐藏模态框
    hideModal() {
        this.setData({modalShowStyle: ""});
    },

    // 清除日记标题
    clearTitle() {
        this.setData({diaryTitle: ""});
    },
    onShow: function() {
        this.hideModal();
        this.clearTitle();
        let that = this
        let userInfo = wx.getStorageSync('userInfo')
       // let nickName = userInfo.nickName 获取微信的用户名
        if (!userInfo) {
          wx.navigateTo({
            url: "/pages/authorize/index"
          })
        } else {
          that.setData({
            userInfo: userInfo
          })
        }
    },

    // 点击tab项事件
    touchTab: function(event){
        var tabIndex = parseInt(event.currentTarget.id);
        var template = "tab" + (tabIndex + 1).toString();

        this.setData({
            currentTab: template,
            highLightIndex: tabIndex.toString()
        }
        );
    },

    // 点击新建日记按钮
    touchAdd: function (event) {
        this.setData({
            modalShowStyle: "opacity:1;pointer-events:auto;"
        })
    },

    // 新建日记
    touchAddNew: function(event) {
        this.hideModal();

        wx.navigateTo({
            url: "../new/new?title=" + this.data.diaryTitle,
        });
    },

    // 取消标题输入
    touchCancel: function(event) {
        this.hideModal();
        this.clearTitle();
    }, 

    // 标题输入事件
    titleInput: function(event) {
        this.setData({
            diaryTitle: event.detail.value,
        })
    }
})
