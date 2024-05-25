
import { GameObject } from './GameObject.js';
import { Component } from './component.js';



class EasyCanvas   {
    constructor(id,mode='default') {
        let boolId = id==''||id==null||id==undefined;
        this.Id = ''?id='mycanvas':id;
        this.Mode = mode;
        this.Objects = [];
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

    create(shape='sqaure',x=innerWidth/2,y=innerHeight/2,width=100,height=100,color='red',outlineColor='black',lineWidth=2){
        const obj =  new Component(shape,x,y,width,height,color,outlineColor,lineWidth);
        obj.draw(this.Ctx);
        this.Objects.push(obj);
        return obj;

    }

 
}


let ec = new EasyCanvas('', 'fullScreen');
ec.background('#aaaaaa');
ec.create('sqaure', 50, 50, 100,false,'blue');
ec.create('circle', 200, 200, 100,false, 'green');
ec.create('triangle', 400, 400, 100,false, 'orange');
ec.create('sqaure', 150, 150, 100,true,'blue');
ec.create('circle', 250, 250, 100,true, 'green');
ec.create('triangle', 500, 500, 100,true, 'orange');
ec.create('sqaure', 700, 700, 100,false,'blue');