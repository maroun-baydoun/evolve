define("Util", function(){
   
    var Util = {
        
        random: function(min, max){
            
            return Math.floor((Math.random() * max) + min);
        }
    };
    
    
    
    return Util;
});




