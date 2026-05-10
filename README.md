<h1>Projeto coursesphere-front</h1>
<h2>O que é?</h2>
<p>Trata-se da parte front-end do Projeto CourseSphere, cuja parte back-end pode ser acessada <a href="https://github.com/ProgramasNS/coursesphere-back">aqui</a>.</p>
<h2>Quais tecnologias a aplicação usa?</h2>
<ul>
  <li><strong>React.JS</strong>: A mais clássica, utiliza de componentes para a criação de aplicações front-end;</li>
  <li><strong>Vite</strong>: O framework por trás da biblioteca React. Aqui é responsável pelo sustento dos módulos e da integração do app com o Node.JS;</li>
  <li><strong>Bootstrap</strong>: Responsável pela parte visual. Utiliza-se de classes CSS para a estilização de cada um dos componentes.</li>
  <li><strong>RandomUserAPI</strong>: Cria usuários aleatórios para testar as APIs. Neste caso, foi utilizado para a geração de professores convidados para cada um dos cursos criados.</li>
  <li><strong>Docker</strong>: É responsável pelos contâineres da aplicação, de modo a automatizar a configuração do ambiente sem a necessidade de sucessivas instalações.</li>
</ul>
<h2>Os componentes</h2>
<p>Os componentes da aplicação foram organizados na pasta /src/pages para facilitar a procura. Na pasta estão os componentes: </p>
<ul>
  <li><strong>login.jsx</strong>: O primeiro componente que o(a) usuário(a) vê ao entrar no site, onde é feito o login. Faz uma requisição com a API do model User.</li>
  <li><strong>register.jsx</strong>: O componente que aparece após o(a) usuário(a) clicar em "Não tem uma conta? Criar nova conta"</li>
  <li><strong>dashboard.jsx</strong>: A primeira tela visível após o login. Possui uma API que faz uma requisição GET com todos os membros do model Course. Caso não haja nenhum curso, é possível criar novos cursos ao apertar "Novo Curso".</li>
  <li><strong>create.jsx</strong>: A tela de criação de novos cursos. Faz uma requisição POST no model Course.</li>
  <li><strong>lessons.jsx</strong>: A tela de acesso às aulas de cada curso. Faz requisições GET e POST tanto em Lessons quanto em Course. Cada curso possui aulas totalmente diferentes uns dos outros e somente os criadores do curso podem criar aulas. Além disso, ela dá acesso direto à RandomUserAPI, conforme dito antes, para a geração de "professores convidados".</li>
  <li><strong>edit.jsx</strong>: A tela de edição de cursos. Corresponde ao método PUT no model Course.</li>
</ul>
<p>E ainda há um componente na pasta específica /src/menu: o componente Menu, utilizado em todas as telas, exceto a de registro e a de login, que representa um menu responsível que, em dispositivos móveis, se torna um sandwich menu</p>
<h2>As routes</h2>
<p>Tratam-se das rotas de navegação presentes no módulo App.jsx. Cada route redireciona a um componente específico, sendo algumas routes acessíveis somente a usuários autenticados (as páginas create, dashboard, lessons e edit).</p>
<h2>Como executar</h2>
<p>Para que a aplicação funcione, é necessário primeiro que a aplicação back-end esteja funcionando, algo que é explicado <a href="https://github.com/ProgramasNS/coursesphere-back#como-executar-o-projeto">aqui</a>.</p>
<p>Após a aplicação back-end estar sendo executada, crie uma pasta específica e redirecione para ela no terminal (cmd ou PowerShell): </p>
<h2>Como executar localmente (sem Docker)</h2>
<p>Instale as dependências:</p>
<code>npm install</code>
<p>Execute o projeto:</p>
<code>npm run dev</code>
<p>Acesse: <code>http://localhost:5173</code></p>
<p><code>git clone https://github.com/ProgramasNS/coursesphere-front.git</code></p>
<p>Após clonar o repositório, construa a aplicação por meio do Docker: </p>
<p><code>sudo docker build -t coursesphere-front:latest .
</code> para usuários de Linux ou <code>docker build -t coursesphere-front:latest .</code></p>
<p>e, após construir, execute-a:</p>
<p><code>npm run dev</code></p>
<p>Agora, você pode acessá-lo por meio do endereço http://localhost:5173/ </p>
<h2>Usuários de teste</h2>
<p>Para testar a aplicação, você pode se registrar com este usuário: </p>
<pre>pByQZBbY
  Nome: John Fields
  E-mail: johnfields@cn.com
  Senha: @HelloW0rld
</pre><h2>Prints de Cada Tela</h2>
<h3>dashboard.jsx</h3>
<a href="https://ibb.co/BKH6YQyV"><img src="https://i.ibb.co/x8KgrB1S/Dashboard.png" alt="Dashboard" border="0" /></a>
<h3>register.jsx</h3>
<a href="https://ibb.co/pByQZBbY"><img src="https://i.ibb.co/sdHCQdb8/Registro.png" alt="Registro" border="0" /></a>
<h3>login.jsx</h3>
<a href="https://ibb.co/G4dT8hR0"><img src="https://i.ibb.co/hJgf4qVy/Login.png" alt="Login" border="0" /></a>
<h3>create.jsx</h3>
<a href="https://ibb.co/h180fHrs"><img src="https://i.ibb.co/TqhyLRJc/Criar-Curso.png" alt="Criar-Curso" border="0" /></a>
<h3>lessons.jsx</h3>
<a href="https://ibb.co/TxyPzqn0"><img src="https://i.ibb.co/TxyPzqn0/Aulas.png" alt="Aulas" border="0" /></a>
<h3>edit.jsx</h3>
<a href="https://ibb.co/132Ddr1">
<img src="https://i.ibb.co/Y6jzycm/Editar-Curso.png" alt="Editar-Curso" border="0" /></a>
