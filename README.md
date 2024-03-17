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

### Frontend (React Native) Structure

- `/frontend`: Contains your React Native application.
  - `/android` and `/ios`: Contains native code for Android and iOS platforms.
  - `/src`: Source code for your React Native app.
    - `/assets`: Static assets (images, fonts, etc.).
    - `/components`: Reusable components.
    - `/screens`: Components representing full screens.
    - `/navigation`: Navigation-related components and configurations.
    - `/services`: Services for handling backend API calls.
    - `/utils`: Utility functions and classes.
    - `App.js`: Main component that starts your app.
    - `index.js`: Entry point for the React Native app.
  - `package.json`: Lists dependencies and scripts for the React Native app.

### General Files

- `.gitignore`: Contains a list of files and directories to be ignored by Git.
- `README.md`: Provides an overview of your project, how to set it up, and how to use it.
