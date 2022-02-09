const  Buffer = require('buffer').Buffer;
module.exports = (nodes,after)=>{
    return nodes.map((node,index)=>({
        cursor: Buffer.from(`cursor${index + after + 1}`).toString('base64'),
        node
    }))
}