$("#gameCanvasWithOffset").hide();

// Serviront à récupérer 
var color;
var username;

//Variable de paramétrage
var movespeed = 5000;
var animationDuration = 10000;

//Regex pour vérifier la validité du pseudo
var regExpression=/[^A-Za-z0-9\.]+/; 

//offset de l'image
var offsetDown = 50;
var offsetRight = 50;

//Récupération du personnage et de sa position
var character = $('#character');
var position = character.position();

//Variable globale de score
var score = 0;
var bestScore = 0;

//Ajout d'un event sur le bouton commencer
$("button.startPlaying").click(function(){
	color = $("#html5colorpicker").val();
    username = $("#usernameInput").val();
    if(username.length > 15)
        alert("Veuillez entrer un pseudo d'une taille inférieur à 15 caractères")
    else if(username == undefined || username == null || username == '')
        alert("Veuillez entrer un pseudo")
    else if(regExpression.test(username)) {
        alert('Seul les caractères alphanumériques sont acceptés');
    }
    else {
        $("#gameMenu").hide();
        startGame();
    }
        
})

//Fonction qui ajoute les bonus et les malus toutes les 3 secondes de manière aléatoire
function addBonusOrMalusInterval(offset){
    setInterval(function(){ 
        var bonusQuantity = $('#bonus > li').length;
        var malusQuantity = $('#malus > li').length;
        var addToPositionX = Math.floor((Math.random() * 870) + offset);
        var addToPositionY = Math.floor((Math.random() * 700) + 85);
        var bonusOrMalus = Math.random() >= 0.5;

        //S'il n'y a pas de bonus sur le terrain on en ajoute un
        if(bonusQuantity == 0){
            bonus = $("#bonus").append("<li class=\'1\'></li>");
            $("#bonus > li.1").offset({top: addToPositionY});
            $("#bonus > li.1").offset({left: addToPositionX});
        }
        //ajout de bonus
        if(bonusQuantity < 8 && bonusQuantity != 0  && bonusOrMalus == 1){
            $("#bonus").append("<li class=\'" + (bonusQuantity+1) + "\'></li>");
            $("#bonus > li." + (bonusQuantity+1)).offset({top: addToPositionY});
            $("#bonus > li." + (bonusQuantity+1)).offset({left: addToPositionX});
        }
        //ajout de malus
        if(malusQuantity < 8 && bonusOrMalus == 0 && bonusQuantity > 0){
            if(malusQuantity == 0){
                $("#malus").append("<li class=\'1\'></li>");
                $("#malus > li.1").offset({top: addToPositionY});
                $("#malus > li.1").offset({left: addToPositionX});
            }
            else{
                $("#malus").append("<li class=\'" + (malusQuantity+1) + "\'></li>");
                $("#malus > li." + (malusQuantity+1)).offset({top: addToPositionY});
                $("#malus > li." + (malusQuantity+1)).offset({left: addToPositionX});
            }
        }
    }, 3000);
}

//Fonction qui démarre le jeu
function startGame(){
    //On génère le personnage en fonction de la couleur choisie -----------
    var svg = document.getElementById("characterSVG");
    svg.addEventListener("load", function(){

        // get the inner DOM of alpha.svg
        var svgDoc = svg.contentDocument;
        // get the inner element by id
        var g = svgDoc.getElementById("inside");
        // add behaviour
        g.setAttribute("fill", color);

        g = svgDoc.getElementById("outside");

        g.setAttribute("fill", color);
    });
    //---------------------------------------------------------------------
    //Ajout du username en dessous du personnage
    document.getElementById("username").innerHTML = username;
    $("#username").css("font-family", "MobaFont");
    $("#username").css("color", "#ffffff");

    //Apparition de la fenêtre de jeu
	$("#gameCanvasWithOffset").show();
    //On récupère le css après application de la feuille de style + du JQuery ----------------
    var canvas1 = document.getElementById("gameCanvasWithOffset");
    var canvas2 = document.getElementById("gameCanvasWithoutOffset");
    var css1 = window.getComputedStyle(canvas1, null);
    var css2 = window.getComputedStyle(canvas2, null);
    // Récupération de l'offset gauche de la fenêtre qui est en pourcentage
    var offset = parseInt(css1.getPropertyValue("margin-left")) + parseInt(css2.getPropertyValue("margin-left"));
    //----------------------------------------------------------------------------------------
    //On démarre le jeu en ajoutant des event sur les touches du claviers et en démarrant la génération de bonus/malus
    moveEventsInitialize(offset);
    addBonusOrMalusInterval(offset);
}

