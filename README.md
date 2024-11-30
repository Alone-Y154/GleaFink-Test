
# GLEAFINK Visualization Application

This guide provides step-by-step instructions on how to set up, build, and run the GLEAFINK Visualization application using Docker.

---

## **1. Prerequisites**
Ensure you have the following installed on your system:
- Docker
- Docker Compose

---

## **2. Clone the Repository**
Clone the application repository to your local machine:
```bash
git clone <repository-url>
cd <repository-folder>
```

---

## **3. Environment Variables**
Create a `.env` file in the project root directory. Add the following variable:

```env
VITE_BASE_URL=https://talentlabs-test-api.onrender.com
```

Ensure all variables are prefixed with `VITE_` for Vite to recognize them.

---

## **4. Build and Run Using Docker**
Use the provided Docker setup to build and run the application.

### **4.1 Development Environment**
To start the application in development mode:
```bash
docker build -f dockerFile.dev -t gleafink-dev .
docker run --env-file .env -p 3000:3000 gleafink-dev
```
The application will be available at [http://localhost:3000](http://localhost:3000).

### **4.2 Production Environment**
To start the application in production mode:
1. Ensure you have the production Dockerfile and `docker-compose.yml` file.
2. Run the following command:
   ```bash
   docker-compose up --build
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000).

---

## **5. Project Structure**
```plaintext
GLEAFINK-TEST/
├── src/            # Source code for the application
├── public/         # Static assets
├── .env            # Environment variables file
├── dockerFile.dev  # Dockerfile for development
├── dockerFile      # Dockerfile for production
├── docker-compose.yml # Docker Compose configuration
└── README.md       # Project documentation
```

---

## **6. Debugging Tips**
- If environment variables are not working, ensure `.env` is correctly configured and included in `docker-compose.yml` or passed during `docker run`.
- Rebuild the image after making changes to the `.env` file using:
  ```bash
  docker build -f dockerFile.dev -t gleafink-dev .
  ```
- Use `docker logs <container_id>` to check container logs for errors.

---

## **7. Stopping the Application**
To stop the application:
```bash
docker-compose down
```

---

## **8. Contact**
For any issues or inquiries, feel free to contact me via mail - yashwanthkris153@gmail.com.

---

Happy Coding!
