import fs from 'fs';
import readline from 'readline';

interface Task{
    id:number;
    description:string;
    status:'todo'|'in-progress'|'done';
    createdAt:string;
    updatedAt:string;
}

const path='./src/data/tasktracker.json';

if(!fs.existsSync(path)){
    fs.writeFileSync(path,JSON.stringify([]));
}

const tasks: Task[]=JSON.parse(fs.readFileSync(path,'utf8'));

function addTask(args:string[]):void{
    const newTask:Task={
        id:tasks.length+1,
        description:args[0]||'No title',
        status:'todo',
        createdAt:new Date().toISOString(),
        updatedAt:new Date().toISOString(),
    };

    tasks.push(newTask);
    fs.writeFileSync(path,JSON.stringify(tasks,null,2));

    console.log(`Task added successfully at ID ${newTask.id}`);
}

function listTasks(args:string[]):void{
    const status:string|undefined=args[0];
    let filteredTasks:Task[]=tasks;
    
    if(status){
        filteredTasks=tasks.filter(task=>task.status===status);
    }

    if(filteredTasks.length===0){
        console.log('No such tasks found!');
    }else{
        filteredTasks.forEach((task)=>{
            console.log(`Task ID: ${task.id}`);
            console.log(`Description: ${task.description}`);
            console.log(`Status: ${task.status}`);
            console.log('----------------------------------');
        });
    }
}

function maskTaskStatus(args:string[]):void{
    const id:number=Number(args[0]);
    const status:string=args[1];
    const validatestatus:Task['status'][]=['todo','in-progress','done'];

    if(tasks.length<id || id<1){
        console.log('Invalid task ID');
        return;
    }

    if(!validatestatus.includes(status as Task['status'])){
        console.log('Invalid status');
        return;
    }

    const updatedTasks=tasks.map((task)=>{
        if(task.id===id){
            return {...task,status:status as Task['status'],updatedAt:new Date().toISOString()};
        }
        return task;
    })
    fs.writeFileSync(path,JSON.stringify(updatedTasks,null,2));
    console.log('Task status changed!');
}

function updateTask(args:string[]):void{
    const id:number=Number(args[0]);
    const description:string=args[1];

    if(tasks.length<id || id<1){
        console.log('Invalid task ID');
        return;
    }

    const updatedTasks=tasks.map((task)=>{
        if(task.id===id){
            return {...task,description,updatedAt:new Date().toISOString()};
        }
        return task;
    })

    fs.writeFileSync(path,JSON.stringify(updatedTasks,null,2));
    console.log('Task updated successfully!');
}

function deleteTask(args:string[]):void{
    const id:number=Number(args[0]);

    if(tasks.length<id || id<1){
        console.log('Invalid task ID');
        return;
    }

    const updatedTasks=tasks.filter((task)=>task.id!==id);

    fs.writeFileSync(path,JSON.stringify(updatedTasks,null,2));
    console.log('Task deleted successfully!');
}

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

const [,,command,...args]=process.argv;

switch(command){
    case 'add':
        addTask(args);
        break;
    case 'list':
        listTasks(args);
        break;
    case 'mark':
        maskTaskStatus(args);
        break;
    case 'update':
        updateTask(args);
        break;
    case 'delete':
        deleteTask(args);
        break;
    default:
        console.log('Invalid command');
}

rl.close();