class HttpService{

    getAllPlayers(){return fetch('http://vps730338.ovh.net/dwes/MisPracticas/PCFUTBOL/BACK/getAllPlayers.php').then((response)=> response.json())}
    getAllPositions(){return fetch('http://vps730338.ovh.net/dwes/MisPracticas/PCFUTBOL/BACK/getPositions.php').then((response)=> response.json())}
    getHTMLBody(){return fetch('http://vps730338.ovh.net/dwes/MisPracticas/PCFUTBOL/BACK/body.html').then((response)=> response.text())}

    updatePlayer(player){
        return fetch("http://vps730338.ovh.net/dwes/MisPracticas/PCFUTBOL/BACK/updatePlayer.php", {
            method: 'POST',
            body: JSON.stringify(player),
        }).then(res => res.text())
    }
    removePlayer(player){
        return fetch("http://vps730338.ovh.net/dwes/MisPracticas/PCFUTBOL/BACK/deletePlayer.php", {
            method: 'POST',
            body: JSON.stringify(player),
        }).then(res => res.text())
    }

    addPlayer(player){
        let formData=new FormData();
        formData.append("ID", player.ID)
        formData.append("ALIAS", player.ALIAS)
        formData.append("NAME", player.NAME)
        formData.append("BIRTH_DATE", player.BIRTH_DATE)
        formData.append("IMAGE", player.IMAGE)
        formData.append("POSITION", player.POSITION)
        return fetch("http://vps730338.ovh.net/dwes/MisPracticas/PCFUTBOL/BACK/insertPlayer.php", {
            method: 'POST',
            body: formData,
        }).then(res => res.text())
    }

}