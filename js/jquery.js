$(function () {
  //create slider setting
  $("#slider").slider({
    min: 5,
    max: 30,
    slide: function (event, ui) {
      //link slider to circle dimension range
      $("#circle").height(ui.value);
      $("#circle").width(ui.value);
    },
  });
});
