import React from "react";
import {collide, colors, getFigure, makeMatrix, rotateFigure} from "../helpers";
import {ButtonCode, TypeFigure} from "../enum";

const  SHIFT = 25;
const RECTANGLE_WIDTH = 150;
const RECTANGLE_HEIGHT = 50;

const SQUARE_WIDTH = 100;
const SQUARE_HEIGHT = 100;

const randomInteger = (min, max) => {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.abs(Math.round(rand));
};

const moveDown = (ctx, x, curY, width, height, arrayY: number[], arrayX: Array<number[]>) => {
    let y = curY;
    const isValid = arrayY
        .filter(
            value => y + SHIFT + height <= value ||
                (
                    !arrayX.find(valX => x + width > valX[0])
                )
        ).length;

    if (isValid) {
        ctx.clearRect(x,y,width,height);
        y += SHIFT;
        ctx.fillRect(x,y,width,height);
    }
    return y;
};

const moveRight = (ctx, curX, y, width, height, maxX) => {
    let x = curX;
    if (x + SHIFT <= maxX) {
        ctx.clearRect(x,y,width,height);
        x += SHIFT;
        ctx.fillRect(x,y,width,height);
    }
    return x;
};

const moveLeft = (ctx, curX, y, width, height) => {
    let x = curX;
    if (x - SHIFT > 24) {
        ctx.clearRect(x,y,width,height);
        x -= SHIFT;
        ctx.fillRect(x,y,width,height);
    }
    return x;
};

// const getCanvas = (
//     play: boolean,
//     pointsY: number[],
//     pointsX: Array<number[]>,
// ) => {
//     const canvas = document.getElementById('canvasId');
//     let ctx;
//     let x = 25;
//     let y = 20;
//     let width = 0;
//     let height = 0;
//     let maxY = 720;
//     let maxX = 0;
//     let arrayY: number[] = pointsY;
//     let arrayX: Array<number[]> = pointsX;
//     console.log(arrayY);
//     console.log(arrayX);
//     // @ts-ignore
//     if (canvas.getContext && play) {
//         // @ts-ignore
//         ctx = canvas.getContext("2d");
//         let numFigure = randomInteger(0, 1);
//         switch (numFigure) {
//             case 0: {
//                 ctx.fillStyle = '#FEA04C';
//                 width = RECTANGLE_WIDTH;
//                 height = RECTANGLE_HEIGHT;
//                 maxX = 275;
//                 break;
//             }
//             default: {
//                 ctx.fillStyle = '#F5E43D';
//                 width = SQUARE_WIDTH;
//                 height = SQUARE_HEIGHT;
//                 maxX = 325;
//                 break;
//             }
//         }
//         ctx.fillRect(x,y,width,height);
//         if (!arrayY.length) {
//             arrayY = [...arrayY, maxY];
//         }
//         document.addEventListener('keydown', (event) => {
//             const keyName = event.key;
//             if (keyName === 'ArrowRight')
//                 x = moveRight(ctx, x, y, width, height, maxX);
//             if (keyName === 'ArrowLeft')
//                 x = moveLeft(ctx, x, y, width, height);
//             if (keyName === 'ArrowDown')
//                 y = moveDown(ctx, x, y, width, height, arrayY, arrayX);
//         });
//
//         const timer = setInterval(() => {
//             y = moveDown(ctx, x, y, width, height, arrayY, arrayX);
//             const saveY = y;
//             if (arrayY.includes(y + height)) {
//                 clearInterval(timer);
//                 x = 25;
//                 y = 20;
//                 width = 0;
//                 height = 0;
//                 getCanvas(play, [...arrayY, saveY], [...arrayX, [x, x + width]]);
//             }
//         }, 500);
//     }
// };

