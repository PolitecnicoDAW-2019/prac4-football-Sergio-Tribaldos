class Controller{
    constructor(view,httpService,validationService){
        this.view=view;
        this.httpService=httpService;
        this.validationService=validationService;

        this.handleGetServerData().then(()=>{
            this.view.loadDOMSelectors();
            this.view.showAllPlayers();
            this.view.showAllPositions();
            this.view.bindUpdatePlayerData(this.handleUpdatePlayer);
            this.view.bindAddPlayerData(this.handleAddPlayer);
            this.view.bindRemovePlayerData(this.handleRemovePlayer);
            this.view.bindBirthDate(this.handleBirthDate)
            this.view.bindAlias(this.handleAliasName);
            this.view.bindName(this.handleAliasName);
            this.view.bindAddPlayer();

        })
    }

     handleGetServerData=()=>{
       return Promise.all([
           this.httpService.getAllPlayers(),
           this.httpService.getHTMLBody(),
           this.httpService.getAllPositions()
        ]).then(([playersList,HTMLBody,positionsList])=>{
            this.view.getAllPlayers(playersList);
            this.view.loadHTML(HTMLBody);
            this.view.getAllPositions(positionsList);
        })

    }
    handleAliasName=alias=>{
        return this.validationService.validateName(alias);
    }

    handleBirthDate=date=>{
        return this.validationService.validateEEUUBirthDate(date);
    }
    handleUpdatePlayer=player=>{
        return this.httpService.updatePlayer(player)
    }
    handleAddPlayer=player=>{
        return this.httpService.addPlayer(player)
    }
    handleRemovePlayer=player=>{
        return this.httpService.removePlayer(player)
    }


}