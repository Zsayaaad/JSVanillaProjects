const draggableList = document.getElementById('draggable-list');
const checkBtn = document.getElementById('check');

let dragStartIdx;
const listItems = [];

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page',
];

function createList() {
  [...richestPeople]
    .map((str) => ({ value: str, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((str) => str.value)
    .forEach((person, idx) => {
      // console.log(person); // {value: 'Jeff Bezos', sort: 0.26258569498221584}
      const listItem = document.createElement('li');
      listItem.setAttribute('data-index', idx);

      // listItem.classList.add('over');

      listItem.innerHTML = `
      <span class="number">${idx + 1}</span>
      <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fa-solid fa-grip-lines"></i>
      </div>
    `;
      listItems.push(listItem);
      draggableList.append(listItem);
    });

  addEventListener();
}

function dragStart() {
  // console.log('dragstart');
  dragStartIdx = +this.closest('li').getAttribute('data-index');
}

function dragEnd() {
  // console.log('dragend');
}

function dragOver(e) {
  // console.log('dragover');
  e.preventDefault();
}

function dragLeave() {
  // console.log('dragleave');
  this.classList.remove('over');
}

function dragEnter() {
  // console.log('dragenter');
  // When we enter, wanna add class="over" on listitems
  // console.log(this);
  this.classList.add('over');
}

function dragDrop() {
  // console.log('drop');
  const dragEndIdx = this.closest('li').getAttribute('data-index');

  swapItems(dragStartIdx, dragEndIdx);
  this.classList.remove('over');
}

function swapItems(startIdx, endIdx) {
  const itemOne = listItems[startIdx].querySelector('.draggable');
  const itemTwo = listItems[endIdx].querySelector('.draggable');
  // must handle the default dragover event
  listItems[startIdx].append(itemTwo);
  listItems[endIdx].append(itemOne);
}

function addEventListener() {
  const draggables = document.querySelectorAll('.draggable');
  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart);
    draggable.addEventListener('dragover', dragOver);
  });

  const dragListItems = document.querySelectorAll('.draggable-list li');
  dragListItems.forEach((listItem) => {
    listItem.addEventListener('dragenter', dragEnter);
    listItem.addEventListener('dragleave', dragLeave);
    listItem.addEventListener('drop', dragDrop);
  });
}

function checkRichest() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.person-name').innerText.trim();
    console.log(personName, index);
    if (personName !== richestPeople[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}

createList();

checkBtn.addEventListener('click', checkRichest);
