elementsURL = "/element-data"
paintingsURL = "/painting-data"



d3.json(elementsURL).then(function(data) {

    console.log(data);

    element_counts = [];
    tree_counts = [];
    lake_counts = [];
    cabin_counts =[];
    mountain_counts = [];
    clouds_counts = [];


    tree_list = [];

    Object.entries(data.TREE).forEach(function([key, value]){
        if (value== 1) {
            tree_list.push(key)
        }
    })

    mountain_list = [];

    Object.entries(data.MOUNTAIN).forEach(function([key, value]){
        if (value== 1) {
            mountain_list.push(key)
        }
    })

    cabin_list = [];

    Object.entries(data.CABIN).forEach(function([key, value]){
        if (value== 1) {
            cabin_list.push(key)
        }
    })

    lake_list =[]

    Object.entries(data.LAKE).forEach(function([key, value]){
        if (value== 1) {
            lake_list.push(key)
        }
    })

    
    clouds_list =[]

    Object.entries(data.CLOUDS).forEach(function([key, value]){
        if (value== 1) {
            clouds_list.push(key)
        }
    })


    console.log(clouds_list);


    Object.entries(data).forEach(function([key, value]){
       if (key != 'EPISODE' && key !='TITLE' && key !='Seasons') {
            element_obj = {};

            occurrence_counter = 0;

            Object.values(value).forEach(function(value2){
                occurrence_counter += value2;
            })

            element_obj.text = key;
            element_obj.count = occurrence_counter;

            element_counts.push(element_obj);
       }

       
    })

    Object.entries(data).forEach(function([key, value]){
        if (key != 'EPISODE' && key !='TITLE' && key !='TREE' && key !='Seasons') {
             element_obj = {};
 
             occurrence_counter = 0;
 
             Object.entries(value).forEach(function([key2, value2]){
                if (tree_list.includes(key2)){
                 occurrence_counter += value2;
             }})
 
             element_obj.text = key;
             element_obj.count = occurrence_counter;
 
             tree_counts.push(element_obj);
        }
    })

    Object.entries(data).forEach(function([key, value]){
            if (key != 'EPISODE' && key !='TITLE' && key != 'MOUNTAIN' && key !='Seasons') {
                 element_obj = {};
     
                 occurrence_counter = 0;
     
                 Object.entries(value).forEach(function([key2, value2]){
                    if (mountain_list.includes(key2)){
                     occurrence_counter += value2;
                 }})
     
                 element_obj.text = key;
                 element_obj.count = occurrence_counter;
     
                 mountain_counts.push(element_obj);
            }
        })

    Object.entries(data).forEach(function([key, value]){
        if (key != 'EPISODE' && key !='TITLE' && key !='CABIN' && key !='Seasons') {
            element_obj = {};
         
            occurrence_counter = 0;
         
            Object.entries(value).forEach(function([key2, value2]){
                if (cabin_list.includes(key2)){
                occurrence_counter += value2;
                     }})
         
                     element_obj.text = key;
                     element_obj.count = occurrence_counter;
         
                     cabin_counts.push(element_obj);
                }
            })

     Object.entries(data).forEach(function([key, value]){
                    if (key != 'EPISODE' && key !='TITLE' && key !='LAKE' && key !='Seasons') {
                        element_obj = {};
                     
                        occurrence_counter = 0;
                     
                        Object.entries(value).forEach(function([key2, value2]){
                            if (lake_list.includes(key2)){
                            occurrence_counter += value2;
                                 }})
                     
                                 element_obj.text = key;
                                 element_obj.count = occurrence_counter;
                     
                                 lake_counts.push(element_obj);
                            }
                        })

    Object.entries(data).forEach(function([key, value]){
                                if (key != 'EPISODE' && key !='TITLE' && key != "CLOUDS" && key !='Seasons') {
                                    element_obj = {};
                                 
                                    occurrence_counter = 0;
                                 
                                    Object.entries(value).forEach(function([key2, value2]){
                                        if (clouds_list.includes(key2)){
                                        occurrence_counter += value2;
                                             }})
                                 
                                             element_obj.text = key;
                                             element_obj.count = occurrence_counter;
                                 
                                             clouds_counts.push(element_obj);
                                        }
                                    })

    


    var myConfig = {
        "graphset":[
        {
        "type":"wordcloud",
        "options":{
            "style":{
            "tooltip":{
              visible: true,
              text: '%text: %hits'
            }
          },
        "words": element_counts
    }
}
]
};

var treeConfig = {
    "graphset":[
    {
    "type":"wordcloud",
    "options":{
        // colorType: 'palette',
        // palette: ['#2196F3','#3F51B5','#42A5F5','#5C6BC0','#64B5F6','#7986CB','#90CAF9','#9FA8DA','#BBDEFB','#C5CAE9'],
      "style":{
        "tooltip":{
          visible: true,
          text: '%text: %hits'
        }
      },
    "words": tree_counts
}
}
]
};

var mountainConfig = {
    "graphset":[
    {
    "type":"wordcloud",
    "options":{
        // colorType: 'palette',
        // palette: ['#2196F3','#3F51B5','#42A5F5','#5C6BC0','#64B5F6','#7986CB','#90CAF9','#9FA8DA','#BBDEFB','#C5CAE9'],
      "style":{
        "tooltip":{
          visible: true,
          text: '%text: %hits'
        }
      },
    "words": mountain_counts
}
}
]
};

var cabinConfig = {
    "graphset":[
    {
    "type":"wordcloud",
    "options":{
        // colorType: 'palette',
        // palette: ['#2196F3','#3F51B5','#42A5F5','#5C6BC0','#64B5F6','#7986CB','#90CAF9','#9FA8DA','#BBDEFB','#C5CAE9'],
      "style":{
        "tooltip":{
          visible: true,
          text: '%text: %hits'
        }
      },
    "words": cabin_counts
}
}
]
};

var lakeConfig = {
    "graphset":[
    {
    "type":"wordcloud",
    "options":{
        // colorType: 'palette',
        // palette: ['#2196F3','#3F51B5','#42A5F5','#5C6BC0','#64B5F6','#7986CB','#90CAF9','#9FA8DA','#BBDEFB','#C5CAE9'],
      "style":{
        "tooltip":{
          visible: true,
          text: '%text: %hits'
        }
      },
    "words": lake_counts
}
}
]
};

var cloudsConfig = {
    "graphset":[
    {
    "type":"wordcloud",
    "options":{
      "style":{
        "tooltip":{
          visible: true,
          text: '%text: %hits'
        }
      },
    "words": clouds_counts
}
}
]
};



zingchart.render({
    id: 'myChart',
    data: myConfig,
    height: 400,
    width: '100%'
});


d3.select("#Tree").on("click", treeFunction);

function treeFunction(){
    zingchart.render({ 
    id: 'myChart', 
    data: treeConfig,
    height: 400,
    width: '100%'
});
}

d3.select("#Mountain").on("click", mountainFunction);

function mountainFunction(){
    zingchart.render({ 
    id: 'myChart', 
    data: mountainConfig,
    height: 400,
    width: '100%' 
});
}

d3.select("#Cabin").on("click", cabinFunction);

function cabinFunction(){
    zingchart.render({ 
    id: 'myChart', 
    data: cabinConfig,
    height: 400,
    width: '100%' 
});
}

d3.select("#Lake").on("click", lakeFunction);

function lakeFunction(){
    zingchart.render({ 
    id: 'myChart', 
    data: lakeConfig,
    height: 400,
    width: '100%' 
});
}

d3.select("#Clouds").on("click", cloudsFunction);

function cloudsFunction(){
    zingchart.render({ 
    id: 'myChart', 
    data: cloudsConfig,
    height: 400,
    width: '100%' 
});
}

buttonGroup = d3.select('.btn-group');

buttonGroup.selectAll('button')
    .on('click', function(){
        var selectedValue = d3.select(this).attr('value');
        if (selectedValue == 'TREES'){
            treeFunction()
        }
        else if (selectedValue == 'MOUNTAINS'){
            mountainFunction()
        }
        else if (selectedValue == 'LAKE'){
            lakeFunction()
        }
        else if (selectedValue == 'CABIN'){
            cabinFunction()
        }
        else if (selectedValue == 'CLOUDS'){
            cloudsFunction()
        }
       
    });


});

