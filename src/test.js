export function dome(Arrty) {
  if (Arrty.constructor === Array) {
    Arrty.forEach(item => {
      console.log(item);
      const style = document.getElementsByClassName("el-he123ader");
    });
  }
  return Arrty;
}

addLoadEvent(testXpath);
//测试Xpath
export function testXpath() {
  getElementByXpath("/html/body").onclick = function() {
    var element = getElementByXpath("/html/body/select"); //获取到select元素
    var index = element.selectedIndex; //获取元素下标
    console.log(element.options[index].text);
  };
}
//文档加载函数
export function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != "function") {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    };
  }
}

export function getElementByXpath(xpath) {
  var element = document.evaluate(xpath, document).iterateNext();
  return element;
}
