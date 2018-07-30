import {Blockchain} from './Blockchain'

export class NetWork {
  peers
  blockChain: Blockchain

  constructor (blockChain) {
    this.peers = new Set()
    this.blockChain = blockChain
  }

  /**
   * 添加网络节点
   * @param peer
   * @returns {boolean}
   */
  addPeer (peer) {
    this.peers.add(peer)
    return true
  }

  /**
   * 共识机制, 使用所有节点中链最长的作为当前有效链 (链长度最长, 被验证的工作量最多)
   */
  consensus () {
    for (let node of this.peers) {
      console.log(node)
      // let res = request.get(`http://${node.address}/chain`)
      let res = {data: {chain: []}}
      let nodeChain = res.data.chain
      if (nodeChain.length > this.blockChain.chain.length) {
        // this.blockChain.check_chain_validity(nodeChain) todo 验证整条链的有效性
        this.blockChain.chain = nodeChain
      }
    }
  }

}