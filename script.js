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
  //   console.log(taskList);

  displayEntryList();
};

//Display items in tables

const displayEntryList = () => {
  console.log(taskList);
  //   console.log("First");
  let str = "";

  const entryElm = document.getElementById("entryList");

  taskList.map((item, i) => {
    str += `<tr>
                  <td>${i + 1}</td>
                  <td>${item.task}</td>
                  <td>${item.hr}</td>
                  <td class="text-end">
                    <button class="btn btn-danger">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    <button class="btn btn-success">
                      <i class="fa-solid fa-arrow-right"></i>
                    </button>
                  </td>
                </tr>`;
  });

  entryElm.innerHTML = str;
};
