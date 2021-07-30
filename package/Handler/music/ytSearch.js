let alive = false 
const {workerData,parentPort} = require('worker_threads')
const yts = require('yt-search')
async function search(data){

    if(typeof data === "string"){
    const tracks = await yts(data)
   // console.log(tracks)
const t = tracks.all[0] 

alive = true 
    return t.url
     }
    else{
       const playlist = await yts(data)
    //  console.log(playlist.videos[0])
       return playlist.videos.map(x=>'https://youtube.com/watch?v='+x.videoId)
        alive = true 
    }
}
async function post(data){
    const tr =await  search(data)
parentPort.postMessage(tr)
    setInterval(()=>{
if(!alive) process.exit(0) 
 alive =  false 
        },5000)
    }

post(workerData)