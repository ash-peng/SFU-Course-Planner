# SFU Course Planner

## What is the overall goal of the project (i.e. what does it do, or what problem is it solving)?
- As the title suggests, this project is a course-planning, course-map rendering and GPA-calculation web service, designed for the SFU student.

## Which languages did you use, and what parts of the system are implemented in each?
- Javascript with React for the frontend
    - Fetches course information from [SFU Academic Calendar API](http://www.sfu.ca/data-hub/docs/academic-calendar.html)
    - Generates course map with course number and their prerequisites from user input using [React Flow](https://reactflow.dev/)
- Python with Django for the backend
    - Serves requests to add, upload and delete courses from SQLite database
    - Responds to GPA calculation requests by using [C Foreign Function Interface](https://cffi.readthedocs.io/en/latest/)(CFFI) to turn compiled C function into a module, using it to calculate the result and sending the result back to the user
- C, which also sits at the backend
    - For faster GPA calculation, as mentioned. This feature may look redundant considering the cost of CFFI itself, but will be more useful as more features will be added (calculate grades according to outline, calculate percentage of courses completed in the whole curriculum, compare grades with historical grade distributions, etc.)

## What methods did you use to communicate between languages?
- As mentioned in the previous section:
    - Javascript & Python: Via a REST API
    - Python & C: Via CFFI

## Exactly what steps should be taken to get the project working, after getting your code? [This should start with vagrant up or docker-compose up and can include one or two commands to start components after that.]
- `docker-compose up`, then `localhost:3000` in browser
- Note:
    - Project takes several minutes to build (for me, locally, at least)
    - Because of race conditions of different containers, please allow time for `You can now view frontend in the browser.` to appear in the console, before going to the page

## What features should we be looking for when marking your project?
The purpose of this is not to make you write an essay, just to guide the marking so we don't miss anything important. (There will be many projects, and the TAs are human.)
- A user can add, delete and update courses, separated into completed and uncompleted courses. For completed ones, the user can specify the grade obtained for GPA calculation.
- While adding a course: After the course number is specified (e.g., CMPT 383), the website provides hints (instantly fetched from SFU Open API) of the course name and the prerequisites so that the user does not have to look them up manually.
- Refreshing the page would generate a course map of all added courses with their prerequisites connected by arrows.
- The user can use the mouse to drag courses around for better visualization, or drag arrows from a course to another. 
- Inputting all SFU CMPT courses would give a (very cool) directed graph containing all possible trajectories from start/admission to finish/graduation.
- The user can click the GPA calculation button and view the calculated GPA of finished courses. This way, the user can try out different grade combinations.
