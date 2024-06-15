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
    id: randomIdGenerator(),
    type: "entry",
  };

  taskList.push(obj);
  //   console.log(taskList);

  displayEntryList();
};

//Display items in tables

const displayEntryList = () => {
  //   console.log("First");
  let str = "";

  const entryElm = document.getElementById("entryList");

  const entryList = taskList.filter((item) => item.type === "entry");

  entryList.map((item, i) => {
    str += `<tr>
                  <td>${i + 1}</td>
                  <td>${item.task}</td>
                  <td>${item.hr}</td>
                  <td class="text-end">
                    <button class="btn btn-danger" onclick="handleOnDelete('${
                      item.id
                    }')">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    <button onclick="switchTask('${
                      item.id
                    }','bad')" class="btn btn-success">
                      <i class="fa-solid fa-arrow-right"></i>
                    </button>
                  </td>
                </tr>`;
  });

  entryElm.innerHTML = str;
};

// display bad list items
const displayBadList = () => {
  //   console.log("First");
  let str = "";

  const badElm = document.getElementById("badList");

  const badList = taskList.filter((item) => item.type === "bad");

  badList.map((item, i) => {
    str += `<tr>
                  <td>${i + 1}</td>
                  <td>${item.task}</td>
                  <td>${item.hr}</td>
                  <td class="text-end">
                  
                    <button onclick="switchTask('${
                      item.id
                    }','entry')" class="btn btn-warning">
                      <i class="fa-solid fa-arrow-left"></i>
                    </button>
                      <button class="btn btn-danger" onclick="handleOnDelete('${
                        item.id
                      }')">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>`;
  });

  badElm.innerHTML = str;
};

// Creating unique ID

const randomIdGenerator = (length = 6) => {
  const str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";

  let id = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * str.length); // 0 -to- 61
    // Math.random()*str.length;  // 0 - to - 61.999

    id += str[randomIndex];
  }
  return id;
};

// Deleting items from table

const handleOnDelete = (id) => {
  if (window.confirm("Are you sure, you want to delete this?")) {
    //   console.log(id);

    taskList = taskList.filter((item) => item.id !== id);

    displayEntryList();
  }
};

// Switch tasks or items

const switchTask = (id, type) => {
  //   console.log(id, type);

  taskList = taskList.map((item) => {
    console.log(item);

    if (item.id === id) {
      item.type = type;
    }
    return item;
  });
  displayEntryList();
  displayBadList();
};
