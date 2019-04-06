# hr_xcx
第三方平台代小程序实现业务的模板 微信开放平台  
  
与普通小程序开发的区别是：多了个ext.json 文件，旗下已授权的小程序提交审核时会通过接口修改ext.json中ext对象中的属性值，项目中通过wx.getExtConfigSync()可以拿到这些字段，进而达到区分不同客户。   
[代小程序实现业开发文档参考](https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1489144594_DhNoV&token=&lang=zh_CN)
