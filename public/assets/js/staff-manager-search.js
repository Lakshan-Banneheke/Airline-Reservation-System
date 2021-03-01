const search = document.getElementById('search');
const matchlist = document.getElementById('match-list');
const errordiv = document.getElementById('match-list-error');

const searchStaff = async searchText => {
        let response = await fetch(`/staff/manager/find?query=${searchText.toLowerCase()}`);//search db using this route
        let resCodes = await fetch(`/staff/manager/get_airport_codes`);
        const resCodesJson = await resCodes.json();
        const airportCodes = resCodesJson.airportCodes;
        let optionsList;
        if(airportCodes && airportCodes.length>0){
            optionsList = airportCodes.map((code)=>{
               return(`<option value=${code.airport_code}> ${code.airport_code}</option>`)    
            }).join('');
        }else{
            optionsList='';
        } 
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
                                        <br>
                                        <div>
                                            <button type="button" class="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#airportUpdateModal${match.emp_id}">
                                                Change Assigned Airport
                                            </button>
                                        <!-- Modal -->
                                            <div class="modal fade" id="airportUpdateModal${match.emp_id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div class="modal-dialog" role="document">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="exampleModalLabel">Change Assigned Airport</h5>
                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div class="modal-body">
                                                            Select an airport from the dropdown below
                                                        </div>
                                                        <form class="p-3 text-left" method="POST" action="/staff/manager/change_airport/${match.emp_id}">
                                                            <div>
                                                                <div class="form-group" id="airport-field" style="display: block;">
                                                                    <label for="airport">Select Airport</label>
                                                                    <select id="airport" class="form-control" name="airport">
                                                                        <option  selected value="">Choose...</option>
                                                                        ${optionsList}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                <button type="submit" class="btn btn-primary">Save Changes</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
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