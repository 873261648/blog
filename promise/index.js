const fs = require('fs'),
path = require('path');

// 传统回调方式
const getFileContent = (fileName,callback)=>{
    let fullFileName = path.resolve(__dirname,'files',fileName);
    fs.readFile(fullFileName,(err,res)=>{
        if(err){
            console.log(err)
        }else{
            callback(JSON.parse(res.toString()))
        }
    })
}
// getFileContent('a.json',(aData)=>{
//     console.log(aData)
//     getFileContent(aData.next,(bData)=>{
//         console.log(bData)
//         getFileContent(bData.next,(cData)=>{
//             console.log(cData)
//         })
//     })
// })

// promise方式
const getFileContentByPromise = (fileName)=>{
    let fullFileName = path.resolve(__dirname,'files',fileName);
    let promise = new Promise((resolve, reject)=>{
        fs.readFile(fullFileName,(err,res)=>{
            if(err){
                reject(err)
            }else{
                resolve(JSON.parse(res.toString()))
            }
        })
    })
    return promise
}


getFileContentByPromise('a.json').then(aData=>{
    console.log(aData)
    return getFileContentByPromise(aData.next)
}).then(bData=>{
    console.log(bData)
    return getFileContentByPromise(bData.next)
}).then((cData)=>{
    console.log(cData)
})