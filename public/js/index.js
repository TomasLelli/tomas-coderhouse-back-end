const socket = io()

socket.emit("message", "message from frontend")

let lista = document.getElementById("lista_prods")

socket.on("productos_update", (data)  => {
     console.log(data);
     lista.innerHTML = ""
     for(const prod of data){
          const li = document.createElement("li")
          li.innerHTML =  ` ${prod.id}: ${prod.title} `
          lista.appendChild(li)
     }
})