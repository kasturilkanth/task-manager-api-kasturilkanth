const  express = require("express");
const router = express.Router();
// const tasks=require("../task.json")

router.get("/",(req,res)=>{
    res.status(200).json(tasks)
});

router.get("/:id",(req,res)=>{
    const id=req.params.id;
    const task=tasks.find(task=>task.id===parseInt(id));
    if(!task){
        res.status(404).json({message:"Task not found"})
    }   
    res.status(200).json(task)
});
// post a new task
router.post("/",(req,res)=>{
    const {title,description,completed}=req.body;
    if(!title || typeof title !=="string"){
        return res.status(400).json({error:"Invalid title"})
    }
    const newTask={
        id:tasks.length+1,title,
        discription:description||"",
        completed:completed||false,
    };
    tasks.push(newTask);
    res.status(201).json(newTask)
});

router.put("/:id",(req,res)=>{
    const {title,description,completed}=req.body;
    const id=req.params.id;
    const task=tasks.find(task=>task.id===parseInt(id));
    if(!task){
        res.status(404).json({message:"Task not found"})
    }
  
    if(title){
        task.title=title;
    }
    if(description){
        task.description=description;
    }
    if(completed){
        task.completed=completed;
    }
    res.status(200).json(task)
});

router.delete("/:id",(req,res)=>{
    const id=req.params.id;
    const taskIndex=tasks.findIndex(task=>task.id===parseInt(id));
    if(taskIndex===-1){
        res.status(404).json({message:"Task not found"})
    }
    tasks.splice(taskIndex,1);
    res.status(204).send()
});

module.exports=router;