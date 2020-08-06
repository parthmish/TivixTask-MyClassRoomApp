# TivixTask-MyClassRoomApp
Tivix Coding Task - Parth

## Description: 
MyClasssRoomApp is based on the system asked to implement for the Coding Task. In this app teachers can add and mark star to their students. It's interface is built on React and backend on Django Rest-Framework. This app includes 3 different type of authorized users: Headmaster, Teacher and Student. Their features are the following:
1. Headmaster: Can create new teachers and can view all students, all teachers and all starred students. 
2. Teacher: Can add students who they teach. They can assign star to any number of students.
3. Student: They can register on App and also view their fellow classmates and teachers.

## Installation: 
Run docker-compose in root directory of clone.
```
$ git clone https://github.com/parthmish/TivixTask-MyClassRoomApp.git
$ docker-compose up
```
## Usage:
- http://127.0.0.1:8000 or http://localhost:8000/ - Django app
- http://127.0.0.1:3000 or http://localhost:3000/ - React app

For Windows with Docker ToolBox only
- http://192.168.99.100:8000/ - Django app
- http://192.168.99.100:3000/ - React app
