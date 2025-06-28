import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Title from "./components/Title"; // Componente personalizado
import { v4 as uuidv4 } from "uuid";

function App() {
  const defaultTasks = [
    {
      id: 1,
      title: "Estudar programação",
      description:
        "Estudar programação para se tornar um desenvolvedor full stack.",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Estudar inglês",
      description: "Estudar inglês para se tornar fluente.",
      isCompleted: false,
    },
    {
      id: 3,
      title: "Estudar matemática",
      description:
        "Estudar matemática para se tornar um desenvolvedor full stack.",
      isCompleted: false,
    },
  ];

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : defaultTasks;
  });

  // Salvar tarefas no localStorage sempre que tasks mudar
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Buscar tarefas da API somente se não houver tarefas salvas
  useEffect(() => {
    if (localStorage.getItem("tasks")) {
      return; // Já tem tarefas no localStorage, não busca da API
    }

    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=5"
        );
        const data = await response.json();

        const formattedTasks = data.map((t) => ({
          id: t.id,
          title: t.title,
          description: "Tarefa importada da API",
          isCompleted: t.completed,
        }));

        setTasks(formattedTasks);
      } catch (error) {
        console.error("Erro ao buscar tarefas da API:", error);
      }
    };

    fetchTasks();
  }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: uuidv4(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        {/* Passando className para o Title */}
        <Title className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de Tarefas
        </Title>

        <AddTask onAddTaskSubmit={onAddTaskSubmit} />

        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onTaskDelete={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
