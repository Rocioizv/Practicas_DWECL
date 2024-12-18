var editBtn = document.getElementById('editBtn');
var addBtn = document.getElementById('addBtn');
var editables = document.querySelectorAll('#parrafoEditable')

 
editBtn.addEventListener('click', () => {
 
  for (let i = 0; i < editables.length; i++) {
   
    if (!editables[i].isContentEditable) {
      editables[i].contentEditable = 'true';

      editBtn.innerHTML = 'Save Changes';
      editBtn.style.backgroundColor = '#6F9';
    }   else {

      editables[i].contentEditable = 'false';
      
      editBtn.innerHTML = 'Enable Editing';
      editBtn.style.backgroundColor = '#F96';
    }

  }
 
});


addBtn.addEventListener('click', () => {
  const container = document.getElementById("editor");
 
  var newParagraph = document.createElement('p');
  newParagraph.id = 'parrafoEditable';
  newParagraph.textContent = 'Este es un nuevo párrafo editable.';
  container.appendChild(newParagraph);
  editables = document.querySelectorAll('#parrafoEditable');
});