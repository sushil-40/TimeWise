let taskList = [];

const handleOnSubmit = (e) => {
  //   const elm = document.getElementById("task");

  const newForm = new FormData(e);

  const task = newForm.get("task");
  const hr = newForm.get("hr");

  //   console.log(task, hr);

  const obj = {
    task,
    hr,
  };

  taskList.push(obj);
  console.log(taskList);
};
