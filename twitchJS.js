/**
 * Created by Rakesh on 11/30/2016.
 */

$(document).ready(function(){


    mainFunction();



});

function mainFunction(){

    var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin","comster404"];

    channels.forEach(function(channel){
       // console.log(channel);

        var myUrl = "https://wind-bow.hyperdev.space/twitch-api/streams/"+channel;
        $.ajax({

            url : myUrl,
            crossDomain : true,
            success: function(result){

            var game='';
            var gStatus='';
                //console.log("Result: " + JSON.stringify(result));
            if(result.stream === undefined){

                game= "Account Closed or Not Found";
                gStatus="Account Closed or Not Found";
            }else if(result.stream === null){
                game= "Offline";
                gStatus="Offline";
            }else{
                game = result.stream.game;
                gStatus = "Online";
            }

            var myUrl2 = "https://wind-bow.hyperdev.space/twitch-api/channels/"+channel;

            $.ajax({

                url : myUrl2,
                crossDomain : true,
                success: function(channelResult){

                    //console.log("Game: "+ game + "Status: " + gStatus);
                    //console.log("channelResult: " + JSON.stringify(channelResult));
                    var image = channelResult.logo != null? channelResult.logo :"https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F";
                    var link = channelResult.url != null ? channelResult.url : "#";
                    var html = "<div class='stream'><img src='"+image + "' alt='No image found' width='120px' height='140px'>";
                    html +="<a href='"+ link + "'target = '_blank'><span class='title'>"+channel+"</span></a><span class='status'>"+game+"</span></div>";
                    if(gStatus === "Online"){
                        $(".result").prepend(html);
                    }else {
                        $(".result").append(html);
                    }


                },
                error: myError2,
                type:"GET",
                dataType: "jsonp"

            });


        },
            error: myError,
            type:"GET",
            dataType: "jsonp"

        });
    });

}

/*
function mySuccess(result){

var game='';
var gStatus='';

    if(result.stream === undefined){
        //console.log("Result: " + JSON.stringify(result));
        game= "Account Closed or Not Found";
        gStatus="Account Closed or Not Found";
    }else if(result.stream === null){
        game= "Offline";
        gStatus="Offline";
    }else{
        game = result.game;
        gStatus = "Online";
    }

    var myUrl2 = "https://wind-bow.hyperdev.space/twitch-api/channels/"+channel;

    $.ajax({

        url : myUrl2,
        crossDomain : true,
        success: mySuccess2,
        error: myError2,
        type:"GET",
        dataType: "jsonp"

    });


}*/

function myError(error){

    console.log("Error: " + JSON.stringify(error));
}

function mySuccess2(channelResult){

    console.log("Game: "+ game + "Status: " + gStatus);
}

function myError2(error){

    console.log("Error2: " + JSON.stringify(error));
}