//Cette fonction vérifie si le personnage passe ou non sur un bonus/malus
function checkForBonusOrMalus(){
    position = character.position();
    var bonusQuantity = $('#bonus > li').length;
    var malusQuantity = $('#malus > li').length;
    $('#bonus >li').each(function(){

        var bonusPosition = $(this).position();
        //Si le personnage est sur un bonus, on le supprime de la liste et on augmente le score
        if(bonusPosition.top >= (position.top+335) && bonusPosition.left >=(position.left+415) && bonusPosition.top <=(position.top + 335 + 50) && bonusPosition.left <=(position.left + 400 + 50)){
            var i = 0;
            var numberLiNext = bonusQuantity - parseInt($(this).attr("class"));
            while($(this).nextAll("li").eq(i) != null && $(this).nextAll("li").eq(i) != undefined && i < numberLiNext){
                $(this).nextAll("li").eq(i).attr("class", String(parseInt($(this).nextAll("li").eq(i).attr("class"))-1));
                i++;
            }
            $(this).remove();
            increaseScore();
        }
    });
    $('#malus >li').each(function(){
        var malusPosition = $(this).position();
        //Si le personnage est sur un malus, on le supprime de la liste et on diminue le score
        if(malusPosition.top >= (position.top+335) && malusPosition.left >=(position.left+415) && malusPosition.top <=(position.top + 335 + 50) && malusPosition.left <=(position.left + 400 + 50)){
            var i = 0;
            var numberLiNext = malusQuantity - parseInt($(this).attr("class"));
            while($(this).nextAll("li").eq(i) != null && $(this).nextAll("li").eq(i) != undefined && i < numberLiNext){
                $(this).nextAll("li").eq(i).attr("class", String(parseInt($(this).nextAll("li").eq(i).attr("class"))-1));
                i++;
            }
            $(this).remove();
            decreaseScore();
        }
    });
}
//Augmente le score
function increaseScore(){
    score = score + 100;
    console.log($("#actualScore"));
    $('#actualScore').text("Score: " + String(score));
    checkScore();
}
//Diminue le score
function decreaseScore(){
    score = score - 350;
    $('#actualScore').text("Score: " + String(score));
    checkScore();
}
//On vérifie que le score n'est pas négatif ou si il y a un record
function checkScore(){
    if(score < 0){
        alert("Vous avez perdu");
        setTimeout(function(){
            location.reload();
        }, 2);
    }
    else if(score > bestScore){
        bestScore = score;
        $('#bestScore').text("Meilleur score: " + String(bestScore));
    }
}

//Fonction qui ajoute des Listener sur le clavier et qui déplace le personnage
function moveEventsInitialize(offset){
    document.addEventListener('keydown', function(e) {
        position = character.position();
        if(e.keyCode == 40 || e.keyCode == 83){
            character.animate({
                "top" : "+="+movespeed+"px"
            }, {
                duration: animationDuration,
                step: function(){
                    checkForBonusOrMalus();
                    //Si le personnage sort du terrain, on arrête l'animation et on le renvoit de l'autre côté
                    if(position.top > 425){
                        character.stop();
                    }
                }
            });
            //Si le personnage sort du terrain, on arrête l'animation et on le renvoit de l'autre côté
            if(position.top > 420)
                character.offset({top : 50});
        }

        if(e.keyCode == 38 || e.keyCode == 90){
            character.animate({
                "top" : "-="+movespeed+"px"
            }, {
                duration: animationDuration,
                step: function(){
                    checkForBonusOrMalus();
                    //Si le personnage sort du terrain, on arrête l'animation et on le renvoit de l'autre côté
                    if(position.top < -275){
                        character.stop();
                    }
                }
            });
            //Si le personnage sort du terrain, on arrête l'animation et on le renvoit de l'autre côté
            if(position.top < -275)
                character.offset({top : 750});
        }

        if(e.keyCode == 37 || e.keyCode == 81){
            character.animate({
                "left" : "-="+movespeed+"px"
            }, {
                duration: animationDuration,
                step: function(){
                    checkForBonusOrMalus();
                    //Si le personnage sort du terrain, on arrête l'animation et on le renvoit de l'autre côté
                    if(position.left < (offset-420)){
                        character.stop();
                    }
                }
            });
            //Si le personnage sort du terrain, on arrête l'animation et on le renvoit de l'autre côté
            if(position.left < offset-420)
                character.offset({left : (offset+830)});
        }

        if(e.keyCode == 39 || e.keyCode == 68){
            character.animate({
                "left" : "+="+movespeed+"px"
            }, {
                duration: animationDuration,
                step: function(){
                    checkForBonusOrMalus();
                    //Si le personnage sort du terrain, on arrête l'animation et on le renvoit de l'autre côté
                    if(position.left > (offset+425)){
                        character.stop();
                    }
                }
            });
            //Si le personnage sort du terrain, on arrête l'animation et on le renvoit de l'autre côté
            if(position.left > (offset+425))
                character.offset({left : offset-20});
        }
    });
    //On arrête l'animation si la touche est relâchée
    document.addEventListener('keyup', function(e) {
        if(e.keyCode == 40 || e.keyCode == 83){
            character.stop(true);
        }

        if(e.keyCode == 38 || e.keyCode == 90){
            character.stop(true);
        }

        if(e.keyCode == 37 || e.keyCode == 81){
            character.stop(true);
        }

        if(e.keyCode == 39 || e.keyCode == 68){
            character.stop(true);
        }
    });
}

