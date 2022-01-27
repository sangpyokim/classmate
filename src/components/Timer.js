import React from 'react';


// 현재시간 - 인자값  1시간 미만 몇분 전, 이후 작성 된 시간
function Timer({time}) {

    if ( time == null) {
      return null
    }

    const date = new Date()

    const oldTime = time.split(' ')

    const oldTimer = `${oldTime[1].substring(0, 1) < 10 ? `0${oldTime[1].substring(0, 1)}` : oldTime[1].substring(0, 1)}/${oldTime[2].substring(0, 2) < 10 ? `0${oldTime[2].substring(0, 2)}` : oldTime[2].substring(0, 2)} ${oldTime[3].substring(0, 2) < 10 ? `0${oldTime[3].substring(0, 2)}` : oldTime[3].substring(0, 2)}:${oldTime[4].substring(0, 2) < 10 ? `0${oldTime[4].substring(0, 2)}` : oldTime[4].substring(0, 2)}`
    
    const Year = (date.getFullYear() - oldTime[0].substring(0,4)) * 12 * 30 * 24 * 60

    const oldMonth = oldTime[1].length === 2 ? oldTime[1].substring(0, 1) : oldTime[1].substring(0, 2)
    const Month = (date.getMonth()+1 - oldMonth) * 30 * 24 * 60

    const oldDates = oldTime[1].length === 2 ? oldTime[2].substring(0, 1) : oldTime[2].substring(0, 2)
    const Dates = (date.getDate() - oldDates) * 24 * 60

    const oldHours = oldTime[1].length === 2 ? oldTime[3].substring(0, 1) : oldTime[3].substring(0, 2)
    const Hours = (date.getHours() - oldHours) * 60

    const oldMinutes = oldTime[1].length === 2 ? oldTime[4].substring(0, 1) : oldTime[4].substring(0, 2)
    const Minutes = date.getMinutes() - oldMinutes;
    
    const timer = Year + Month + Hours + Dates + Minutes;


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
