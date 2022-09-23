function toDoList() {
    function pageStatic() {
        const body = document.querySelector('body');
        function recebeEvento(event) {
            event.preventDefault();
        }
        body.addEventListener('click', recebeEvento);

    }
    const result = document.querySelector('.result');
    const inputContentRes = document.querySelector('.input-content');
    function clear() {
        inputContentRes.value = ' ';
        inputContentRes.focus();
    }
    function addElent() {
        const elementLi = document.createElement('li');
        elementLi.setAttribute('class', 'li-content');
        return elementLi;
    }
    function button(elementLi) {
        elementLi.innerText += ' ';
        const elementButton = document.createElement('button');
        elementButton.setAttribute('class', 'button-clear');
        elementButton.setAttribute('title', 'Apagar esta tarefa');
        elementButton.innerText = 'Apagar';
        elementLi.appendChild(elementButton);
    }
    function addList(content) {
        const element = addElent();
        element.innerText = content;
        button(element);
        result.appendChild(element);
        clear();
        saveContent();
    }
    result.addEventListener('click', function (event) {
        const recEvento = event.target;
        if (recEvento.classList.contains('button-clear')) {
            recEvento.parentElement.remove();
            saveContent();
        }
    })
    document.addEventListener('click', function (event) {
        const recEvento = event.target;
        if (recEvento.classList.contains('button-add')) {
            if (!inputContentRes.value || inputContentRes.value == 0) {
                return;
            } else {
                addList(inputContentRes.value);
            }
        }
    })
    document.addEventListener('keypress', function (event) {
        const recEvento = event.target;
        if (recEvento.classList.contains('enter')) {
            if (!inputContentRes.value || inputContentRes.value == 0) {
                return;
            } else {
                addList(inputContentRes.value);
            } 
        }
    })
    pageStatic();
    addContent();
    function addContent() {
        const content = localStorage.getItem('content');
        const listTarefas = JSON.parse(content);
        for (let tarefa of listTarefas) {
            addList(tarefa);
        }
    }
    function saveContent() {
        const tarefas = result.querySelectorAll('.li-content');
        const listTarefas = [];
    
        for (let tarefa of tarefas) {
            let tarefaTexto = tarefa.innerText;
            tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
            listTarefas.push(tarefaTexto);
        }
        const contentJason = JSON.stringify(listTarefas);
        localStorage.setItem('content', contentJason);
    }

}
toDoList();


