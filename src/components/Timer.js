import React from 'react';


// 현재시간 - 인자값  1시간 미만 몇분 전, 이후 작성 된 시간
function Timer({time}) {

    if ( time == null) {
      return null
    }

    const date = new Date()
    const currentTime =  date.getHours()*60 + date.getMinutes()
    const minusTime = time.substring(13, 15) * 60 + time.substring(17, 19)* 1 
    
    const timer = currentTime - minusTime

    const oldTime = time.split(' ')

    const oldTimer = `${oldTime[1].substring(0, 1) < 10 ? `0${oldTime[1].substring(0, 1)}` : oldTime[1].substring(0, 1)}/${oldTime[2].substring(0, 2) < 10 ? `0${oldTime[2].substring(0, 2)}` : oldTime[2].substring(0, 2)} ${oldTime[3].substring(0, 2) < 10 ? `0${oldTime[3].substring(0, 2)}` : oldTime[3].substring(0, 2)}:${oldTime[4].substring(0, 2) < 10 ? `0${oldTime[4].substring(0, 2)}` : oldTime[4].substring(0, 2)}`

    return (
      <div>
          { timer > 3 
            ? timer < 60 
              ? `${timer}분 전` 
              : oldTimer 
            : "방금 전"}
      </div>
  )
}

export default Timer;
