// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
class Manager extends Employee {
    constructor (name, id, email, office){
        
        super (name, id, email);

        this.office = office;
    }
    getRole(){
        return Manager;
    }
    getOffice(){
        return this.office;
    }
    
}

module.exports = Manager;