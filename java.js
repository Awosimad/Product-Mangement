let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('catgeory');
let submit=document.getElementById('submit');
let searchtitle=document.getElementById('searchtitle');
let searchcategory=document.getElementById('searchcategory');
//valid
let mood='create';
let tmp;
//
function getTotal(){
    if(price.value!==null){
        let result = parseInt(+price.value + +taxes.value + +ads.value) -
        +discount.value;
        total.innerHTML= result;
        total.style.background="#040";
    }
    else{
        total.innerHTML='';
        total.style.background=' #a00d02'
    }
};

let dataPro=[];

if(localStorage.product != null)
    {
        dataPro =JSON.parse(localStorage.product)
    }
    else{
        dataPro=[];
    }
    
    
    submit.onclick=function(){
        let newpro={
            title:title.value,
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML,
            count:count.value,
            category:category.value
        }
        
        localStorage.setItem('product',   JSON.stringify(dataPro)    );
        
        if(mood==='create'){
            if(newpro.count > 1){
                for(let i=0;i<newpro.count;i++){
                    dataPro.push(newpro)
                }
                dataPro.push(newpro)
            }
            else{
                dataPro.push(newpro)
            }
        }else{
            dataPro[ tmp ]=newpro;
            mood='create';
            count.style.display='block';
            submit.innerHTML="Create";
            
        }
        // getTotal()
    
    
    showDate();
    clearData();
}
//
function clearData(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    category.value='';
    count.value='';
    total.innerHTML='';
}
///
function showDate(){
    
    
    
    let tabel='';
    for(let i=0;i<dataPro.length;i++){
        
        tabel +=`
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updatedata(${i})" id="update">update</button></td>
        <td><button onclick="deleteDate(${i})" id="delete">delete</button></td>
        </tr>
        `
    }
    
    
        document.getElementById('tbody').innerHTML=tabel;

        let btndelete=document.getElementById('div')
        btndelete.style.cssText='margin:10px 0;color:red'
        if(dataPro.length>0){
            btndelete.innerHTML=`
            <button onclick="deleteAll()">deleteAll(${dataPro.length})</button>`
        }else{
            btndelete.innerHTML=''
        }
        
    }




showDate()
//delete

function deleteDate(i){
    dataPro.splice(i,1)
    // localStorage.prodct=JSON.stringify(dataPro)
    showDate()
}
function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showDate()
}
//update
function updatedata(i){
    // console.log(i)
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    discount.value=dataPro[i].discount;
    // total.innerHTML=dataPro[i].total
    getTotal()
    category.value=dataPro[i].category;
    mood='update';
    tmp=i;
    count.style.display='none';
    submit.innerHTML="Update";
    scroll({
        top:0,
        behavior:'smooth',
    })
   
    
    // showDate()
}


//search
let search=document.getElementById('search');
let searchmood='title';
function searchMood(id){
    if(id=='searchtitle'){
        searchmood="title";
    }else{
        searchmood="categeroy";
    }
    search.placeholder='Search By'+ " "+searchmood;
    search.focus();
    search.value='';
}
function searchData(value){
    let tabel='';
    for(let i=0;i<dataPro.length;i++){
        if(searchmood=='title'){
            if(  dataPro[i].title.includes(value)){
                
                    
                    tabel +=`
                    <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updatedata(${i})" id="update">update</button></td>
                    <td><button onclick="deleteDate(${i})" id="delete">delete</button></td>
                    </tr>
                    `
                }
                
            }
        
        else{
            
            if(dataPro[i].category.includes(value)){
                
                
                    tabel +=`
                    <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updatedata(${i})" id="update">update</button></td>
                    <td><button onclick="deleteDate(${i})" id="delete">delete</button></td>
                    </tr>
                    `
                }
            }
           
        
        document.getElementById('tbody').innerHTML=tabel;
    }
    
}