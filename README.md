
# GLEAFINK Visualization Application

This guide provides step-by-step instructions on how to set up, build, and run the GLEAFINK Visualization application using Docker.

---

## **1. Prerequisites**
Ensure you have the following installed on your system:
- Node.js and npm (for running via Vite)
- Docker
- Docker Compose

---

## **2. Clone the Repository**
Clone the application repository to your local machine:
```bash
git clone https://github.com/Alone-Y154/GleaFink-Test.git
cd GleaFink-Test
```

---

## **3. Environment Variables**
Create a `.env` file in the project root directory. Add the following variable:

```env
VITE_BASE_URL="YOUR BACKEND URL"
```

Ensure all variables are prefixed with `VITE_` for Vite to recognize them.

---

## **4. Build and Run Using Vite
Use the provided Vite setup to build and run the application.

### **4.1 Development Environment**
First, Install the dependencies.
```bash
npm install
```

Now run the Application.
```bash
npm run dev
```

You can build the application 
```bash
npm run build
```

## **5. Build and Run Using Docker**
Use the provided Docker setup to build and run the application.

### **5.1 Development Environment**
To start the application in development mode:
```bash
docker build -f dockerFile.dev -t gleafink-dev .
docker run --env-file .env -p 3000:3000 gleafink-dev
```
The application will be available at [http://localhost:3000](http://localhost:3000).

### **5.2 Production Environment**
To start the application in production mode:
1. Ensure you have the production Dockerfile and `docker-compose.yml` file.
2. Run the following command:
   ```bash
   docker-compose up --build
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000).

---

## **6. Project Structure**
```sh
└── GleaFink-Test/
    ├── README.md
    ├── docker-compose.yml
    ├── dockerFile.dev
    ├── dockerfile
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── public
    │   ├── _redirects
    │   └── vite.svg
    ├── src
    │   ├── App.jsx
    │   ├── components
    │   ├── index.css
    │   ├── main.jsx
    │   ├── miscellaneous
    │   ├── pages
    │   ├── reducers
    │   └── store
    ├── tailwind.config.js
    └── vite.config.js
```

---

## **7. Debugging Tips**
- If environment variables are not working, ensure `.env` is correctly configured and included in `docker-compose.yml` or passed during `docker run`.
- Rebuild the image after making changes to the `.env` file using:
  ```bash
  docker build -f dockerFile.dev -t gleafink-dev .
  ```
- Use `docker logs <container_id>` to check container logs for errors.

---

## **8. Stopping the Application**
To stop the application:
```bash
docker-compose down
```

---

## **9. Contact**
For any issues or inquiries, feel free to contact me via mail - yashwanthkris153@gmail.com.

---

Happy Coding!
