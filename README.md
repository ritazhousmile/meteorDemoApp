# Meteor Task Management App

A real-time task management application built with **Meteor**, **React**, and **MongoDB**. Based on the [official Meteor React tutorial](https://docs.meteor.com/tutorials/react/#create-task-component).

## Features

- ✅ **User Authentication** - Login/logout system
- ✅ **Task Management** - Create, read, update, delete tasks
- ✅ **Real-time Updates** - Live synchronization across clients
- ✅ **Task Filtering** - Hide/show completed tasks
- ✅ **Task Status** - Mark tasks as complete/incomplete
- ✅ **Task Counter** - Display pending tasks count
- ✅ **Modern UI** - Responsive design with animations

## Technology Stack

- **Frontend**: React 18
- **Backend**: Meteor.js framework
- **Database**: MongoDB
- **Authentication**: Meteor accounts system
- **Real-time**: Meteor's reactive data system
- **Styling**: Custom CSS with gradients

## Quick Start

1. **Install Meteor**
   ```bash
   curl https://install.meteor.com/ | sh
   ```

2. **Clone and Run**
   ```bash
   git clone https://github.com/ritazhousmile/meteorDemoApp.git
   cd meteorDemoApp
   meteor npm install
   meteor run
   ```

3. **Access the App**
   - Open `http://localhost:3000`
   - Login with: `meteor` / `password`

## Demo Credentials
- **Username**: `meteor`
- **Password**: `password`

## Project Structure

```
meteorDemoApp/
├── imports/
│   ├── api/           # MongoDB collections, publications, methods
│   └── ui/            # React components
├── client/            # Client-side code and styles
├── server/            # Server initialization
└── private/           # Deployment settings
```

## Deployment

Deploy to Galaxy (Meteor's hosting):
```bash
meteor deploy your-app-name.meteorapp.com --free --mongo
```

---

Built with ❤️ using [Meteor](https://meteor.com) 