export let nextFigure: TypeFigure = randomInteger(0, 6);
let score = 0;
const setCanvasSettings = () => {
    const canvas = document.getElementById("canvasId");
    // @ts-ignore
    const context = canvas.getContext("2d");
    // @ts-ignore
    const canvasNextFigure = document.getElementById("nextFigureId");
    // @ts-ignore
    const contextNext = canvasNextFigure.getContext("2d");
    // @ts-ignore
    context.clearRect(0,0,canvas.width,canvas.height);
    context.scale(20,20);
    // @ts-ignore
    contextNext.clearRect(0,0,canvasNextFigure.width,canvasNextFigure.height);
    contextNext.scale(20,20);
    const initialMatrix=makeMatrix(15,25);
    let dropInter=100;
    let time=0;
    const figureSettings={
        pos:{
            x:0,
            y:0
        },
        matrix:null,
        score:0
    };
    const move=1;
    let gameLoop;
    let gameRun=false;
    let points = () => {
        let rowCount=1;
        cycle:for(let y=initialMatrix.length-1;y>0;--y){
            // @ts-ignore
            for(let x=0;x<initialMatrix[y].length;++x){
                if(initialMatrix[y][x]===0){
                    continue cycle;
                }
            }
            // @ts-ignore
            const row=initialMatrix.splice(y,1)[0].fill(0);
            // @ts-ignore
            initialMatrix.unshift(row);
            ++y;
            figureSettings.score+=rowCount*100;
            rowCount*=2;
        }
    }

    const drawMatrixByTypeFigure = (matrix, offset, type = 'canvasId') => {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0 && type === 'canvasId') {
                    context.fillStyle = colors[value];
                    context.fillRect(x + offset.x, y + offset.y, 1, 1);
                }
                if (value !== 0 && type === 'nextCanvasId') {
                    contextNext.fillStyle = colors[value];
                    contextNext.fillRect(x + offset.x, y + offset.y, 1, 1);
                }
            });
        });
    }

    const merge = (area,player) => {
        player.matrix.forEach((row,y)=>{
            row.forEach((value,x)=>{
                if(value!==0){
                    area[y+player.pos.y][x+player.pos.x]=value;
                }
            });
        });
    };
    const updateScore = () => {
        const scoreField = document.getElementById('resultId');
        score = figureSettings.score;
        // @ts-ignore
        scoreField.innerText = `Счет: ${score}`;
    };
    const runGame = () => {
        const type: TypeFigure = nextFigure;
        nextFigure = randomInteger(0, 6);
        // @ts-ignore
        figureSettings.matrix=getFigure(type);
        figureSettings.pos.y=0;
        // @ts-ignore
        figureSettings.pos.x=(Math.floor(initialMatrix[0].length/2))-(Math.floor(figureSettings.matrix[0].length/2));
        if(collide(initialMatrix,figureSettings)){
            // @ts-ignore
            initialMatrix.forEach(row=> row.fill(0));
            gameRun=false;
        }
    };
    const playerDrop = () => {
        figureSettings.pos.y++;
        if(collide(initialMatrix,figureSettings)){
            figureSettings.pos.y--;
            merge(initialMatrix,figureSettings);
            points();
            runGame();
            updateScore();
        }
    };
    const playerMove = dir => {
        figureSettings.pos.x+=dir;
        if(collide(initialMatrix,figureSettings)){
            figureSettings.pos.x-=dir;
        }
    };
    const changeFigureRotate = dir => {
        const pos=figureSettings.pos.x;
        let offset=1;
        rotateFigure(figureSettings.matrix,dir);
        while(collide(initialMatrix,figureSettings)){
            figureSettings.pos.x+=offset;
            offset=-(offset+(offset>0?1:-1));
            // @ts-ignore
            if(offset>figureSettings.matrix[0].length){
                rotateFigure(figureSettings.matrix,-dir);
                figureSettings.pos.x=pos;
                return;
            }
        }
    };
    const draw = () => {
        context.fillStyle = '#fff';
        contextNext.fillStyle = '#fff';
        // @ts-ignore
        context.fillRect(0, 0, canvas.width, canvas.height);
        // @ts-ignore
        contextNext.fillRect(0, 0, canvasNextFigure.width, canvasNextFigure.height);
        updateScore();
        drawMatrixByTypeFigure(initialMatrix,{x:0,y:0});
        drawMatrixByTypeFigure(figureSettings.matrix,figureSettings.pos);
        drawMatrixByTypeFigure(getFigure(nextFigure),{x:3,y:3}, 'nextCanvasId');
    };
    const update = () => {
        time++;
        // figureSettings.score = 0;
        if(time >= dropInter){
            playerDrop();
            time=0;
        }
        draw();
    };
    const setStatePlayer = text => {
        clearInterval(gameLoop);
        context.font="2px Comic Sans MS";
        context.fillStyle="#000000";
        context.textAlign="center";
        context.textBaseline="middle";
        // @ts-ignore
        context.fillText(text,(canvas.width/20)/2,(canvas.width/20)/2);
    };

    setStatePlayer('Начните игру');
    if (gameRun) {
       runGame();
       draw();
   }
    document.addEventListener('keydown',function(e){
        switch (e.keyCode) {
            case ButtonCode.LEFT: {
                playerMove(-move);
                break;
            }
            case ButtonCode.UP: {
                changeFigureRotate(-move);
                break;
            }
            case ButtonCode.RIGHT: {
                playerMove(+move);
                break;
            }
            default: {
                if(gameRun){
                    playerDrop();
                }
                break;
            }
        }
    });
    // @ts-ignore
    document.getElementById("start").onclick=function(){
        gameRun=true;
        runGame();
        gameLoop=setInterval(() => {
            if (gameRun){
                update();
                // @ts-ignore
                this.disabled=true;
            }
            else {
                setStatePlayer('Игра окончена');
                // @ts-ignore
                this.disabled=false;
            }
        },10);
    };
}
export const CanvasComponentStyled: React.FC = () => {
    React.useEffect(() => {
        setCanvasSettings();
    }, [])
    // document.addEventListener(
    //     'DOMContentLoaded', setCanvasSettings,
    // );
    return <canvas id="canvasId" width='300' height='500' style={{ border: '2px solid' }}/>
};