var durations = ['time-xs','time-sm','time-md','time-lg'];

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

$(document).ready(function(){

    $('.dot').each(function(index,dot) {
        var durationIndex = getRandomIntInclusive(0,3);
        var durationClass = durations[durationIndex];
        $(dot).addClass(durationClass);

        if(Math.random()>0.5)
            $(dot).addClass('reverse')
    });
});