<h1>CourseSphere-front Project</h1>
<h2>What is it?</h2>
<p>This is the front-end part of the CourseSphere Project, whose back-end part can be accessed <a href="https://github.com/ProgramasNS/coursesphere-back">here</a>.</p>

<h2>Which technologies does the application use?</h2>
<ul>
  <li><strong>React.JS</strong>: The classic library, using components to build front-end applications;</li>
  <li><strong>Vite</strong>: The framework behind the React library. Here it is responsible for module support and integration of the app with Node.JS;</li>
  <li><strong>Bootstrap</strong>: Responsible for the visual part. Uses CSS classes to style each component.</li>
  <li><strong>RandomUserAPI</strong>: Creates random users to test the APIs. In this case, it was used to generate guest teachers for each created course.</li>
  <li><strong>Docker</strong>: Responsible for the application containers, automating environment setup without repeated installations.</li>
</ul>

<h2>The components</h2>
<p>The application components were organized in the /src/pages folder to make searching easier. The folder contains the following components:</p>
<ul>
  <li><strong>login.jsx</strong>: The first component the user sees when entering the site, where login is performed. Makes a request to the User model API.</li>
  <li><strong>register.jsx</strong>: The component that appears after the user clicks "Don’t have an account? Create new account".</li>
  <li><strong>dashboard.jsx</strong>: The first screen visible after login. Has an API that makes a GET request with all members of the Course model. If there are no courses, new ones can be created by clicking "New Course".</li>
  <li><strong>create.jsx</strong>: The screen for creating new courses. Makes a POST request to the Course model.</li>
  <li><strong>lessons.jsx</strong>: The screen for accessing lessons of each course. Makes GET and POST requests to both Lessons and Course. Each course has completely different lessons, and only course creators can add lessons. It also integrates directly with RandomUserAPI, as mentioned before, to generate "guest teachers".</li>
  <li><strong>edit.jsx</strong>: The course editing screen. Corresponds to the PUT method in the Course model.</li>
</ul>
<p>There is also a component in the specific /src/menu folder: the Menu component, used on all screens except register and login. It represents a responsive menu that becomes a sandwich menu on mobile devices.</p>

<h2>The routes</h2>
<p>These are the navigation routes present in the App.jsx module. Each route redirects to a specific component, with some routes accessible only to authenticated users (create, dashboard, lessons, and edit pages).</p>

<h2>How to run</h2>
<p>For the application to work, the back-end must be running first, as explained <a href="https://github.com/ProgramasNS/coursesphere-back#como-executar-o-projeto">here</a>.</p>
<p>After the back-end is running, create a specific folder and navigate to it in the terminal (cmd or PowerShell):</p>
<p><code>mkdir your_folder_name</code></p>
<p>Then clone the repository:</p>
<p><code>git clone https://github.com/ProgramasNS/coursesphere-front.git</code></p>
<p>After cloning, use <code>cd coursesphere-front</code> and build the application with Docker:</p>
<p><code>sudo docker build -t coursesphere-front:latest .</code> for Linux users or <code>docker build -t coursesphere-front:latest .</code></p>
<p>Then run it:</p>
<p><code>docker run -d -p 8080:80 coursesphere-front:latest</code></p>
<p>Now you can access it at http://localhost:8080/</p>

<h2>How to run locally (without Docker)</h2>
<p>Install dependencies:</p>
<code>npm install</code>
<p>Run the project:</p>
<code>npm run dev</code>
<p>Access: <code>http://localhost:5173</code></p>

<h2>Official site</h2>
<p>The back-end of the site was deployed via Render, while the front-end was deployed via Netlify. To access the application through the website <a href="https://coursesphere-front.netlify.app">click here</a>.</p>

<h2>Test users</h2>
<p>To test the application, you can register with this user:</p>
<pre>
  Name: John Fields
  Email: johnfields@cn.com
  Password: @HelloW0rld
</pre>

<h2>Screenshots of Each Screen</h2>
<h3>dashboard.jsx</h3>
<a href="https://ibb.co/BKH6YQyV"><img src="https://i.ibb.co/x8KgrB1S/Dashboard.png" alt="Dashboard" border="0" /></a>
<h3>register.jsx</h3>
<a href="https://ibb.co/pByQZBbY"><img src="https://i.ibb.co/sdHCQdb8/Registro.png" alt="Register" border="0" /></a>
<h3>login.jsx</h3>
<a href="https://ibb.co/G4dT8hR0"><img src="https://i.ibb.co/hJgf4qVy/Login.png" alt="Login" border="0" /></a>
<h3>create.jsx</h3>
<a href="https://ibb.co/h180fHrs"><img src="https://i.ibb.co/TqhyLRJc/Criar-Curso.png" alt="Create-Course" border="0" /></a>
<h3>lessons.jsx</h3>
<a href="https://ibb.co/TxyPzqn0"><img src="https://i.ibb.co/TxyPzqn0/Aulas.png" alt="Lessons" border="0" /></a>
<h3>edit.jsx</h3>
<a href="https://ibb.co/132Ddr1"><img src="https://i.ibb.co/Y6jzycm/Editar-Curso.png" alt="Edit-Course" border="0" /></a>
