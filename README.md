# MobaGame
Déroulement du jeu :
En arrivant sur la page web, le jeu doit demander deux choses à l'utilisateur :
Un pseudo : qui est une chaîne de caractères et doit comprendre uniquement des caractères alphanumériques. (ex. PiouDu33)
Une couleur : qui est également une chaîne de caractères pouvant être définie manuellement via une représentation hexadécimale. (ex. #6633FF)
Une fois le formulaire validé, un MobaPiouPiou (cf logo de MOBALIB en pièce jointe) devra être généré de la couleur choisie précédemment et le pseudo défini à l'étape précédente devra apparaître en permanence sous le MobaPiouPiou.

Le MobaPiouPiou pourra alors se déplacer sur toute la page à l'aide des touches claviers suivantes : 
Z ou Flèche du Haut : Pour se déplacer vers le  haut de l'écran
Q ou Flèche de Gauche : Pour se déplacer vers la gauche
D ou Flèche de Droite : Pour se déplacer vers la droite
S ou Flèche du Bas : Pour se déplacer vers le bas de l'écran
Ou à l'aide de la souris. Il est éventuellement possible d'appliquer des rotations sur le Piou en fonction de la position de la souris.

Le personnage pourra ainsi ramasser des bonus ou des malus (ceux-ci doivent être différenciés visuellement) placés aléatoirement sur l'écran qui incrémenteront ou décrémenteront un compteur de points placé en haut à droite de l'écran. Les bonus / malus doivent apparaître continuellement sur l'écran, on ne peut pas se retrouver sans bonus à l'écran.
Dans le cas où nos points tombent en dessous de 0, le jeu s'arrête et on redemande un pseudo et une couleur à l'utilisateur afin de recommencer une session.