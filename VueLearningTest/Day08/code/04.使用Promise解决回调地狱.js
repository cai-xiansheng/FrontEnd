const fs = require('fs')

function getFileByPath(fpath) {
  return new Promise(function (resolve, reject){
    fs.readFile(fpath,'utf-8',(err,dataStr) => {
      
      if (err) return reject(err)
      resolve(dataStr)

    })
  })
}

// 先读取文件1，在读取文件2，最后读取文件3
// 注意：通过.then 指定回调函数的时候，成功的回调函数，必须传，到那时，失败的回调，可以省略不传。
// 这是一个错误的示范，千万不要这么用
// getFileByPath('./files/1.txt')
//   .then(function (data){
//     console.log(data)

//     getFileByPath('./files/2.txt')
//       .then(function (data){
//       console.log(data)
    
//       getFileByPath('./files/3.txt')
//         .then(function (data){
//         console.log(data)
    
//       })
//     })
//   })


// 读取文件1
// 在上一个.then中，返回一个Promise头例，可以继续被下一个.then 来处理

// 如果，前面的 Promise 执行失败，我们不想让后续的 Promise 操作被终止，可以为每个 Promise 指定失败的回调
// getFileByPath('./files/11.txt')
//   .then(function(data) {
//     console.log(data)

//     // 读取文件2
//     return getFileByPath('./files/2.txt')
//   },function (err){
//     console.log('这是失败的结果：' + err.message)
//     // return 一个新的 Promise
//     return getFileByPath('./files/2.txt')
//   })
//     .then(function (data) {
//       console.log(data)

//       // 读取文件3
//       return getFileByPath('./files/3.txt')
//     })
//       .then(function (data){
//         console.log(data)
//       })

// console.log('okokok')




getFileByPath('./files/1.txt')
  .then(function(data) {
    console.log(data)

    // 读取文件2
    return getFileByPath('./files/2.txt')
  })
  .then(function (data) {
    console.log(data)

    // 读取文件3
    return getFileByPath('./files/3.txt')
  })
  .then(function (data){
    console.log(data)
  })
  .catch(function (err){
    console.log(err.message)
  })