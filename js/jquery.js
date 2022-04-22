$(function () {
  /*
  var canvas = document.getElementById("paint");
  //we use method of canvas object to define context.
  var context = canvas.getContext("2d"); //we get the 2d context in this variable.
  //draw a line
  //declare new path
  context.beginPath();
  //set line width
  context.lineWidth = 40;
  //set line color
  context.strokeStyle = "#42e565";
  //set cap to the line (round, butt, square)
  context.lineCap = "round";
  //set line join style (bevel, round, miter)
  context.lineJoin = "round";
  //position the context point
  context.moveTo(50, 50);
  //draw a straight line from starting point to a new position
  context.lineTo(200, 200);
  //draw another line
  context.lineTo(400, 100);
  //make line visible
  context.stroke();
  */
  //declare variables
  //paintingErasing or not
  var paint = false;
  //painting or erasing
  var paint_erase = "paint";
  //get the canvas and context
  var canvas = document.getElementById("paint");
  var ctx = canvas.getContext("2d"); //context is used to draw
  //get the canvas container
  var container = $("#container");
  //mouse position
  var mouse = { x: 0, y: 0 }; //initial coordinate
  //onload load saved work from localstorage
  function showDraw() {
    if (localStorage.getItem("imgCanvas") != null) {
      //to draw image inside context, we first use constructor to create image object
      var img = new Image();
      //we use an event to set a function where we go to draw image.
      img.onload = function () {
        ctx.drawImage(img, 0, 0); //coordinate of the start left/top point of the canvas.
      };
      img.src = localStorage.getItem("imgCanvas"); //we define the source of our image which correspond to canvas url in localStorage.
    }
  }
  showDraw();
  //set drawing parameters (lineWidth, lineJoin, lineCap)
  ctx.lineWidth = 3;
  ctx.lineJoin = "round"; //define shape of line edge
  ctx.lineCap = "round"; //define shape between to line
  //change canvas and container width dynamically for responsive
  //   const innerWidth = window.innerWidth;
  //   const innerHeight = window.innerHeight;
  //   const outerWidth = window.outerWidth;
  //   const outerHeight = window.outerHeight;
  //   console.log(innerWidth);
  //   console.log(innerHeight);
  //   console.log(outerWidth);
  //   console.log(outerHeight);
  $(window).on("resize load", function () {
    if (window.innerWidth < 510) {
      canvas.width = "300";
      canvas.height = "400";
    } else {
      canvas.width = "500";
      canvas.height = "400";
    }
    showDraw();
    if (localStorage.getItem("colorCircle") != null) {
      $("#circle").css("background-color", localStorage.getItem("colorCircle"));
      $("#paintColor").val(localStorage.getItem("colorCircle"));
    }
  });
  $("#circle").css("background-color", $("#paintColor").val());
  //click inside container
  container.on("touchstart mousedown", function (e) {
    paint = true;
    //declare new path
    ctx.beginPath();
    //get current mouse position
    mouse.x = e.pageX - this.offsetLeft; //e.pageX give distance between mouse and left border of browser page, this.offsetLeft give distance between container and left border of the page.
    mouse.y = e.pageY - this.offsetTop;
    //position the context point
    ctx.moveTo(mouse.x, mouse.y); //coordinate set dynamically with mouse position variable.
    e.preventDefault();
  });
  //move the mouse while holding mouse key
  container.on("touchmove mousemove", function (e) {
    //get current mouse position
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    if (paint == true) {
      if (paint_erase == "paint") {
        //set color input
        ctx.strokeStyle = $("#paintColor").val();
      } else {
        //set white line color to erase
        ctx.strokeStyle = "white";
      }
      //draw a straight line
      ctx.lineTo(mouse.x, mouse.y);
      //make line visible
      ctx.stroke();
    }
    e.preventDefault();
  });
  //mouse up -> we are not paintingErasing anymore
  container.on("touchend mouseup", function (e) {
    paint = false;
    e.preventDefault();
  });
  //if we leave the container we are not paintingErasing anymore
  container.on("mouseleave", function () {
    paint = false;
  });
  //click on the reset button
  $("#reset").on("click", function () {
    //clearRectangle method is used to empty the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height); //canvas coordinate of the top/left corner point and the bottom/right point.
    paint_erase = "paint";
    $("#erase").removeClass("eraseMode");
    if (localStorage.getItem("imgCanvas") != null) {
      localStorage.removeItem("imgCanvas");
    }
  });
  //click on the save button
  $("#save").on("click", function () {
    if (typeof localStorage != null) {
      //create new key/value pair in localStorage
      localStorage.setItem("imgCanvas", canvas.toDataURL()); //toDataURL return an URL that contain our graphical data.
      localStorage.setItem("colorCircle", $("#paintColor").val());
    } else {
      window.alert("Your browser does not support local storage!");
    }
  });
  //click on the erase button
  $("#erase").on("click", function () {
    if (paint_erase == "paint") {
      paint_erase = "erase";
    } else {
      paint_erase = "paint";
    }
    const btnErase = document.getElementById("erase");
    btnErase.classList.toggle("eraseMode");
  });
  //change color input
  $("#paintColor").on("change", function () {
    $("#circle").css("background-color", $(this).val()); //this refer to paintColor not circle because it is related to eventListener method.
  });
  //change lineWidth using slider
  $("#slider").slider({
    min: 3,
    max: 30,
    slide: function (event, ui) {
      $("#circle").height(ui.value); //ui.value correspond to diameter of the circle
      $("#circle").width(ui.value);
      ctx.lineWidth = ui.value; //we connect the line width with the circle diameter
    },
  });
});
