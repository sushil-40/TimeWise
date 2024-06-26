let taskList = [];

const hoursPerWeek = 24 * 7;

const handleOnSubmit = (e) => {
  //   const elm = document.getElementById("task");

  const newForm = new FormData(e);

  const task = newForm.get("task");
  const hr = +newForm.get("hr"); //+ downcast it to the number type

  //   console.log(task, hr);

  const obj = {
    task,
    hr,
    id: randomIdGenerator(),
    type: "entry",
  };

  //Check if there is enough hours left to add

  const exisitngTtlHrs = taskTotal();

  if (exisitngTtlHrs + hr > hoursPerWeek) {
    return alert("Sorry Boss not enough time to fit this task from last week.");
  }

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
  taskTotal();
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
  document.getElementById("savedHrsElm").innerText = badList.reduce(
    (acc, item) => acc + item.hr,
    0
  );
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
    displayBadList();
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

//calculate saved hours

const taskTotal = () => {
  const ttlHr = taskList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);

  document.getElementById("ttlHrs").innerText = ttlHr;

  return ttlHr;
};
