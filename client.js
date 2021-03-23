  var airports = [];
var has_adult = true;
var searches = [];
var search_index = -1;
var contentHtml = [
    '<div>',
    '<button class="btn btn-link cancel">Cancel</button>',
    '<button class="btn btn-primary save">Save</button>',
    '</div>'].join('\n');
let socket = new WebSocket("ws://localhost:8760"); //Connects to the server
socket.onopen = function (msg) {
    console.log("Connection Established");
    socket.send("rawwwwwwwwwwwr");
    update();
    startup();
};

class Passengers {
    constructor(seniors, adults, teenagers, children, babies) {
        this.seniors = seniors;
        this.adults = adults;
        this.teenagers = teenagers;
        this.children = children;
        this.babies = babies;
    }

    get_list() {
        return [this.seniors, this.adults, this.teenagers, this.children, this.babies]
    }
}

class Search {
    constructor(departure, destination, return_box, passengers, depdate, return_date = null) {
        this.departure = departure;
        this.destination = destination;
        this.passengers = passengers;
        this.depdate = depdate;
        if (return_box) {
            this.return_date = return_date
        }
    }

    get_list() {
        let temp = [this.passengers, this.departure, this.destination, this.depdate];

        if (this.return_date) {
            temp.push(this.return_date)
        }
        return temp
    }

}

async function update() {
    await socket.send("update"); //Sends string requested to the server
    socket.onmessage = function (msg) { //When something is received, run this
        airports = msg.data.split(",");
        // let node = document.createElement("OPTION");
        // node.value = "Select";
        // let textnode = document.createTextNode("Select");
        // node.appendChild(textnode);
        // document.getElementById("departure").appendChild(node);
        // node.hidden = true;
        // for (let item in airports) { //For each place in the list
        //     let node = document.createElement("OPTION"); //Creating an option
        //     node.value = airports[item];
        //     let textnode = document.createTextNode(airports[item]); //Creates text for the items in the list
        //     node.appendChild(textnode); //Adds the text to the options tag
        //     document.getElementById("departure").appendChild(node); //Adds options tag to the select tag
        // }
        // for (let item in airports) { //For each place in the list
        //     let node = document.createElement("OPTION"); //Creating an option
        //     node.value = airports[item];
        //     let textnode = document.createTextNode(airports[item]); //Creates text for the items in the list
        //     node.appendChild(textnode); //Adds the text to the options tag
        //     document.getElementById("destination").appendChild(node); //Adds options tag to the select tag
        // }
    }
}

class PassengerDiv {
    constructor(name, age_range, default_amount = 0) {
        this.name = name;
        this.age_range = age_range;
        this.amount = default_amount;
    }

    return_div() {

        let div = "<a id='" + this.name + "_minus'>-</a>" + this.amount + "<a id='" + this.name + "_add'>+</a>"


    }
}

// function drop_change() {
//     for (let child in document.getElementById("departure").children) {
//         document.getElementById("departure").children[child].hidden = false;
//         document.getElementById("departure").children[child].disabled = false;
//     }
//     for (let child in document.getElementById("destination").children) {
//         document.getElementById("destination").children[child].hidden = false;
//         document.getElementById("destination").children[child].disabled = false;
//     }
//     for (let child in document.getElementById("departure").children) {
//         if (document.getElementById("departure").children[child].value === "Select") {
//             document.getElementById("departure").children[child].hidden = true;
//         }
//         if (document.getElementById("departure").children[child].value === document.getElementById("departure").value) {
//             document.getElementById("departure").children[child].disabled = true;
//             for (let childQT in document.getElementById("destination").children) {
//                 if (document.getElementById("destination").children[childQT].value === document.getElementById("departure").value) {
//                     document.getElementById("destination").children[childQT].disabled = true;
//                 }
//
//             }
//         }
//     }
//
// }

// function drop_change_dep() {
//     drop_change();
//     for (let child in document.getElementById("destination").children) {
//         if (document.getElementById("destination").children[child].value === "Select") {
//             document.getElementById("destination").value = document.getElementById("destination").children[child].value;
//         }
//
//     }
// }

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}

today = yyyy + '-' + mm + '-' + dd;
document.getElementById("departdate").setAttribute("min", today);

function valid_dates() {
    document.getElementById("returndate").setAttribute("min", document.getElementById("departdate").value);
    if (document.getElementById("returndate").value < document.getElementById("departdate").value) {
        document.getElementById("returndate").value = ""
    }
}

function datedisabled() {
    if (document.getElementById('returndate').disabled) {
        document.getElementById('returndate').disabled = false;
    } else {
        document.getElementById('returndate').disabled = true;
        document.getElementById('returndate').value = ''
    }

}


// function places() {
//     let data = '';
//     console.log(airports);
//     for (let airport in airports) {
//         console.log(airport);
//         data += '<a onclick="alert(`hi`)" href="#" class="button" data-dismiss="alert">'+airports[airport]+'</a><br>'
//     }
//     return data
// }

function places_clicked(place) {
    console.log("hi" + place)
}

//$(document).ready(function(){ //JQuery- checking that the page is ready to have action on
//    $("[data-toggle='popover']").popover({
//        html: 'true',
//        title: 'Passengers',
//        content: '<p>This is a <em>simple example</em> demonstrating how to insert HTML code inside <mark><strong>Bootstrap popover</strong></mark>.</p>' +
//            '<button type="button" id="example" class="btn btn-primary">example</button>',
//    }); //Finds everything with data-toggle=popover and runs the popover() for it
//
//});

