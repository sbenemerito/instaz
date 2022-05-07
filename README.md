# instaz

An Instagram clone written in Django and React

# Setup

## Backend (Python / Django)

### 1) Set environment variables

Rename/copy the `.env.example` file to `.env` and update its contents according to your needs.

### 2) Install requirements

```bash
pip install -r requirements.text
```

#### 2A) Known Issues

1) > error: invalid command 'bdist_wheel'

`wheel` is missing. Solve by running: `pip install wheel`

2) > The headers or library files could not be found for jpeg,                             
a required dependency when compiling Pillow from source.

System-related stuff. For Debian, solve by:

```bash
sudo apt install libjpeg-dev zlib1g-dev
pip install Pillow
```

### 3) Run migrations

```bash
python manage.py migrate
```

### 4) Run development server

```bash
python manage.py runserver
```

## Frontend (React)

### 1) Set environment variables

Rename/copy the `frontend/.env.example` file to `frontend/.env` and update its contents according to your needs.

### 2) Install dependencies

```bash
npm install
```

You should have no problems with this using the latest LTS versions of both Node and npm.

(Last tested with Node v16.15.0 and npm 8.5.5)

### 3) Run development server

```bash
npm start
```