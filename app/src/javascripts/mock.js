var md5 = require('js-md5');
var ALLANSWERS = [
  {color: "#2044ae", result: 1, title: "一稿过", src: "images/1.jpg", text1: "", text2: "工作更加得心应手，并获得", text3: "每3稿出现1次1稿过的隐藏技能！"},
  {color: "#4e0e80", result: 2, title: "桃花开", src: "images/2.jpg", text1: "", text2: "命中注定的恋人即将出现", text3: "有趣的灵魂相互吸引，坠入爱河！"},
  {color: "#603100", result: 3, title: "灵感开悟", src: "images/3.jpg", text1: "", text2: "海报案例过目不忘，融会贯通", text3: "为己所用！成功变身设计高手！"},
  {color: "#06331e", result: 4, title: "夜夜不加班", src: "images/4.jpg", text1: "", text2:"设计效率稳步提升，出图飞快", text3: "居然天还亮着就可以回家了！"},
  {color: "#0d6ed5", result: 5, title: "邪甲退散", src: "images/5.jpg", text1: "", text2:"甲方全都变得慈眉善目", text3: "令人生厌的甲方反倒成了稀有品种！"},
  {color: "#a10266", result: 6, title: "永不崩溃", src: "images/6.jpg", text1: "", text2:"软件运行格外顺畅，妈妈再也", text3: "不用担心我的第一稿忘保存了！"},
  {color: "#78220b", result: 7, title: "大气环绕", src: "images/7.jpg", text1: "", text2: "作品将被名为“大气”的气场", text3: "所环绕，令所有甲方心服口服！"},
  {color: "#2044ae", result: 8, title: "懒癌痊愈", src: "images/8.jpg", text1: "", text2: "从今往后摆脱懒癌，克服一切", text3: "技术壁垒，走向涨薪康庄大道！"},
  {color: "#4e0e80", result: 9, title: "五彩斑斓", src: "images/9.jpg", text1: "", text2: "工作与生活都将变得多姿多彩", text3: "闪耀的身姿让大家羡慕不已！"},
  {color: "#603100", result: 10, title: "甲方读心术", src: "images/10.jpg", text1: "", text2: "从此对所有甲方需求了若指掌", text3: "随便出的方案都能将TA征服！"},
  {color: "#0d6ed5", result: 11, title: "身强体壮", src: "images/11.jpg", text1: "", text2: "腰不酸了，肩膀也不痛了", text3: "状态好到一口气还能再改 800 稿！"},
  {color: "#0d6ed5", result: 12, title: "假期结界", src: "images/12.jpg", text1: "", text2: "每当假期来临，自动形成结界", text3: "上司再也不会找你加班！"},
  {color: "#a10266", result: 13, title: "尾款收割机", src: "images/13.jpg", text1: "", text2: "从今往后你的每一次项目尾款", text3: "都会在第一时间转到银行账户上！"},
  {color: "#78220b", result: 14, title: "发量暴增", src: "images/14.jpg", text1: "", text2: "不用再怕熬夜改稿发量少", text3: "从此一抓一大把的不是头发是钞票！"},
  {color: "#06331e", result: 15, title: "甲方筛选器", src: "images/15.jpg", text1: "", text2: "将自动屏蔽各种企图占便宜的甲方", text3: "接优质私单赚钱赚到手软！"},
  {color: "#0d6ed5", result: 16, title: "成功暴瘦【女】", src: "images/16.jpg", text1: "", text2: "身材自带液化效果", text3: "A4腰、马甲线，分分钟迷倒众生！"},
  {color: "#2044ae", result: 17, title: "完美拍档", src: "images/17.jpg", text1: "", text2: "任何高难度作图需求都能被", text3: "轻松实现，争吵摩擦将不复存在！"},
  {color: "#4e0e80", result: 18, title: "花开二度", src: "images/18.jpg", text1: "", text2: "一度枯萎的塑料同事情将", text3: "再度绽放，重回亲密无间的好时光！"},
  {color: "#603100", result: 19, title: "思维透视", src: "images/19.jpg", text1: "", text2: "获得能洞察甲方思维的隐藏技能", text3: "作品一稿通过率直线攀升！"},
  {color: "#06331e", result: 20, title: "健美达人", src: "images/20.jpg", text1: "", text2: "从过劳肥变到线条棱角分明", text3: "拿个外卖都能引发全楼的骚动！"},
  {color: "#a10266", result: 21, title: "翘屁嫩男", src: "images/21.jpg", text1: "", text2: "从过劳肥变到线条棱角分明", text3: "拿个外卖都能引发全楼的骚动！"},
  {color: "#78220b", result: 22, title: "财源滚滚", src: "images/22.jpg", text1: "", text2: "每当工资即将花得一干二净时", text3: "钱包就会意外获得自动填充！"}
];
var girlAnswer = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,22];
var boyAnswer = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,17,18,19,20,21,22];

var filterHistory = function (answers, history) {
  if (history == '') {
    return answers;
  }
  history = history.split(',');

  answers = answers.filter(function (item) {
    return history.indexOf(item + '') < 0;
  })
  return answers;
}

var search = function (config) {
  console.log(config, 'req')
  // 初始化数据，变成字符串
  var name = config.name + '';
  var sex = config.sex + '';
  var birthday = config.birthday + '';
  var history = config.history + '';

  // 把信息串联起来并生成一个随机数，在过滤了 history 的结果数组中取值
  var s = name + sex + birthday;
  var results = sex == 1 ? filterHistory(girlAnswer, history) : filterHistory(boyAnswer, history);
  var result = history?(parseInt(md5(s), 16) % results.length) : Math.floor(Math.random() * results.length);
  var res = {
    status: 200,
    data: ALLANSWERS[results[result] - 1]
  };
  res.data.text1 = '在Adobe之神的庇护下';

  // 把新生成的结果加入到 history 中并返回
  history = history?history.split(',').map(function(item){return parseInt(item)}):[];
  history.push(results[result]);
  if ((sex == 1 && history.length == girlAnswer.length) || (sex == 0 && history.length == boyAnswer.length)) {
    res.data.history = '';
  } else {
    res.data.history = history.join(',')
  }
  console.log(res,'res');
  return res;
}

module.exports = search;