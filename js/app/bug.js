define("Bug", ["Util"], function(Util){
   
    var Bug = function(x, y, width, height, color, gender){
        
        
       this.x = x;
       this.y = y;
       this.width = width;
       this.height = height;
       this.color = color;
       this.gender = gender;
       this.age = 0;
        
       this.fitness = function(color){
            return (1/Math.sqrt(Math.pow((this.color.r-color.r), 2), Math.pow((this.color.g-color.g), 2), Math.pow((this.color.b-color.b), 2)))*1000;
       },
       this.mateWith = function(mate){
           
           if((this.gender !== mate.gender) && (this.age >= Bug.MATING_AGE && mate.age >= Bug.MATING_AGE)){
               
               
                var random = Util.random(0, 100);
                
                var color = {};
                
                color.r = random%3 === 0?this.color.r:mate.color.r;
                color.g = random%3 === 0?this.color.g:mate.color.g;
                color.b = random%3 === 0?this.color.b:mate.color.b;
                
                var gender = Util.random(1, 100)%2===0?Bug.GENDER_MALE:Bug.GENDER_FEMALE;

                var descendant = new Bug(0, 0, this.width, this.height, color, gender);

                return descendant;
            }
       },
       this.mutate = function(){
           
           var value = Util.random(1, 255);
           var random = Util.random(1, 500);
           
           if(random%6 === 0){
               this.color.r = value;
           }
           else if(random%7 === 0){
               this.color.g = value;
           }
           if(random%8 === 0){
               this.color.b = value;
           }
       },
       this.draw = function(context){
           
            context.fillStyle ="rgb("+this.color.r+","+this.color.g+","+this.color.b+")";
            context.fillRect(this.x, this.y, this.width, this.height);
            
            context.lineWidth = 1;
            context.strokeStyle = 'black';
            context.strokeRect(this.x, this.y, this.width, this.height);
            
    
        };
};
    
    Bug.DEFAULT_WIDTH = 10;
    Bug.DEFAULT_HEIGHT = 10;
    Bug.GENDER_MALE = 0;
    Bug.GENDER_FEMALE = 1;
    Bug.MATING_AGE = 5;
    
    return Bug;
});


