// 需求：你要封装一个方法，我给你一个要读取的路径，你这个方法能帮我读取文件，并把内容返回给我


const fs = require('fs')
const path = require('path')

// 这是普通读取文件的方式
/*fs.readFile(path.join(__dirname,'./files/1.txt'),'utf-8',(err,dataStr) => {
  if(err) throw err
  console.log(dataStr)
})*/


// 初衷：给定文件路径，返回读取到的内容，
// 我们可以规定一下，callback 中，有两个参数，第一个参数是失败的结果；第二个参数是成功的结果；
// 同时，我们规定了：如果成功了，返回的结果应该位于callback参数的第二个位置，此时，第一个位置由于没有出错，所以，放置一个 null ,如果失败了，则第一个位置放置 error 对象，第二个位置放置一个undefined
function getFileByPath(fpath,callback){
  fs.readFile(fpath,'utf-8',(err,dataStr) => {
    // 如果报错，进入 if 分支后，if 后面的代码就没有必要执行了
    if(err) callback(err)
    // console.log(dataStr)
    // return dataStr
    callback(null,dataStr)
  })
}

// var result =  getFileByPath(path.join(__dirname,'./files/1.txt'))
// console.log(result)

getFileByPath(path.join(__dirname,'./files/1.txt'),(dataStr) => {
  // console.log(dataStr)
  if (err) return console.log(err.message)
  console.log(dataStr)
})