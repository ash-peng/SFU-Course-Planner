# SFU Course Planner
(Deprecated. Please refer to `cmpt383.md` for detailed description)

## Topic idea: what will it actually do?
- The project is a course-planning, course-map rendering and GPA-calculation web service for SFU students. A user can add, delete and update courses. While adding a course, the website provides hints (from SFU Open API) about course name and the prerequisites from the course number so that the user does not have to look them up in the SFU system. Then, after refreshing the page, the user can see the added course with its prerequisite on the generated course map. The more courses added, the more complete the course map will be. In the meantime, the user can click the GPA calculation button and view the calculated GPA of finished courses.

## The three programming languages you will use, and (briefly) what will be implemented with each?
- Javascript with a React framework for the frontend, fetching course info from the SFU API and creation of the course map
- Python with Django for the server side backend, and interacting with C for GPA calculation
- C for faster GPA calculations

## The two inter-language communication methods you will use?
- Django REST framework to connect the Javascript React frontend with Python Django backend
- CFFI (C Foreign Function Interface) to create Python modules from C programs and use them

## Deployment technology: Vagrant VM, or Docker containers
- Docker for its light-weight convenience