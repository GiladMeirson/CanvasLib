
import { GameObject } from './GameObject.js';
import { Component } from './component.js';



class EasyCanvas   {
    constructor(id,mode='default') {
        let boolId = id==''||id==null||id==undefined;
        this.Id = ''?id='mycanvas':id;
        this.Mode = mode;
        this.Component = [];
        if (boolId) {
            console.warn('⚠️ No id provided, creating a canvas with id "mycanvas" and appending it to the body.',);
            const canvas = document.createElement('canvas');
            canvas.id = 'mycanvas';
            this.Canvas = canvas;
            document.body.appendChild(canvas);
            this.Ctx = canvas.getContext('2d');

        }
        else {
            this.Canvas = document.getElementById(this.Id);
            try {
                this.Ctx = this.Canvas.getContext('2d');

            } catch (error) {
                console.warn('make sure the id is of a canvas element.')
                console.error('Canvas not found');
            }
        }

        if (this.Mode == 'fullScreen') {
            this.Canvas.width = innerWidth;
            this.Canvas.height = innerHeight;
            this.Canvas.style.position = 'absolute';
            this.Canvas.style.left = '0';
            this.Canvas.style.top = '0';

            
        }
    }

    background(color) {
        this.Ctx.fillStyle = color;
        this.Ctx.fillRect(0, 0, this.Canvas.width, this.Canvas.height);
    }

    clear() {
        this.Ctx.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
    }

  

    resize() {
        this.Canvas.width = window.innerWidth;
        this.Canvas.height = window.innerHeight;
    }

    create(shape='sqaure',x=innerWidth/2,y=innerHeight/2,width=100,height=100,color='red',outlineColor='black',lineWidth=2,id){
        const obj =  new Component(shape,x,y,width,height,color,outlineColor,lineWidth,id);
        obj.draw(this.Ctx);
        this.Component.push(obj);
        return obj;

    }
    deleteComponent(id){
        this.Component.forEach((obj,index)=>{
            if(obj.Id==id){
                this.Component.splice(index,1);
            }
        });
    }
}


let ec = new EasyCanvas('', 'fullScreen');
ec.background('#aaaaaa');
ec.create('circle', 100, 100, 50, 50, 'blue', 'black', 2, 'circle1');
ec.create('sqaure', 150, 150, 150, 50, 'red', 'black', 2);
ec.create('triangle', 300, 300, 50, 50, 'green', 'black', 2);
ec.create('circle', 400, 400, 50, 50, 'transparent', 'black', 12);

ec.create('sqaure', 500, 500, 50, 50, 'transparent', 'black', 12);
ec.create('roundedRect', 600, 600, 50, 50, 'red', 'green', 12);
console.log(ec)


    // Assuming you have a reference to the canvas element
    let canvas = document.querySelector('canvas');

    canvas.addEventListener('mousemove', function(event) {
        let x = event.offsetX;
        let y = event.offsetY;
    
        console.log(`X: ${x}, Y: ${y}`);
    });


    const animate = () => {
        ec.clear();
        ec.background('#aaaaaa');
        //ec.Ctx.translate(0,0);
        ec.Component.forEach(obj => {
           
            obj.draw(ec.Ctx).shadow(ec.Ctx,'black',5,10,10).colorGRD(ec.Ctx,['red','blue','green']).up().left()
        });
       // ec.Component[0].colorGRD(ec.Ctx,['red','blue']).draw(ec.Ctx);
        requestAnimationFrame(animate);
    }

    animate();