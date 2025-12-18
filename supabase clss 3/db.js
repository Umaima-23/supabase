import supabase from './config.js'

let title = document.getElementById('title')
let desc = document.getElementById('description')
let prio = document.getElementsByName('priority')
let btn = document.getElementById('btn')
let todoBtn = document.getElementById('addTodo')
let editId =null
let selectedPrio;

async function addTodo(e) {
    e.preventDefault()
    console.log(editId)
    console.log(title.value, desc.value)
    // console.log(prio)

    for (let p of prio) {
        if (p.checked) {
            selectedPrio = p.value  
            console.log(selectedPrio)
        }
    }
      if(editId){
      const { error } = await supabase
  .from('todos')
  .update({ title: title.value, status: selectedPrio,description:desc.value  })
  .eq('id', editId)
  if(error){
    console.log('error in updating data',error);
    
  }else{
    alert('doc updated succesfully')
    allTodos()
  }
    }else{

         try{
   const { error } = await supabase
  .from('todos')
  .insert({ title: title.value, status: selectedPrio,description:desc.value  })
  if(error){
    console.log(error)
  }else{
    alert('todo added successfully')
    allTodos()
    title.value = ''
    desc.value = ''
  }
    }catch(er){
        console.log(er);
        
    }
    }
 
}




btn.addEventListener('submit',addTodo)


async function allTodos() {
    try {
        const { data, error } = await supabase
            .from('todos')
            .select('*')
        if (data) {
            console.log(data)
            showAllTodos(data)
        }
    } catch (error) {
 console.log(error);
 
    }
}
allTodos()

//to show them on ui
async function showAllTodos(todos) {
    console.log(todos)
    main.innerHTML = ''
    todos.forEach(todo=>{
        main.innerHTML+=`<div class = "card">
        <div class ="card-body">
        ${todo.title}
        <div>
        <div class ="card-body">
        ${todo.status}
        <div>
        <div class ="card-body">
        ${todo.description}
        <div>
        <div><button class="btn"onclick='edtTodo(${todo.id},"${todo.title}","${todo.description}","${todo.status}")'><i class="fa-solid fa-pen"></i></button></div>
  <div><button class='btn' onclick='dltTodo(${todo.id})'>🗑️</button></div> 
        `
    })

}
window.edtTodo=(id,tit,descrip,stat)=>{
title.value=tit
desc.value=descrip
prio.forEach(p=>{
    console.log(p);
    p.checked = p.value===stat
    console.log(stat);
    
})
console.log(id,descrip,tit,stat);

todoBtn.innerHTML='edit Todo'
editId=id
}

window.dltTodo=async (id)=>{
try {
    const response = await supabase
  .from('todos')
  .delete()
  .eq('id', id)
  if(response){
    console.log(response);
    allTodos()
    
  }
} catch (err) {
    console.log(err);
    
}
}




