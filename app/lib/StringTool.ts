export class StringTool {
  /**
   * 获取排序字符串
   * 将字典按照key排序转换成 key=value&key=value 形式
   * @param data
   * @returns {string}
   */
  static getSortStr (data) {
    let keys = Object.keys(data)
    keys = keys.sort()
    let str = ''
    keys.forEach(function (key) {
      str += '&' + key + '=' + data[key]
    })
    str = str.substr(1)
    return str
  }
}