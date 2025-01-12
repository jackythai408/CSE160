// DrawRectangle.js
function main() {
    // Retrieve <canvas> element
    var canvas = document.getElementById('example');
    if (!canvas) {
      console.log('Failed to retrieve the <canvas> element');
      return;
    }
  
    // Get the rendering context for 2DCG
    var ctx = canvas.getContext('2d');
  
    // Draw a blue rectangle
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //const v1 = new Vector3([2.25, 2.25, 0]);
    //drawVector(ctx, v1, 'red');
}

function drawVector(ctx, v, color) {
    const X = 200; 
    const Y = 200;
    const scale = 20;
  
    const end_x = X + v.elements[0] * scale;
    const end_y = Y - v.elements[1] * scale; 

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(X, Y);
    ctx.lineTo(end_x, end_y);
    ctx.stroke();
}

function handleDrawEvent() {
    const canvas = document.getElementById('example');
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const x1 = parseFloat(document.getElementById("v1_x").value) || 0;
    const y1 = parseFloat(document.getElementById("v1_y").value) || 0;
    const v1 = new Vector3([x1, y1, 0]);
    const x2 = parseFloat(document.getElementById("v2_x").value) || 0;
    const y2 = parseFloat(document.getElementById("v2_y").value) || 0;
    const v2 = new Vector3([x2, y2, 0]);

    drawVector(ctx, v1, "red");
    drawVector(ctx, v2, "blue");
}

function angleBetween(v1, v2) {
    const dot = Vector3.dot(v1, v2);
    const magV1 = v1.magnitude();
    const magV2 = v2.magnitude();

    if (magV1 === 0 || magV2 === 0) {
        console.error("Cannot calculate angle");
        return null;
    }

    const cos = dot / (magV1 * magV2);
    const angleRad = Math.acos(Math.max(-1, Math.min(1, cos)));
    const angleDeg = angleRad * (180 / Math.PI);
    return angleDeg;
}

function areaTriangle(v1, v2) {
    const cross = Vector3.cross(v1, v2);
    const magnitude = cross.magnitude();
    const area = magnitude / 2;
    return area;
}

function handleDrawOperationEvent() {
    const canvas = document.getElementById('example');
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const x1 = parseFloat(document.getElementById("v1_x").value) || 0;
    const y1 = parseFloat(document.getElementById("v1_y").value) || 0;
    const v1 = new Vector3([x1, y1, 0]);
    const x2 = parseFloat(document.getElementById("v2_x").value) || 0;
    const y2 = parseFloat(document.getElementById("v2_y").value) || 0;
    const v2 = new Vector3([x2, y2, 0]);

    const operation = document.getElementById("operation").value;
    const scalar = parseFloat(document.getElementById("scalar").value) || 1;

    drawVector(ctx, v1, "red");
    drawVector(ctx, v2, "blue");

    if (operation === "add") {
      const v3 = new Vector3().set(v1).add(v2);
      drawVector(ctx, v3, "green");
    } else if (operation === "subtract") {
      const v3 = new Vector3().set(v1).sub(v2);
      drawVector(ctx, v3, "green");
    } else if (operation === "multiply") {
      const v3 = new Vector3().set(v1).mul(scalar);
      const v4 = new Vector3().set(v2).mul(scalar);
      drawVector(ctx, v3, "green");
      drawVector(ctx, v4, "green");
    } else if (operation === "divide") {
      const v3 = new Vector3().set(v1).div(scalar);
      const v4 = new Vector3().set(v2).div(scalar);
      drawVector(ctx, v3, "green");
      drawVector(ctx, v4, "green");
    } else if (operation === "magnitude") {
        console.log(`Magnitude v1: ${v1.magnitude()}`);
      console.log(`Magnitude v2: ${v2.magnitude()}`);
    } else if (operation === "normalize") {
      const v1Normalized = new Vector3().set(v1).normalize();
      const v2Normalized = new Vector3().set(v2).normalize();
      drawVector(ctx, v1Normalized, "green");
      drawVector(ctx, v2Normalized, "green");
    } else if (operation === "angle") {
      const angle = angleBetween(v1, v2);
      if (angle !== null) {
        console.log(`Angle: ${angle} degrees`);
      }
    } else if (operation === "area") {
      const area = areaTriangle(v1, v2);
      console.log(`Area: ${area}`);
    }
}