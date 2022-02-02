import React from 'react';



function DDay(day) {
    const toDay = new Date()
    toDay.setDate(toDay.getDate()+day * 1)

    const Day = ['일요일', "월요일", "화요일", "수요일", '목요일', '금요일', '토요일' ]
    
    const currentDate = `${toDay.getFullYear()}년 ${toDay.getMonth()+1}월 ${toDay.getDate()}일 ${toDay.getHours()}시 ${toDay.getMinutes()}분 ${toDay.getSeconds()}초 ${Day[toDay.getDay()]} `
  return currentDate
}

export default DDay;
