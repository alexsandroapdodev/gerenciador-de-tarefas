import { ChevronRightIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Tasks({ tasks, onTaskClick, onTaskDelete }) {
  const navigate = useNavigate();

  function onSeeDetailsClick(task) {
    const query = new URLSearchParams();
    query.set("title", task.title);
    query.set("description", task.description);
    navigate(`/task?${query.toString()}`);
  }

  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center gap-2">
          <button
            onClick={() => onTaskClick(task.id)}
            className={`flex-1 text-left p-2 rounded-md text-white transition ${
              task.isCompleted
                ? "bg-green-400 line-through"
                : "bg-slate-400 hover:bg-slate-500"
            }`}
          >
            {task.title}
          </button>

          <button
            onClick={() => onSeeDetailsClick(task)}
            className="text-slate-600 hover:text-slate-800"
            title="Ver detalhes"
          >
            <ChevronRightIcon />
          </button>

          <button
            onClick={() => onTaskDelete(task.id)}
            className="text-red-500 hover:text-red-700"
            title="Excluir"
          >
            <TrashIcon />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;
