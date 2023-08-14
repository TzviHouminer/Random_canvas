const myCanvas = document.getElementById("canvasID");
const OFFSET_Left = Math.floor(myCanvas.getBoundingClientRect().x);
const OFFSET_Top = Math.floor(myCanvas.getBoundingClientRect().y);
const X_End = Math.floor(myCanvas.getBoundingClientRect().right) - OFFSET_Left; //for limit the location of circles in the canvas.
const Y_End = Math.floor(myCanvas.getBoundingClientRect().bottom) - OFFSET_Top; // ^
let timeoutIDs = []; //for tracking the timeout functions running in case the user change the number during the drawing process.

const randomNum = (topRange) => {
    return Math.floor(Math.random() * (topRange+1))
}

const stopDrawing = () => {
    try{
        timeoutIDs.map(id=>{clearTimeout(id)}); //stop creating circles
        timeoutIDs = [];
    }catch(err){
        console.log("reset timeouts of creating circles error: ",err)
    }
}

const drawCircles = () => {
    stopDrawing();
    try{
        const numOfCircles = +document.getElementById("numID").value;
        const painter = myCanvas.getContext("2d");
        painter.clearRect(0, 0, myCanvas.width, myCanvas.height);
        
        for(let i = 1; i<=numOfCircles; i++){
            const timeoutID = setTimeout(() => {
                painter.beginPath();
                painter.fillStyle = '#'+ randomNum(16777214).toString(16);
                painter.arc(randomNum(X_End), randomNum(Y_End),randomNum(200),0,2*Math.PI);
                painter.fill();
            }, 100*i)
            timeoutIDs.push(timeoutID);
        }
    }catch(err){
        console.log("error: ",err)
    }
}

const validateInput = () => {
    const drawButton = document.getElementById("drawButton");
    const inputValue = document.getElementById("numID").value;
    const isValidNumber = !isNaN(inputValue) && inputValue !== '';
    drawButton.disabled = !isValidNumber;
}
