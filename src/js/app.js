import * as Util from "./util";
import LifeCycle from "./lifeCycle";

    var canvas = window.document.getElementById('canvas');
    var context = canvas.getContext('2d');
   
   
    var startButton = window.document.getElementById('start');
    var stopButton = window.document.getElementById('stop');
    
    var timeOut = null;
    
    startButton.addEventListener('click', function(){
        
        this.disabled = "disabled";
        stopButton.removeAttribute("disabled");
        
        LifeCycle.createInitialPopulation(300, 500, 500);
        LifeCycle.start();
         
        cycle();
       
        
    });
    
      stopButton.addEventListener('click', function(){
        
        this.disabled = "disabled";
        startButton.removeAttribute("disabled");
        
        window.clearTimeout(timeOut);
        
        LifeCycle.reset();
        
        draw();
        
    });
  
   
    function cycle(){
        
        LifeCycle.generation();
        
        draw();
        
        timeOut = window.setTimeout(function() {
            
            cycle();
            
        }, LifeCycle.generationDelay);
        
    }
    
    

   function draw(){
       
       context.clearRect(0, 0, canvas.width, canvas.height);
       
       var color = LifeCycle.groundColor;
       
       color = "rgb("+color.r+", "+color.g+", "+color.b+")";
       
       context.fillStyle = color;
       context.fillRect(0, 0, 500, 500);
          
   
       for(var i = 0; i < LifeCycle.bugs.length; i++){
  
            var bug = LifeCycle.bugs[i];

            bug.draw(context);

        }
   }
   
   
   draw();
 
    


