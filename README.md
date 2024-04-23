# LACREW FRIDGE TRACKER
*Fridge tracker creating recipes*


## Useful Links
| Category | Link |
| ----------- | ----------- |
| Dataset | [Recipe Dataset](https://www.kaggle.com/datasets/hugodarwood/epirecipes) |
| Model | [Food Image classification](https://github.com/Adesoji1/Food-Image-Classification) |
| Model | [Food Recognition model](https://github.com/samyak74/Food-Recognition) |
| Model | [Asprise OCR Model](https://github.com/Asprise/receipt-ocr/blob/main/python-receipt-ocr/python-recept-ocr.py) -> used for current model |

## Project Structure

### Backend (Flask) Structure

- `/backend`: Contains all your Flask backend code.
  - `/app`: Main application package.
    - `__init__.py`: Initializes your Flask app and brings together other components.
    - `/api`: Contains the API blueprint and route definitions.
      - `routes.py`: Defines the API routes and links resources to routes.
    - `/models`: Defines your database models.
      - `__init__.py`: Initializes the models package.
    - `/resources`: Contains your Flask-RESTful resources, where you define your API endpoints.
      - `__init__.py`: Initializes the resources package.
      - `hello_world.py`: A simple resource returning a 'hello world' message.
      - `welcome.py`: A resource representing a welcome message or start page.
    - `/utils`: Utility functions and classes.
      - `__init__.py`: Initializes the utilities package.
  - `/tests`: Contains your unit and integration tests.
    - `__init__.py`: Initializes the tests package.
  - `config.py`: Contains configuration settings for your Flask app.
  - `requirements.txt`: Lists all Python dependencies for your project.
  - `app.py`: The entry point to run your Flask application.

### Frontend (React with Expo) Structure

- `/frontend`: Contains all your React frontend code using Expo.
  - `.expo`: Generated folder by Expo containing temporary files for the Expo CLI.
  - `.gitignore`: Specifies intentionally untracked files to ignore by Git.
  - `App.js`: The entry point of your React Native application.
  - `app.json`: Configuration file for your Expo application.
  - `assets`: Contains static files like images, fonts, and sounds.
  - `babel.config.js`: Configuration file for Babel, used for transpiling your JavaScript code.
  - `components`: Reusable components used across different screens of your application.
  - `navigation`: Contains files related to navigation logic for the application, using libraries like React Navigation.
  - `node_modules`: Generated folder containing all the modules installed via npm.
  - `package-lock.json`: Auto-generated file to keep track of exact versions of installed npm packages.
  - `package.json`: Lists package dependencies as well as build and test scripts.
  - `screens`: Contains the different screens of your application, each screen as a component.
  - `services`: Holds the logic for external API calls and other services.
  - `store`: For state management, contains files related to Redux or any other state management library being used.
  - `utils`: Utility functions and classes that provide common functionality used in multiple places across the application.

 ### How to start
 In the Backend you need to run 
 ```bash
python backend/app.py
```
 In the Frontend you need to run
 ```bash
cd frontend
npm install
npx expo start
```

 On your phone you need than the "expo go" app which opens our application on the phone that you can interact with


### General Files

- `.gitignore`: Contains a list of files and directories to be ignored by Git.
- `README.md`: Provides an overview of your project, how to set it up, and how to use it.
