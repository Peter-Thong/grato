// this app use to take note the grades of assignment and calculate the percentage, and gpa
// the app use localStorage to store data every time user input and regenerate when user refresh the page.
// user can delete the item/assignment on UI and also delete in localStorage.

// Sorry it's very long!
// you can use these for saving time
// i create item in localStorage in line 72..., use the data in line 157...
// read data from input line 295...
// error checking from input in line 398...
// thank you!!

// Name: Nguyen Quoc Thong

/////////////////////////////////////
// GRADE  CONTROLLER
var gradeController = (function(){
    // function contructor for java object
    var Java = function(id, subject, credit, assignment, result, percent){
        this.subject = subject;
        this.id = id;
        this.credit = credit;
        this.assignment = assignment;
        this.result = result;
        this.percent = percent;
    };

    // function contructor for web object
    var Web = function(id, subject, credit, assignment, result, percent){
        this.subject = subject;
        this.id = id;
        this.credit = credit;
        this.assignment = assignment;
        this.result = result;
        this.percent = percent;
    };

    // function contructor for design object
    var Design = function(id, subject, credit, assignment, result, percent){
        this.subject = subject;
        this.id = id;
        this.credit = credit;
        this.assignment = assignment;
        this.result = result;
        this.percent = percent;
    };

    // function contructor for data object
    var Data = function(id, subject, credit, assignment, result, percent){
        this.subject = subject;
        this.id = id;
        this.credit = credit;
        this.assignment = assignment;
        this.result = result;
        this.percent = percent;
    };

    // function contructor for software object
    var Software = function(id, subject, credit, assignment, result, percent){
        this.subject = subject;
        this.id = id;
        this.credit = credit;
        this.assignment = assignment;
        this.result = result;
        this.percent = percent;
    };

    // function contructor for linux object
    var Linux = function(id, subject, credit, assignment, result, percent){
        this.subject = subject;
        this.id = id;
        this.assignment = assignment;
        this.credit = credit;
        this.result = result;
        this.percent = percent;
    };

    // initialize the data field to empty array if it doesn't exist.
    if(!localStorage.java){
        localStorage.java = JSON.stringify([]);
    }
    if(!localStorage.web){
        localStorage.web = JSON.stringify([]);
    }
    if(!localStorage.design){
        localStorage.design = JSON.stringify([]);
    }
    if(!localStorage.data){
        localStorage.data = JSON.stringify([]);
    }
    if(!localStorage.software){
        localStorage.software = JSON.stringify([]);
    }
    if(!localStorage.linux){
        localStorage.linux = JSON.stringify([]);
    }

    //calculate the total percentage of all assignment in subject
    var calculateTotalPercent = function(subject){
        var sum = 0;
        subjectData.allItems[subject].forEach((cur) => {
            sum = sum + (cur.result * cur.percent) / 100;
        });

        subjectData.totalPercent[subject] = sum;
    };

    // translate the percentage of subject to point of GPA(4.0)
    var calculateTotalPoint = function(subject){
        var point = 0;
        var item;

        // loop to find the gradepoint base on percentage
        item = subjectData.totalPercent[subject];

            if(item >= 90){
                point = 4.0;
            } else if(item >= 85 && item < 90){
                point = 3.8;
            } else if(item >= 80 && item < 85){
                point = 3.6;
            } else if(item >= 75 && item < 80){
                point = 3.3;
            } else if(item >= 70 && item < 75){
                point = 3.0;
            } else if(item >= 65 && item < 70){
                point = 2.5;
            }  else if(item >= 60 && item < 65){
                point = 2.0;
            }  else if(item >= 55 && item < 60){
                point = 1.5;
            }  else if(item >= 50 && item < 55){
                point = 1.0;
            } else {
                point = 0.0;
            }
        // calculate total point by multiply credit
        subjectData.totalPoint[subject] = point;
    };

    // calculate the total number of credit
    var calculateTotalCredit = function(){
        var sum = 0;
        Object.keys(subjectData.allItems).forEach((key) => {
            if(subjectData.allItems[key].length > 0){
                sum += sum + subjectData.allItems[key][0].credit;
            }
        });
        subjectData.totalCredit = sum;
    };

    //calculate global point by multiply credit.
    var calculateTotalCreditPoint = function(){
        var sum = 0;
        Object.keys(subjectData.totalPoint).forEach((key) => {
            if(subjectData.allItems[key].length > 0){
                sum += sum + subjectData.totalPoint[key]*subjectData.allItems[key][0].credit;
            }
        });
        subjectData.totalCreditPoint = sum;
    }

    // global data take from localStorage
    var subjectData = {
        allItems:{
            java: JSON.parse(localStorage.java),
            web: JSON.parse(localStorage.web),
            design: JSON.parse(localStorage.design),
            data: JSON.parse(localStorage.data),
            software: JSON.parse(localStorage.software),
            linux: JSON.parse(localStorage.linux),
        },

        totalPercent:{
            java: 0,
            web: 0,
            design: 0,
            data: 0,
            software: 0,
            linux: 0
        },

        totalPoint: {
            java: 0,
            web: 0,
            design: 0,
            data: 0,
            software: 0,
            linux: 0
        },
        totalCreditPoint: 0,
        totalCredit: 0,
        gpa: 0,
    };

    return{
        addItem: function(subject, credit, assignment, result, percent){
            var newItem, oldItem, ID;
            // create new ID
            if(subjectData.allItems[subject].length > 0){
                ID = subjectData.allItems[subject][subjectData.allItems[subject].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // create new object base on subject
            if(subject === 'java'){
                newItem = new Java(ID,subject, credit, assignment, result, percent)
            } else if(subject === 'web'){
                newItem = new Web(ID,subject, credit, assignment, result, percent)
            } else if(subject === 'design'){
                newItem = new Design(ID,subject, credit, assignment, result, percent)
            } else if(subject === 'data'){
                newItem = new Data(ID,subject, credit, assignment, result, percent)
            } else if(subject === 'software'){
                newItem = new Software(ID,subject, credit, assignment, result, percent)
            } else if(subject === 'linux'){
                newItem = new Linux(ID,subject, credit, assignment, result, percent)
            }

            // push into localStorage
            oldItem = subjectData.allItems[subject];
            oldItem.push(newItem);
            localStorage.setItem(subject, JSON.stringify(oldItem));

            //return the new element
            return newItem;
        },

        //deleteItem when user click x icon
        deleteItem: function(subject, id){
            var ids, index, oldItem;

            //create a array of id
            var ids = subjectData.allItems[subject].map(function(current){
                return current.id;
            });

            //get the index of given id in array of id: ids
            index = ids.indexOf(id)

            //change in localStorage
            if(index !== -1){
                oldItem = subjectData.allItems[subject];
                oldItem.splice(index, 1);
                localStorage.setItem(subject, JSON.stringify(oldItem));
            }
        },

        // calculate the grade when user add item or delete
        calculateGrade: function(){
            var arrSubject;
            arrSubject = ['java', 'web', 'design', 'software', 'data', 'linux'];

            arrSubject.forEach((item) => {

                //calculate total percent per subject
                calculateTotalPercent(item);

                // calculate total point per subject
                calculateTotalPoint(item);
            });
            // total credit
            calculateTotalCredit();
            // total point
            calculateTotalCreditPoint();
            // calculate the gpa
            subjectData.gpa = subjectData.totalCreditPoint/subjectData.totalCredit;
        },

        // return the data for global control
        getGrade: function(){
            return{
                gpa: subjectData.gpa,
                totalPercent: subjectData.totalPercent,
            }
        },

        // return the data in localStorage to display when refresh the page
        getSubject: function(){
            return subjectData.allItems;
        },

        testing: function(){
            console.log(subjectData);
        },
    }
})();

////////////////////////////////////////////////
// UI CONTROLLER
var UIController = (function(){
    var formatNumber = function(num){
        //exact 2 decimal points
        num = num.toFixed(2);
        return num;
    };

    return{

        //get input from the form
        getInput: function(){
            return{
                subject : document.querySelector('.add__subject').value,
                credit : parseFloat(document.querySelector('.add__credit').value),
                assignment : document.querySelector('.add__assignment').value,
                result : parseFloat(document.querySelector('.add__result').value),
                percent : parseFloat(document.querySelector('.add__percentage').value),
            };
        },

        // add item to the UI when user press enter
        addListItem: function(obj, subject){
            var html, newHtml, element;

            element = '.' + subject + '__list';
            // Create HTML string with placeholder text
            html = '<div class="item clearfix" id="%subject%-%id%"><div class="item__description">%assignment%</div><div class="right clearfix"><div class="item__value">%result%%(of %percent%%)</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            // Replace the placeholder text with some actual data
            newHtml = html.replace('%subject%', subject);
            newHtml = newHtml.replace('%id%', obj.id);
            newHtml = newHtml.replace('%assignment%', obj.assignment);
            newHtml = newHtml.replace('%result%', formatNumber(obj.result));
            newHtml = newHtml.replace('%percent%', obj.percent);
            // insert the HTML into DOM.
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        //delete item in UI base on given id of item
        deleteListItem: function(id){

            var element = document.getElementById(id);
            element.parentNode.removeChild(element);
        },

        // clear field after user input but remain credit
        clearFields: function(input){
            var fields, fieldsArr;

            fields = document.querySelectorAll('.add__assignment, .add__credit, .add__result, .add__percentage');

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach((current, i, array) => {
                current.value = "";
            });

            document.querySelector('.add__credit').value = input.credit;

            fieldsArr[0].focus();

        },

        // display grade to the UI
        displayGrade: function(obj){
            document.querySelector('.gpa__value').textContent = formatNumber(obj.gpa);
            document.querySelector('.java__percent').textContent = formatNumber(obj.totalPercent.java) + "/100%";
            document.querySelector('.web__percent').textContent = formatNumber(obj.totalPercent.web) + "/100%";
            document.querySelector('.design__percent').textContent = formatNumber(obj.totalPercent.design) + "/100%";
            document.querySelector('.data__percent').textContent = formatNumber(obj.totalPercent.data) + "/100%";
            document.querySelector('.software__percent').textContent = formatNumber(obj.totalPercent.software) + "/100%";
            document.querySelector('.linux__percent').textContent = formatNumber(obj.totalPercent.linux) + "/100%";
        },
    }

})();

////////////////////////////////////////////////////
// GLOBAL CONTROLLER
var controller = (function(gradeCrtl, UICtrl){

    // function call when user click on UI
    var setupEventListeners = function(){
        document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event){
            if(event.keyCode == 13 || event.which == 13){
                ctrlAddItem();
            }
        });

        document.querySelector('.big__container').addEventListener('click', crtlDeleteItem);

    };

    // function call when update grade after add or delete for data and UI
    var updateGrade = function(){
        //1. calculate grade
        gradeCrtl.calculateGrade();
        //2. return grade
        var grade = gradeCrtl.getGrade();
        //3. display the Gpa to UI.
        UIController.displayGrade(grade);
    };

    // add item to the UI and data
    var ctrlAddItem = function(){
        var input, newItem;
        //1.get the field input data
        input = UICtrl.getInput();

        //check input from user, the app only generate with valid data
        if(input.assignment !== "" && !isNaN(input.credit) && !isNaN(input.result) && !isNaN(input.percent)
            && input.credit > 0 && input.result >= 0 && input.result <=100 && input.percent > 0 && input.percent < 100){
            //2.add item to gradeController
            newItem = gradeCrtl.addItem(input.subject, input.credit, input.assignment, input.result, input.percent);
            //3.add item to UI
            UICtrl.addListItem(newItem, input.subject);

            //4. clear the fields.
            UICtrl.clearFields(input);

            //5. calculate and update Gpa
            updateGrade();
        }

    };

    //deleteItem from UI and data
    var crtlDeleteItem = function(event){
        var itemID, splitID, subject, ID;

        // select the div tag when click the x icon
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        // if click x icon => delete
        if(itemID){
            splitID = itemID.split('-');
            subject = splitID[0];
            ID = parseInt(splitID[1]);

            //1. delete the item from the data structure
            gradeCrtl.deleteItem(subject, ID);
            //2. delete item from UI
            UIController.deleteListItem(itemID);
            //3. Update and show the new grade
            updateGrade();
        }

    };

    return{
        init: function(){
            setupEventListeners();

            // get data from data structure
            var allItems = gradeCrtl.getSubject();
            //generate the data from localStorage when page load
            Object.keys(allItems).forEach((key) => {
                if(allItems[key].length > 0){
                    allItems[key].forEach((item) => {
                        UICtrl.addListItem(item, item.subject);
                    });
                }
            });
            //regenerate grade from localStorage data and display to UI when refresh the page
            updateGrade();
        }
    };

})(gradeController, UIController);

controller.init();
