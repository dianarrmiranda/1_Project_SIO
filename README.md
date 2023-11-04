# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Run the project

* Clone the repo locally
```bash
git clone git@github.com:detiuaveiro/1st-project-group_02.git
```


## Run frontend
* Navigate to the root of the frontend project
  
```bash
# Assuming you're in the root of the repo
cd frontend
```

* Install dependencies
```bash
yarn
```
ou
```
npm install
```

* Run the project
```
yarn dev
```
ou
```
npm run dev
```


## Run backend

* Navigate to the root of the backend project

```bash
# Assuming you're in the root of the repo
cd backend/Backend
```
* Run springboot:

```bash
 ./mvnw spring-boot:run
```

## Run backend inside a docker
```bash
    cd backend/Backend
    ./mvnw install
    docker build --build-arg JAR_FILE=target/shop_backend-0.0.1-SNAPSHOT.jar -t com/shop_backend .
    docker run -p 8080:8080 com/shop_backend
```
### BONUS
#### Setting up postman (to view api calls)

Install [Postman Desktop](https://www.postman.com/downloads/).
If you're in linux try to search in package managers like [snap](https://snapcraft.io/) or flatpack.

After installing, log in and folow this [tutorial](https://apidog.com/blog/how-to-import-export-postman-collection-data/).
To test the api, make sure you have spingboot running and make the needed calls.


# USED AND AGREED TECH STACKS:

* React -> FrontEnd framework (JS)
* Tailwind -> Css framework
* DaisyUI -> Component plugin for Tailwind
* Axios -> For api interaction
* SpringBooot -> API creation
* H2 -> BackEnd DB

# Vulnerabilities implemented:

* CWE-79 (Cross-Site Scripting)
* CWE-89 (SQL Injection)
* CWE-20 (Improper Input Validation)
* CWE-521 (Weak Password Requirements)
* CWE-434 (Unrestricted Upload of File with Dangerous Type)
* CWE-862 (Missing Authorization)
* CWE-256 (Plaintext Storage of a Password)

# Authors 

* Daniel Madureira (107603)
* Diana Miranda (107457)
* Miguel Pinto (107449)
* Pedro Ramos (107348)



