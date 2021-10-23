# IlogApp

## AUTORS 
Marouane KHANDALI | Ismail ZEGOUR

Nous avons réaliser une vidéo de démonstration de l’application, dont le lien est le suivant :

https://www.youtube.com/watch?v=8cZbnLawxeY

## INSTALLATION

Notre application est basée sur le framework react-native, développé par Facebook, à la base des applications Facebook, Airbnb et Netflix, ainsi que le framework Expo.

Pré-requis:

*Installer Node.js LTS release :*
 https://nodejs.org/en/

**1.EXPO CLI**

*Installer EXPO CLI*

    npm install --global expo-cli

Ensuite vous allez pouvoir créer votre application en insérant la commande suivante :

    expo init "nom_de_lapplication" --template blank

**2.DEPENDANCES**

Afin de compiler par vous même notre application, vous aurez besoin d'installer les packages react-native suivants dans le dossier contenant l'application:

    npm install expo-av
    npm install expo-camera
    npm install expo-location
    npm install expo-sqlite 
    npm install react-native-gesture-handler 
    npm install react-native-vector-icons
    npm install @react-navigation/native
    npm install @react-navigation/stack

**3.EXPO GO (Application Android)**

Pour faciliter la compilation de notre application sur une instance Android, nous l'hébergeons sur un serveur local Metro Bundler, qui va compiler notre code JavaScript en utilisant Babel et nous faire un rendu de notre application sur Expo Go. La commande permettant de lancer notre serveur de développement à partir du dossier contenant notre le code de notre application est la suivante:

    expo start

Il faut donc installer l'application Expo Go sur son smartphone afin de la lancer directement sur celui-ci, en récupérant un lien vers ce serveur local.

Lien Expo Go (Android Play store) : https://play.google.com/store/apps/details?id=host.exp.exponent

Afin de faciliter le lancement de notre application, nous l'avons hébergée sur un serveur distant, vous n'aurez donc qu'à scanner le code sur votre application Expo Go.

![QrCode](https://zupimages.net/up/21/10/oy42.png)

## Code source
Notre code se présente de cette façon la.
Notre code principal se situe dans le dossier Components et Database, ainsi que dans le fichier App.js (Flèches rouges). Notre dossier assets contient les logos utilisés par l'application (Flèche jaune).

![](https://scontent.xx.fbcdn.net/v/t1.15752-9/160610175_436301787430799_6197191528808489008_n.png?_nc_cat=106&ccb=1-3&_nc_sid=f79d6e&_nc_eui2=AeF_mA87CB5uFkq_z5_TTDaJHecDfyTOtdAd5wN_JM610KMeW5cAxf8eS1L4o3bilzk&_nc_ohc=tYymujNewXwAX9M8Xws&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=699379e9962392c9c1d84e6d5490e21e&oe=607275EE)

## Utilisation

Notre application utilise les APIs d’accès aux composants de l’appareil ( Appareil photo, microphone, haut-parleurs et localisation). La permission de l’utilisateur est demandée avant le lancement de chacune des fonctionnalités. L’application permet de prendre une photo, d’y ajouter un titre et une description, une bande sonore, puis de l’enregistrer dans une galerie dédiée à notre application. Lorsque l’on enregistre une photo, on peut la retrouver dans cette galerie, ainsi que toute les informations qui lui sont rattachées (titre, description, date et localisation).

L’écran d’accueil contient un bouton en bas de l’écran qui permet de lancer l’appareil photo. Celui-ci lance la caméra et nous permet de prendre une photo.


![image](https://user-images.githubusercontent.com/37546010/111075915-65cbc980-84ea-11eb-8852-e2726774f2a4.png)

Lorsque l’on a pris une photo, nous avons un aperçu de celle-ci, puis nous pouvons l’enregistrer ou en reprendre une nouvelle.

![image](https://user-images.githubusercontent.com/37546010/111075996-b04d4600-84ea-11eb-84f2-9cb49a4db37c.png)


Si nous l’enregistrons, nous avons alors un écran permettant de remplir des informations sur cette photo ainsi qu’un bouton qui lance le micro, pour associer une bande sonore à notre photo. Nous pouvons également enregistrer un contenu audio qui sera associé a notre photo. Il suffit de rester appuyer sur le micro le temps de notre enregistrement.

![image](https://user-images.githubusercontent.com/37546010/111076018-cce97e00-84ea-11eb-96ac-c395f30f9b7d.png) ![image](https://user-images.githubusercontent.com/37546010/111076039-ee4a6a00-84ea-11eb-8783-3799401752b7.png)

Une fois validée, on retrouve cette photo dans notre galerie.

![image](https://user-images.githubusercontent.com/37546010/111076081-29e53400-84eb-11eb-89b5-447e627afa89.png)

Lorsque l’on appuie dessus, on retrouve notre photo ainsi que l’ensemble des informations que l’on a enregistré au moment de la prise.

![image](https://user-images.githubusercontent.com/37546010/111076087-2f427e80-84eb-11eb-8b02-35c26a21f6bf.png)


