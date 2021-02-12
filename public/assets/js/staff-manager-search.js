const search = document.getElementById('search');
const matchlist = document.getElementById('match-list');
const errordiv = document.getElementById('match-list-error');

const searchStaff = async searchText => {
        let response = await fetch(`/staff/manager/find?query=${searchText.toLowerCase()}`);//search db using this route
        response =await response.json();
        if (response.success){
            let outputHTML;
            if(response.staffMembers.length>0){
            outputHTML =  response.staffMembers.map(match=>{
                return(`
                            <div class="card mb-2 shadow rounded border-secondary">
                                <div class="card-body">
                                        <h5 class="card-title">
                                            ${match.first_name} ${match.last_name}
                                            <small>
                                                (${match.emp_id})
                                            </small>
                                        </h5>  
                                        <div class="row text-black" style="letter-spacing: 3;">
                                            <div class="col-md-4 col-xs-12">
                                                <p class="card-text"><i class="fas fa-plane-departure" style="margin-right: 6px;"></i>Assigned Airport: ${match.assigned_airport}</p>
                                            </div>
                                            <div class="col-md-4 col-xs-12">
                                                <p class="card-text"><i class="fas fa-phone" style="margin-right: 6px;"></i>Contact No: ${match.contact_no}</p>
                                            </div>
                                            <div class="col-md-4 col-xs-12">
                                                <p class="card-text"><i class="fas fa-envelope" style="margin-right: 6px;"></i>Email: ${match.email} </p>
                                            </div>
                                        </div>
                                </div>
                            </div>
                            `);
                
            }).join('');
            }else{
                outputHTML = `<div class="alert alert-warning text-center">
                                    OOPS. No Results Found
                                </div>`
            }    
            matchlist.innerHTML = outputHTML;
        }else {
            console.log(response.error);
            matchlist.innerHTML = '';
            errordiv.innerHTML = `<div class="card card-body mb-1 alert alert-danger">
                                    <p>OOPS an error occured${response.error.hint}</p>
                                  </div>`;
        }
    }


try{
search.addEventListener('input',()=>searchStaff(search.value));
}catch(e){
    
}