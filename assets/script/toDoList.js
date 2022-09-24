function toDoList(){
    function pageStatic(){
        const body=document.body;
        function recebeEvento(event){
            event.preventDefault();
        }
        body.addEventListener('click',recebeEvento);
    }
    const inputContentRes=document.querySelector('.input-content');
    const result=document.querySelector('.result');

    document.addEventListener('click',function(event){
        const recebeEvento=event.target;
        if(recebeEvento.classList.contains('button-add')){
            if(!inputContentRes.value||inputContentRes.value==0){
                return;
            }else{
                addList(inputContentRes.value);
                clearInput();
            }
        }else if (recebeEvento.classList.contains('button-clear')){
            recebeEvento.parentElement.remove();
            saveArray();
        }
    })
    document.addEventListener('keypress',function(event){
        const recebeEvento=event.target;
        if(recebeEvento.classList.contains('enter')){
            if(!inputContentRes.value||inputContentRes.value==0){
                return;
            }else{
                addList(inputContentRes.value);
                clearInput();
            }
    }     })
    readArray();
    function createElementLi(){
        const elementLi=document.createElement('li');
        elementLi.setAttribute('class','li-content');
        return elementLi;
    }
    function addList(content){
        const element=createElementLi();
        element.innerText=content;
        buttonAdd(element);
        result.appendChild(element);  
        saveArray();
      
    }
    function clearInput(){
        inputContentRes.value=" ";
        inputContentRes.focus();
    }
    function buttonAdd(elementLi){
        const buttonClear=document.createElement('button');
        buttonClear.setAttribute('class','button-clear');
        buttonClear.setAttribute('title','Apagar tarefa');
        buttonClear.innerText='Apagar';
        elementLi.appendChild(buttonClear);
    }
    pageStatic();
    function saveArray(){
        const contentRes=result.querySelectorAll('.li-content');
        const contentSave=[];
        for(let content of contentRes){
            let contentText=content.innerText;
            contentText=contentText.replace('Apagar','').trim();
            contentSave.push(contentText);
        }
        const contentJson=JSON.stringify(contentSave);
        localStorage.setItem('contentResult',contentJson);
    }
    function readArray(){
        const contentRes = localStorage.getItem('contentResult');
        const contentSave=JSON.parse(contentRes);
        for(let content of contentSave){
            addList(content);
        }
    }
}
toDoList();

