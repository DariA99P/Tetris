import {TypeFigure} from "./enum";

export const colors = [
    null,
    '#F4E334',
    '#F47134',
    '#34D7F4',
    '#F434E5',
    '#5B1E33',
    '#A79BEC',
    '#C90F39'
];

export const collide=(area,player) => {
    const [m,o]=[player.matrix,player.pos];
    for(let y=0;y<m.length;++y){
        for(let x=0;x<m[y].length;++x){
            if(m[y][x]!==0&&(area[y+o.y]&&area[y+o.y][x+o.x])!==0){
                return true;
            }
        }
    }
    return false;
};

export const makeMatrix= (w,h) => {
    const matrix=[];
    while(h--){
        // @ts-ignore
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
};

export const getFigure = type => {
    switch(type) {
        case TypeFigure.T:
            return [
                [0,0,0],
                [6,6,6],
                [0,6,0]
            ];
        case TypeFigure.O:
            return [
                [2,2],
                [2,2]
            ];
        case TypeFigure.L:
            return [
                [0,7,0],
                [0,7,0],
                [0,7,7]
            ];
        case TypeFigure.J:
            return [
                [0,4,0],
                [0,4,0],
                [4,4,0]
            ];
        case TypeFigure.I:
            return [
                [0,1,0,0],
                [0,1,0,0],
                [0,1,0,0],
                [0,1,0,0]
            ];
        case TypeFigure.S:
            return [
                [0,3,3],
                [3,3,0],
                [0,0,0]
            ];
        default:
            return [
                [5,5,0],
                [0,5,5],
                [0,0,0]
            ];
    }
};

export const rotateFigure = (matrix,dir) => {
    for(let y=0;y<matrix.length;++y){
        for(let x=0;x<y;++x){
            [
                matrix[x][y],
                matrix[y][x]
            ]=[
                matrix[y][x],
                matrix[x][y],
            ]
        }
    }
    if(dir>0){
        matrix.forEach(row=>row.reverse());
    }
    else{
        matrix.reverse();
    }
};
