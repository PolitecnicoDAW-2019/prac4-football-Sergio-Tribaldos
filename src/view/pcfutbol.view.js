class View {

    constructor() {
        this.playersList=[];
        this.positionsList;
        this.selectedPlayer;
        this.DOM=[]

    }

    getAllPlayers(players) {
        for(const {ID,ALIAS,NAME,BIRTH_DATE,POSITION,IMAGE} of players){
            this.playersList.push(new Player(ID,ALIAS,NAME,BIRTH_DATE,POSITION,IMAGE))
        }

    }
    getAllPositions(positions) {
        this.positionsList = positions;
    }

    loadHTML(body) {
        document.getElementById("main").innerHTML = body;

    }

    loadDOMSelectors() {
        this.DOM.playersList = document.getElementById("players-menu-list");
        this.DOM.positionsList=document.getElementById("positions-input")
        this.DOM.aliasInput=document.getElementById("alias-input");
        this.DOM.nameInput=document.getElementById("name-input");
        this.DOM.birthInput=document.getElementById("birth-input");
        this.DOM.imageInput=document.getElementById("image-input");
        this.DOM.imageDiv=document.getElementById("image-div");
        this.DOM.updateButton=document.getElementById("update-button");
        this.DOM.modifyPlayerButton=document.getElementById("modify-players-button");
        this.DOM.addNewPlayerButton=document.getElementById("add-newPlayer-button");
        this.DOM.addPlayerButton=document.getElementById("add-button");
        this.DOM.removePlayerButton=document.getElementById("remove-button");

    }
    showAllPositions(){
        for (const position of this.positionsList){
            const option=document.createElement("option");
            option.value=position.DESCRIPTION;
            option.innerHTML=position.DESCRIPTION;
            this.DOM.positionsList.append(option)
        }
    }

    showAllPlayers(){
        this.DOM.playersList.innerHTML="";
        this.DOM.imageDiv.classList.add("invisible")
        for (const player of this.playersList){
            const card=document.createElement("div")
            card.classList.add("card");
            card.setAttribute('data-id',player.ID);

            const img=document.createElement("img")
            img.src=player.IMAGE;
            img.classList.add("card-img-top");
            card.append(img)

            const cardBody=document.createElement("div")
            cardBody.classList.add("card-body");

            const cardTitle=document.createElement("h5");
            cardTitle.classList.add("card-title")
            cardTitle.innerHTML=player.ALIAS;

            cardBody.append(cardTitle);
            card.append(cardBody);

            const listGroup=document.createElement("ul");
            listGroup.classList.add("list-group");
            listGroup.classList.add("list-group-flush");

            let listGroupItem=document.createElement("li");
            listGroupItem.classList.add("list-group-item");
            listGroupItem.innerHTML=player.NAME;
            listGroup.append(listGroupItem);

            let listGroupItem2=document.createElement("li");
            listGroupItem2.classList.add("list-group-item");
            listGroupItem2.innerHTML=player.POSITION;
            listGroup.append(listGroupItem2);

            let listGroupItem3=document.createElement("li");
            listGroupItem3.classList.add("list-group-item");
            listGroupItem3.setAttribute('data-birth',player.BIRTH_DATE);
            listGroupItem3.innerHTML=moment(player.BIRTH_DATE, "YYYY-MM-DD").fromNow().match(/[\d]+/)+" años"
            listGroup.append(listGroupItem3);

            card.append(listGroup);
            this.DOM.playersList.append(card)

            card.addEventListener("click",this.showPlayerData)

        }
    }
    showPlayerData=(evt)=>{
        this.DOM.updateButton.disabled=false;
        this.DOM.removePlayerButton.disabled=false;
        this.DOM.addPlayerButton.classList.add("invisible");
        this.DOM.updateButton.classList.remove("invisible");
        this.DOM.imageDiv.classList.add("invisible")
        this.DOM.removePlayerButton.classList.remove("invisible");

        this.selectedPlayer=this.playersList.find(({ID})=>ID==evt.currentTarget.dataset.id)
        this.DOM.aliasInput.value=this.selectedPlayer.ALIAS;
        this.DOM.nameInput.value=this.selectedPlayer.NAME
        this.DOM.birthInput.value=this.selectedPlayer.BIRTH_DATE
        this.DOM.positionsList.value=this.selectedPlayer.POSITION

    }

    bindUpdatePlayerData(handler){
        this.DOM.updateButton.addEventListener("click",()=>{
            this.selectedPlayer.ALIAS=this.DOM.aliasInput.value;
            this.selectedPlayer.NAME=this.DOM.nameInput.value
            this.selectedPlayer.BIRTH_DATE=this.DOM.birthInput.value
            this.selectedPlayer.POSITION=this.DOM.positionsList.value
            this.showAllPlayers();
            handler(this.selectedPlayer)
                .then(res=>alert(res))

        })
    }

    bindAddPlayerData(handler){
        this.DOM.addPlayerButton.addEventListener("click",()=>{
            this.selectedPlayer.ALIAS=this.DOM.aliasInput.value;
            this.selectedPlayer.NAME=this.DOM.nameInput.value;
            this.selectedPlayer.BIRTH_DATE=this.DOM.birthInput.value;
            this.selectedPlayer.POSITION=this.DOM.positionsList.value;
            this.selectedPlayer.IMAGE=this.DOM.imageInput.files[0]

            this.showAllPlayers();
            handler(this.selectedPlayer)
                .then(res=>alert(res))

        })
    }

    bindRemovePlayerData(handler){
        this.DOM.removePlayerButton.addEventListener("click",()=>{


            this.showAllPlayers();
            handler(this.selectedPlayer)
                .then(res=>alert(res))

        })
    }


    bindInput({input,handler}){
        input.addEventListener("keyup",()=>{
            const value=input.value.trim()
            const isValid=handler(value);
            this.toogleAddUpdateButtons(isValid,input)
        })
    }
    bindBirthDate(handler){
        this.bindInput({
            input:this.DOM.birthInput,
            handler
        })
    }
    bindAlias(handler){
        this.bindInput({
            input:this.DOM.aliasInput,
            handler
        })
    }
    bindName(handler){
        this.bindInput({
            input:this.DOM.nameInput,
            handler
        })
    }
    bindAddPlayer(){
        this.DOM.addNewPlayerButton.addEventListener("click",()=>{


            this.DOM.addPlayerButton.disabled=true;
            this.DOM.removePlayerButton.classList.add("invisible");
            this.DOM.imageDiv.classList.remove("invisible")
            this.DOM.updateButton.classList.add("invisible");
            this.DOM.addPlayerButton.classList.remove("invisible");

            this.selectedPlayer=new Player(1111,"DEFAULT","DEFAULT","1985-01-23","PORTERO","https://as01.epimg.net/img/comunes/fotos/fichas/deportistas/s/sal/large/21766.png")

            this.DOM.aliasInput.value="DEFAULT"
            this.DOM.nameInput.value="DEFAULT"
            this.DOM.birthInput.value="1985-01-23"
            this.DOM.positionsList.value="PORTERO"
        })
    }

    toogleAddUpdateButtons(bool,input){
        this.DOM.updateButton.disabled=!bool;
        this.DOM.addPlayerButton.disabled=!bool;

        bool?input.classList.remove("wrong-input"):input.classList.add("wrong-input");
    }


}