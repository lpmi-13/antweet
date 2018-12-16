$(document).ready(function() {

    var tButton = '<select class="the btn" name="the"><option value="null">(select)</option><option value="the">the</option><option value="a">a</option><option value="an">an</option></select>'

    var anButton = '<select class="an btn" name="an"><option value="null">(select)</option><option value="the">the</option><option value="a">a</option><option value="an">an</option></select>'

    var aButton = '<select class="a btn" name="a"><option value="null">(select)</option><option value="the">the</option><option value="a">a</option><option value="an">an</option></select>'

    $("li").html(function(i,t) {
        return t.replace(' the ', ' ' + tButton + ' ');
    });
    $("li").html(function(i,t) {
        return t.replace(' an ', ' ' + anButton + ' ');
    });
    $("li").html(function(i,t) {
        return t.replace(' a ', ' ' + aButton + ' ');
    });

    $('#back-button').click(function() {
      history.back(-1);
    });

    $("#check").click(function() {
        $(".the").each(function() {
           if ($(this).val() == 'the') {
               $(this).css("background-color", "#ff4719");
               $(this).css("border", "black");
               $(this).css("border-width", "1px");
               $(this).css("border-style", "solid");
               $(this).css("pointer-events", "none");
           }
        });
        $(".an").each(function() {
           if ($(this).val() == 'an') {
               $(this).css("background-color", "#ff4719");
               $(this).css("border", "black");
               $(this).css("border-width", "1px");
               $(this).css("border-style", "solid");
               $(this).css("pointer-events", "none");
           }
        });
        $(".a").each(function() {
           if ($(this).val() == 'a') {
               $(this).css("background-color", "#ff4719");
               $(this).css("border", "black");
               $(this).css("border-width", "1px");
               $(this).css("border-style", "solid");
               $(this).css("pointer-events", "none");
           }
        });
    });
  }); 