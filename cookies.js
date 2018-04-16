;(function(factory){
  var oldCookies = window.Cookies;
  var api = window.Cookies = factory();
  // 防止冲突
  api.noConflict = function(){
    window.Cookies = OldCookies;
		return api;
  }
}(function(){
  // 将多个对象整合到一起
  // [{path: '/'}, {expires: 1}]
  function extend() {
    let combineObj = {};
    for(let i=0; i< arguments.length; i+=1) {
      const obj = arguments[i];
      for(let key in obj) {
        combineObj[key] = obj[key];
      }
    }
    return combineObj;
  }
  function init() {
    function api(key, value, attributes) {
      // set
      if (arguments.length >1) {
        attributes = extend(
          { path: '/' },
          attributes
        )
      }
      // 设置cookie有效期
      const expires = Number(attributes.expires);
      if (typeof expires === "number") {
        attributes.expires = new Date(new Date() * 1 + expires * 864e+5);
      }
      // 将attributes转成字符串
      let stringAttributes = '';
      for(let key in attributes) {
        stringAttributes += `;${key}=${attributes[key]}`;
      }
      value = String(value);
      key = String(key);
      return ( document.cookie = `${key}=${value}${stringAttributes}`)
    }
    api.set = api;
    return api;
  }
  return init();
}))