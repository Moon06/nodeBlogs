const fs =require('fs')
const path = require('path')



// function getFileContent(fileName, callback){
//     const fullFileName = path.resolve(__dirname, 'files', fileName)
//     fs.readFile(fullFileName,(erro, data) =>{
//         if(erro){
//             console.error(error)
//             return
//         }
//         callback(
//             JSON.parse(data.toString())
//         )
//         // console.log(data.toString())
//     })
// }

// getFileContent('a.json', aData =>{
//     console.log('a data:', aData)
// })

function getFileContent(fileName){
    const promise = new Promise((resolve, reject) =>{
        const fullFileName = path.resolve(__dirname, 'files', fileName)
            fs.readFile(fullFileName,(erro, data) =>{
                if(erro){
                    reject(error)
                    return
                }
                resolve(JSON.parse(data.toString()))
            })
    })
    return promise
}

getFileContent('a.json').then(aData =>{
    console.log('a:', aData)
    return getFileContent(aData.text)
}).then(bData =>{
    console.log('b:', bData)
    return getFileContent(bData.text)
}).then(cData =>{
    console.log(cData)
})