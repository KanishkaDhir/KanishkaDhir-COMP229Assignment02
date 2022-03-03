console.log('Goes to the client side')

if(getTitle == "Inventory List" || getTitle == "BusinessList")
{
    let deleteButtons=document.querySelectorAll('.btn-danger');

    for(button of deleteButtons)
    {
        button.addEventListener('click',(event)=>{
            if(!confirm("Are you sure?"))
            {
                //cancels the action
                event.preventDefault();
            }
        });
    }

}


if(getTitle == "Sign-Up Form")
{
    const confirm=document.querySelector('input[name=confirm-password]');
    confirm.addEventListener('change',onChange);
}



function onChange(){
    const password=document.querySelector('input[name=password]');
    const confirm=document.querySelector('input[name=confirm-password]');

    if(confirm.value==password.value){
        confirm.setCustomValidity('');
    }
    else
    {
        confirm.setCustomValidity('Passwords do not match');
    }

}