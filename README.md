# Task Tracker

## Source of Challenge
This challenge was created by [Roadmap.sh](https://roadmap.sh/projects/task-tracker)

## Features
- Add : Create new task with description initial status "todo".
- List : Display all tasks with specified status.
- Update : Modify the existing task's description.
- Mark : Update the status of an existing task.
- Delete : Remove an existing task.

## Installation
```bash
    npm install
    tsc -b 
```

## Functionality 
To explore the functionality of the app follow the code:
- Add a task
To add new task:
```bash
node dist/index.js add "Test Task Description"
```
- List tasks
To list all tasks with specified status:
```bash
node dist/index.js list
```
To list all tasks:
```bash
node dist/index.js list <status>
```
status can only be todo,in-progress or done.
- Update task
To update the existing task's description:
```bash
node dist/index.js update <task_id> "New Test Task Description"
```
- Mark task
To update the status of an existing task:
```bash
node dist/index.js mark <task_id> <updated status>
```
- Delete task
To remove an existing task:
```bash
node dist/index.js delete <task_id>
```