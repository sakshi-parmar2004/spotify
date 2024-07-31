let URL="http://127.0.0.1:3000/songs/";

let currentsong=new Audio();
//function to convert second to minute
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

const getSongs=async()=>
    {
        let response=await fetch(URL);
        let ans=await response.text();
        // console.log(ans);
        let div=document.createElement("div");
        div.innerHTML=ans;
        let as=div.getElementsByTagName("a");
        // console.log(as);
        let songs=[];
        for(let i=0;i<as.length;i++)
            {
                element=as[i];
                // console.log(element);
                if(element.href.endsWith(".mp3"))
                    {
                        songs.push(element.href.split("/songs/")[1]);
                    }
            }
           return songs;
        
 

    }
    
    const playmusic=(track,pause=false)=>{
        currentsong.src="/songs/"+track;
        // console.log("/songs/"+track);
        if(!pause)
            {
                currentsong.play();
                current.src="play.svg";
            }
            // else{
            //     currentsong.play();
            //        current.src="play.svg";
            // }
       
        // let currentsong =new Audio("/songs/" +track);
        //   
        // console.log(document.querySelector(".songinfo")[0].img.src);
        // let a=decodeURI(track).replaceAll("mp3","jpg");
        // console.log(a);

        
            // let a=`"images/${track.replaceAll("%20"," ").replaceAll("mp3","jpg")}"`;

    
        
    
         document.querySelector(".songinfo").innerHTML=decodeURI(track).replaceAll(".mp3"," ");
        //  document.querySelector(".songinfo").getElementsByTagName("img").src="a";
         document.querySelector(".songtime").innerHTML="00:00/00:00";
         

    }

    const main=async() =>
        {
            let songList=await getSongs();
            playmusic(songList[0],true);
            let songs= document.querySelector(".librarySongs").getElementsByTagName("ul")[0]
            for(const song of songList)
                {
                      songs.innerHTML=songs.innerHTML+`<li>
                                <div class="likedimage">
                                <img src="images/${song.replaceAll("%20"," ").replaceAll("mp3","jpg")}" alt="">
                                </div>
                                
        
                                <div class="info">
                                    <div class="songname">${song.replaceAll("%20"," ")}</div>
                
                                </div>
                                <div class="playnow ">
                                    <span>PlayNow</span>
                                    <img class="invert" src="playnow.svg" alt="">
                                </div>
                              </li>`;
                }
            // console.log("the list is")
            // console.log(songList);
            // var audio=new Audio(songList[2]);
            // audio.play();
//this event listener is used to play song 
            Array.from(document.querySelector(".librarySongs").getElementsByTagName("li")).forEach((e)=>{
                // console.log(e.querySelector(".info").firstElementChild.innerHTML);
                e.addEventListener("click",element =>{
                    // console.log(e.querySelector(".info").firstElementChild.innerHTML);
                    playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim(),);
                })

                
            });
          //for previous
          document.querySelector("#previous").addEventListener("click",()=>{
            // console.log(currentsong);
                let index=songList.indexOf(currentsong.src.split("/").slice(-1)[0]);
                console.log(index);
                if(index-1>=0)
                {
                    playmusic(songList[index-1]);
                }

        })
        document.querySelector("#next").addEventListener("click",()=>{
            // console.log(currentsong);
                let index=songList.indexOf(currentsong.src.split("/").slice(-1)[0]);
                console.log(index);
                if(index+1<songList.length)
                {
                    playmusic(songList[index+1]);
                }

        })


        }
        //this event listener is used to stop or start the song
        current.addEventListener("click",()=>{
            if(currentsong.paused)
                {
                    currentsong.play();
                    current.src="play.svg";
                }
            else{
                currentsong.pause();
                current.src="pause.svg";
            }
       

        })
        //event listener for the time thing
        currentsong.addEventListener("timeupdate",()=>{
            // console.log(currentsong.currentTime,currentsong.duration);
             document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)} / ${secondsToMinutesSeconds(currentsong.duration)}`
        
        

            document.querySelector(".circle").style.left =(currentsong.currentTime/currentsong.duration)*100+"%"
            })

            //to move the seekbar
            document.querySelector(".seekbar").addEventListener("click", e => {
                let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
                document.querySelector(".circle").style.left = percent + "%";
                currentsong.currentTime = ((currentsong.duration) * percent) / 100;

            })
          
           //to open the left page for responsiveness
            document.querySelector("#hamburger").addEventListener("click",e=>{

                document.querySelector(".left").style.left =0 +"%" ;


            })
            // to close the bar
            document.querySelector("#close").addEventListener("click",e=>{
                document.querySelector(".left").style.left=-100 +"%" ;
            })
            //for range
            document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>
            {
                console.log(e.target)
                currentsong.volume = parseInt(e.target.value)/100;
                    
            })

            function showbox()
{
  let nbox=document.getElementsByClassName('librarySongs')[0];
  nbox.style.display='block';
  document.getElementsByClassName('Playlist')[0].style.display='none';
}

function remove()
{
  let nbox=document.getElementsByClassName('librarySongs')[0];
  nbox.style.display='none';
  document.getElementsByClassName('Playlist')[0].style.display='block';
}


//create a playlist
const createPlaylist= function (name)
{
    var newDiv = document.createElement('div');

  // Set some content for the new div
  newDiv.innerHTML = name;

  // Add a class to the new div for styling (optional)
  newDiv.className = 'newDiv';

  // Append the new div to the container
  var container = document.getElementsByClassName('library')[0];
  container.appendChild(newDiv);
    

}
document.getElementsByClassName('add')[0].addEventListener('click', function() {
    let playlistName = prompt('Enter the name of the playlist:');
    if (playlistName) {
        createPlaylist(playlistName);
    }
});
            
        main();
    
