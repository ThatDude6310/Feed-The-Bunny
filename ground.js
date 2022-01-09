class Ground {
    constructor (x,y,w,h){
        this.x = x
        this.y = y
        this.w = w
        this.h = h

        this.body = Bodies.rectangle(x,y,w,h,{isStatic:true})

        World.add(world,this.body)
    }
    display(){
        push()
        rectMode(CENTER)
        //fill("red")
        var pos = this.body.position
        rect(pos.x,pos.y,this.w,this.h)
        pop()
    }
}