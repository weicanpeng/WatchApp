
export default class DateTimeUtils{


    getTimeInfo(){
        var date = new Date();
    
        var year = date.getFullYear().toString();
        var month = (date.getMonth()+1).toString();
        var day = date.getDate().toString();
        var hour =  date.getHours().toString();
        var minute = date.getMinutes().toString();
        var timeInfo=hour.padStart(2,'0')+':'+minute.padStart(2,'0');
        return timeInfo;
      }
}