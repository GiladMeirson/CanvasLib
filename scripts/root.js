
import { GameObject } from './GameObject.js';
import { Component, TextComponent } from './component.js';



class EasyCanvas   {
    constructor(id,mode='default') {
        let boolId = id==''||id==null||id==undefined;
        this.Id = ''?id='mycanvas':id;
        this.Mode = mode;
        this.Component = [];
        if (boolId) {
            console.warn('⚠️ EasyCanvas - No id provided, creating a canvas with id "mycanvas" and appending it to the body.',);
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
                console.warn('EasyCanvas - make sure the id is of a canvas element.')
                console.error('EasyCanvas - Canvas not found');
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


    /**
 * Creates a new component and adds it to the component list.
 *
 * @param {string} shape - The shape of the component, defaults to 'square'.
 * @param {number} x - The x-coordinate of the component, defaults to half of the inner width.
 * @param {number} y - The y-coordinate of the component, defaults to half of the inner height.
 * @param {number} width - The width of the component, defaults to 100.
 * @param {number} height - The height of the component, defaults to 100.
 * @param {string} color - The color of the component, defaults to 'red'.
 * @param {string} outlineColor - The outline color of the component, defaults to 'black'.
 * @param {number} lineWidth - The line width of the component, defaults to 2.
 * @param {string} id - The id of the component.
 * @returns {Component} The newly created component.
 */

    createComponent(shape='sqaure',x=innerWidth/2,y=innerHeight/2,width=100,height=100,color='red',outlineColor='black',lineWidth=2,id){
        const obj =  new Component(this.Ctx,shape,x,y,width,height,color,outlineColor,lineWidth,id);
        obj.draw(this.Ctx);
        this.Component.push(obj);
        return obj;

    }
    createTextComponent(x=innerWidth/2,y=innerHeight/2,text='Hello World',font='Ariel',size=50,color='red',outlineColor='black',lineWidth=2){
        const obj =  new TextComponent(this.Ctx,x,y,text,font,size,color,outlineColor,lineWidth);
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


    animate(func){
        func();
        this.AnimID = requestAnimationFrame(this.animate.bind(this, func));
    }

    stopAnimate(){
        if (this.AnimID!=null) {
            cancelAnimationFrame(this.AnimID);
        }
        else{
            console.warn('EasyCanvas - No animation running');
        }
    }


    checkCoordinates(){
        this.Canvas.addEventListener('mousemove', function(event) {
            let x = event.offsetX;
            let y = event.offsetY;
        
            console.log(`X: ${x}, Y: ${y}`);
        });
    
    }
}









//////////////////////////test script//////////////////////////

let ec = new EasyCanvas('', 'fullScreen');
ec.createComponent('circle', 100, 100, 50, 50, 'blue', 'black', 2, 'circle1');
ec.createComponent('sqaure', 150, 150, 150, 50, 'red', 'black', 2);
ec.createComponent('triangle', 300, 300, 50, 50, 'green', 'black', 2);
ec.createComponent('circle', 400, 400, 50, 50, 'transparent', 'black', 12);

ec.createComponent('sqaure', 500, 500, 50, 50, 'transparent', 'black', 12);
ec.createComponent('roundedRect', 600, 600, 50, 50, 'red', 'green', 12);
const text = new TextComponent(ec.Ctx,220,120,'hello world','Ariel',50,'red','black');
console.log(ec)


ec.checkCoordinates()



    ec.animate(()=>{
        ec.clear();
        ec.background('#aaaaaa');
        ec.Component.forEach(obj => {
            obj.draw()
        });
        text.resetShadow().draw();
    });


    ec.Component[0].onKeyBoard_left((comp)=>{
        comp.left(5);
    })
    ec.Component[0].onKeyBoard_right((comp)=>{
        comp.right(5);
    })
    ec.Component[0].onKeyBoard_up((comp)=>{
        comp.up(5);
    })
    ec.Component[0].onKeyBoard_down((comp)=>{
        comp.down(5);
    })
 