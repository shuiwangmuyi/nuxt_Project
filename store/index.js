import Vuex from 'vuex'
import mutations from './mutations'
export default () => 
{  
    return new Vuex.Store({    
        state: {      
            mm: {
                artist: "清莞",
                pic:
                  "http://p2.music.126.net/1-THPVfCi05CV3EORHq4eA==/42880953495560.jpg?param=100x100",
                src: "http://music.163.com/song/media/outer/url?id=285196.mp3",
                title: "千年缘", 
                lrc:''
            }
    },
    mutations  
    })
}
