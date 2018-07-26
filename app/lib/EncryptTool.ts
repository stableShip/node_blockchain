import _ = require("lodash");
import * as crypto from 'crypto'
import {HexBase64BinaryEncoding, Utf8AsciiBinaryEncoding} from 'crypto'

/**
 * 加密工具类
 * 作用: 1) base64加密  2) base64 解密
 */
export class EncryptTool {

  /**
   * @fn static aes_encode(data): string
   * @brief  aes加密.
   * @param  data    要加密的字符串
   * @return 加密后字符串.
   */
  static aesEncode (data, encodeKey = '') {
    // 使用的加密算法
    let algorithm = 'AES-256-ECB'
    // 使用的加密字符串
    let key = crypto.createHash('sha256').update(encodeKey).digest()
    // 输入的数据编码
    let inputEncoding: Utf8AsciiBinaryEncoding = 'utf8'
    // 初始化向量
    // 输出数据编码
    let outputEncoding: HexBase64BinaryEncoding = 'base64'
    // 创建加密器
    let cipher = crypto.createCipheriv(algorithm, key, '')
    cipher.setAutoPadding(true)
    // 更新加密器：对数据进行加密
    let encodingStr = cipher.update(data, inputEncoding, outputEncoding)
    encodingStr += cipher.final(outputEncoding)
    // 返回加密后字符串
    return encodingStr
  }

  /**
   * @fn static aes_decode(encodingStr: string): string
   * @brief  aes 解密.
   * @param  encodingStr 要解密的字符串.
   * @return 解密后字符串.
   */

  static aesDecode (decodeKey, encodingStr) {
    // 使用的算法
    let algorithm = 'AES-256-ECB'
    let key = crypto.createHash('sha256').update(decodeKey).digest()
    // 输出的格式
    let outputEncoding: Utf8AsciiBinaryEncoding = 'utf8'
    // 输入数据编码
    let inputEncoding: HexBase64BinaryEncoding = 'base64'
    // 创建解密器
    let decipher = crypto.createDecipheriv(algorithm, key, '')
    decipher.setAutoPadding(true)

    // 解密数据
    let data = decipher.update(encodingStr, inputEncoding, outputEncoding)
    data += decipher.final(outputEncoding)
    return data
  }

}

