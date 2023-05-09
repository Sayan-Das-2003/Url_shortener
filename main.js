const selectelement=(selector)=>{
    const element=document.querySelector(selector);
    if(element) return element;
    throw new Error(`Cannot find the element ${selector}`);
}
const form=selectelement('form');
const input=selectelement('input');
const result=selectelement('.result');
const hamburger=selectelement('.hamburger');
const navmenu=selectelement('.nav-menu');
const navitem=selectelement('.nav-item');
const head=selectelement('header');

hamburger.addEventListener('click',()=>{
    hamburger.classList.toggle('active');
    navmenu.classList.toggle('active');
   // head.classList.toggle('active');
})
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const url=input.value;
    shortenUrl(url);
})
async function shortenUrl(url){
    try{
        const res=await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
        const data=await res.json();
        const newurl=document.createElement('div');
        newurl.classList.add('item');
        newurl.innerHTML=`<p>${data.result.short_link}</p>
        <button class='newurl-btn'>Copy</button>`;
        result.prepend(newurl);
        const copybtn=document.querySelector('.newurl-btn');
        copybtn.addEventListener('click',()=>{
            navigator.clipboard.writeText(copybtn.previousElementSibling.textContent).then(()=>{
                alert("Copied");
            }).catch(()=>{
                alert("Somethingn went wrong");
            })
           
        });
        input.value="";
    }
    catch(error){
        console.log(error);
    }
}