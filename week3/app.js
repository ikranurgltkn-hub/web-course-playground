let tasks = [
    { id: 1, title: "Read MDN", done: false },
    { id: 2, title: "Do the lab", done: true },
    { id: 3, title: "Review JavaScript", done: false }
  ];
  
  const list = document.querySelector("#task-list");
  const form = document.querySelector("#task-form");
  const input = document.querySelector("#task-input");
  const error = document.querySelector("#error");
  
  // Görevleri ekrana basan fonksiyon
  function render() {
    list.innerHTML = "";
    for (const task of tasks) {
      const li = document.createElement("li");
      li.textContent = task.title + " ";
      li.dataset.id = task.id;
      if (task.done) {
        li.classList.add("done");
      }
  
      // Silme butonu oluşturma
      const btn = document.createElement("button");
      btn.textContent = "Delete";
      btn.className = "delete";
      li.append(btn);
  
      list.append(li);
    }
  }
  
  // İlk render çağrısı
  render();
  
  // Form submit dinleyicisi (Yeni görev ekleme)
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = input.value.trim();
  
    if (title === "") {
      error.textContent = "Please write a task.";
      return;
    }
  
    error.textContent = "";
    tasks.push({ id: Date.now(), title: title, done: false });
    input.value = "";
    render();
  });
  
  // Liste tıklama dinleyicisi (Tamamlama ve Silme)
  list.addEventListener("click", (event) => {
    const li = event.target.closest("li");
    if (!li) return;
    const id = Number(li.dataset.id);
  
    if (event.target.matches(".delete")) {
      tasks = tasks.filter((t) => t.id !== id);
    } else {
      const task = tasks.find((t) => t.id === id);
      if (task) {
        task.done = !task.done;
      }
    }
    render();
  });
  