function startup() {
    $(document).ready(function () {
//     $('[data-toggle="popover"]').popover({
//         placement : 'bottom',
//         html : true,
//         title : 'Passengers <a href="#" class="close" data-dismiss="alert">&times;</a>', //Times = x button
//         content : 'Test Test Test Test Test <a href="#" class="button" data-dismiss="alert">hello</a>'
//     });
//     $(document).on("click", ".popover .close" , function(){ //When clicked run function()
//         $(this).parents(".popover").popover('hide'); //Refers to the button clicked, finds buttons parents, hides the popover
//     });
// });
//
//     // $(document).ready(function(){
//     //     $('[data-toggle="departure"]').popover({
//     //         placement : 'bottom',
//     //         html : true,
//     //         // title : 'Departures <a href="#" class="close" data-dismiss="alert">&times;</a>', //Times = x button
//     //         container: "body",
//     //         title : '<p>Popover is only dismissed when the "dismiss" button is explicity clicked, or when neither button nor popover is hovered over.</p><button type="button" class="hello" id="hello">dismiss</button>'
//     //     });
//     //     $(document).on("click", ".popover .close" , function(){ //When clicked run function()
//     //         $(this).parents(".popover").popover('hide'); //Refers to the button clicked, finds buttons parents, hides the popover
//     //     });
//     // });
//     //
//     // $("html").click(function(){
//     //     $("#hello").popover("hide");
//     // })
//
//     $('[data-toggle="departure"]').popover({
//         placement : 'bottom',
//         html : true
//     });
//     $(document).on("click", ".departure .close" , function(){ //When clicked run function()
//         $(this).parents(".departure").popover('hide'); //Refers to the button clicked, finds buttons parents, hides the popover
//     });
//
//     $('#uwu').on("click", function() {
//         console.log("Hello")
//
//     })
//

        $('#departures').click(function () {
            var $popover = $("#dep_popover");
            $("#des_popover").toggle(false);
            $popover.toggle(!$popover.is(':visible'));
            document.getElementById('dep_popover').style.left = getCoords(document.getElementById('departures')).left + "px";
            document.getElementById('dep_popover').style.top = getCoords(document.getElementById('departures')).top + (document.getElementById('departures').offsetHeight) + "px";
            document.getElementById('dep_content').innerHTML = "";

            console.log(document.getElementById("departures").innerHTML);
            console.log(document.getElementById("destinations").innerHTML);

            airports.forEach(function (item, index) {
                document.getElementById("dep_content").innerHTML += "<a href='#' id='dep_" + item + "'>" + item + "</a><br>"
            });

            airports.forEach(function (item, index) {
                $('#dep_' + item).click(function () {
                    dep_handler(item)
                })

            })

        });
        $('#destinations').click(function () {
            $("#dep_popover").toggle(false);
            var $popover = $("#des_popover");
            $popover.toggle(!$popover.is(':visible'));
            document.getElementById('des_popover').style.left = getCoords(document.getElementById('destinations')).left + "px";
            document.getElementById('des_popover').style.top = getCoords(document.getElementById('destinations')).top + (document.getElementById('destinations').offsetHeight) + "px";

            var bruh = document.getElementById('departures').innerHTML;

            document.getElementById('des_content').innerHTML = "";
            airports.forEach(function (item, index) {
                if (item !== bruh) {
                    document.getElementById("des_content").innerHTML += "<a href='#' id='des_" + item + "'>" + item + "</a><br>"
                }
            });

            airports.forEach(function (item, index) {
                $('#des_' + item).click(function () {
                    des_handler(item)
                })

            })

        });

        $("#master").click(function (e) {
            var senderElement = e.target;
            if (!($(senderElement).is("a") || $(e.target).is("div#dep_content.popover-content") || $(e.target).is("div#des_content.popover-content"))) {
                $("#dep_popover").toggle(false);
                $("#des_popover").toggle(false);
            }
        })

    })
}

function close_popovers() {
    $("#dep_popover").toggle(false);
    $("#des_popover").toggle(false);
}

function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + window.pageYOffset,
        right: box.right + window.pageXOffset,
        bottom: box.bottom + window.pageYOffset,
        left: box.left + window.pageXOffset

    }
}

function dep_handler(place) {
    document.getElementById("departures").innerHTML = place;
    if (document.getElementById("departures").innerHTML === document.getElementById("destinations").innerHTML) {
        document.getElementById("destinations").innerHTML = "Destination"
    }
}

function des_handler(place) {
    document.getElementById("destinations").innerHTML = place;
}

async function search_handler() {
    await socket.send("Search");
    await socket.send((searches[search_index].get_list().toString()))
}

function search_button() {
    var passengers = [1, 2, 3, 4, 5, 6];
    search_index++;
    if (document.getElementById("destinations").innerHTML !== "Destination" && (document.getElementById("departures").innerHTML !== "Departure")) {
        searches.push(new Search(document.getElementById("departures").innerHTML,
            document.getElementById("destinations").innerHTML,
            document.getElementById("return").checked, passengers,
            document.getElementById("departdate").value, document.getElementById("returndate").value
            ));
        search_handler()
    }
}
