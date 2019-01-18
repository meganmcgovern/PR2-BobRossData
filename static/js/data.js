var colors = ["#6babac", "#e55253"];

elementsURL = "/element-data"
paintingsURL = "/painting-data"

function range(start, end) {
    var ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i + "");
    }
    return ans;
}

function contains(target, pattern){
    var value = 0;
    pattern.forEach(function(word){
      value = value + target.includes(word);
    });
    return (value === 1)
}

CLOUDS = ['CIRRUS', 'CUMULUS']
PLANTS = ['BUSHES', 'CACTUS', 'FLOWERS', 'GRASS']
GUESTS = ['DIANE_ANDRE', 'STEVE_ROSS']
NATURE = ['BEACH', 'CLIFF', 'FIRE',  'FOG',  'HILLS', 'LAKE', 'MOON', 'MOUNTAIN', 'NIGHT',
          'OCEAN', 'PATH', 'RIVER', 'ROCKS', 'SNOW', 'SUN', 'WATERFALL', 'WAVES', 'WINTER']
OBJECTS = ['BARN', 'BOAT', 'BRIDGE', 'BUILDING', 'CABIN', 'DOCK', 'FARM', 'FENCE', 'LIGHTHOUSE', 'MILL', 'STRUCTURE', 'WINDMILL']
TREES = ['CONIFER', 'DECIDUOUS','PALM_TREES']

d3.json(elementsURL).then(function(data) {

    console.log(data);

    seasons_list = [];
    for (var i = 1; i < 32; i++){

        current_season = [];

            Object.entries(data.Seasons).forEach(function([key, value]){
                if (value == i) {
                    current_season.push(key);
                }

            })
        seasons_list.push(current_season)
    };

    seasons_elements = [];
    seasons_list.forEach(function(season_episode, index){
        element_counts = []
        season_obj = {}
        Object.entries(data).forEach(function([key, value]){
            if (key != 'EPISODE' && key !='TITLE' && key != 'Seasons') {
                    element_obj = {};

                    occurrence_counter = 0;

                    Object.entries(value).forEach(function([key2, value2]){
                        if (season_episode.includes(key2)) {
                            occurrence_counter += value2;
                        }

                    });

                    element_obj.arg = key;
                    element_obj.val = occurrence_counter;
                    if (CLOUDS.includes(key)){
                        element_obj.parentId = 'CLOUDS'
                    }
                    else if (PLANTS.includes(key)){
                                element_obj.parentId = 'PLANTS'
                    }
                    else if (GUESTS.includes(key)){
                            element_obj.parentId = 'GUESTS'
                    }
                    else if (NATURE.includes(key)){
                        element_obj.parentId = 'NATURE'
                    }
                    else if (OBJECTS.includes(key)){
                        element_obj.parentId = 'OBJECTS'
                    }
                    else if (TREES.includes(key)){
                        element_obj.parentId = 'TREES'
                    }
                    else{
                        element_obj.parentId = 'NONE'
                    }
                    element_counts.push(element_obj);
            }
        })

        clouds_counter = 0
        plants_counter = 0
        guests_counter = 0
        nature_counter = 0
        objects_counter = 0
        trees_counter = 0


        Object.entries(element_counts).forEach(function([key, value]){

            if(CLOUDS.includes(value.arg)){
                clouds_counter += value.val
            }
            if(PLANTS.includes(value.arg)){
                plants_counter += value.val
            }
            if(GUESTS.includes(value.arg)){
                guests_counter += value.val
            }
            if(NATURE.includes(value.arg)){
                nature_counter += value.val
            }
            if(OBJECTS.includes(value.arg)){
                objects_counter += value.val
            }
            if(TREES.includes(value.arg)){
                trees_counter += value.val
            }

        });

        cloud_obj = {}
        plants_obj = {}
        guests_obj = {}
        nature_obj = {}
        objects_obj = {}
        trees_obj = {}

        cloud_obj.arg = 'CLOUDS';
        cloud_obj.val = clouds_counter;
        cloud_obj.parentId = ""
        //cloud_obj.Season_num = index + 1;

        element_counts.unshift(cloud_obj);

        plants_obj.arg = 'PLANTS';
        plants_obj.val = plants_counter;
        plants_obj.parentId = ""
        // frames_obj.Season_num = index + 1;

        element_counts.unshift(plants_obj);

        guests_obj.arg = 'GUESTS';
        guests_obj.val = guests_counter;
        guests_obj.parentId = ""
        //guests_obj.Season_num = index + 1;

        element_counts.unshift(guests_obj);

        nature_obj.arg = 'NATURE';
        nature_obj.val = nature_counter;
        nature_obj.parentId = ""
        //nature_obj.Season_num = index + 1;

        element_counts.unshift(nature_obj);

        objects_obj.arg = 'OBJECTS';
        objects_obj.val = objects_counter;
        objects_obj.parentId = ""
        //objects_obj.Season_num = index + 1;

        element_counts.unshift(objects_obj);

        trees_obj.arg = 'TREES';
        trees_obj.val = trees_counter;
        trees_obj.parentId = ""
        //trees_obj.Season_num = index + 1;

        element_counts.unshift(trees_obj);

        //console.log(element_counts)

        title_obj = {};
        title_obj['Season ' + (index + 1)] = element_counts

        seasons_elements.push(element_counts)
        //seasons_elements.push(element_counts)
    })

    final_data = seasons_elements[3];

    console.log(seasons_elements)

    console.log(document.getElementById('textInput').value)

    function buildChart(values){

    var DemoApp = angular.module('DemoApp', ['dx']);

    DemoApp.controller('DemoController', function DemoController($scope, $element) {
         $scope.value = values;
         console.log(values)
         console.log($scope.value)
         var myVar = 0

         $scope.$watch('value', function() {
            $scope.dataSource = filterData("",$scope.value);
        });

        $scope.numberBoxOptions = {
            min: 0,
            max: 30,
            showSpinButtons: true,
            bindingOptions: {
                value: "value"
            }
        };


        $scope.slider = {
            withStep: {
                min: 0,
                max: 31,
                value: 1,
                step: 1,
                tooltip: {
                    enabled: true
                }
            },
            disabled: {
                min: 0,
                max: 31,
                value: 5,
                disabled: true
            },
            eventHandlingOptions: {
                min: 0,
                max: 31,
                bindingOptions: {
                    value: "value"
                }
            }

        };

        console.log($scope.slider.eventHandlingOptions.bindingOptions.value)

        $scope.dataSource = filterData("", $scope.value);
        $scope.isFirstLevel = true;

        $scope.chartOptions = {
            bindingOptions: {
                dataSource: {
                  deep : true,
                  dataPath : "dataSource"
                }
            },
            series: { argumentField: 'arg', valueField: 'val' },
            title: "Elements Over Time",
            series: {
                type: "bar"
            },
            legend: {
                visible: false
            },
            valueAxis: {
                showZero: false
            },
            onPointClick: function (e) {
                if ($scope.isFirstLevel) {
                    $scope.isFirstLevel = false;
                    removePointerCursor($element);
                    $scope.dataSource = filterData(e.target.originalArgument,0);
                    $scope.options = {
                        chart: {
                            xAxis: {
                                rotateLabels: 90
                               }
                            }
                        }
                }
            },
            customizePoint: function () {
                var pointSettings = {
                    color: colors[Number($scope.isFirstLevel)]
                };

                if (!$scope.isFirstLevel) {
                    pointSettings.hoverStyle = {
                        hatching: "none"
                    };
                }

                return pointSettings;
            }
        };

        $scope.buttonOptions = {
            text: "Back",
            icon: "chevronleft",
            bindingOptions: {
                visible: "!isFirstLevel"
            },
            onClick: function () {
                if (!$scope.isFirstLevel) {
                    $scope.isFirstLevel = true;
                    addPointerCursor($element);
                    $scope.dataSource = filterData("",$scope.value);
                }
            }
        };

        addPointerCursor($element);

    });

};

buildChart(7);

var slider = d3.select('#slider')
slider.on('click', function(){
    d3.event.preventDefault()
    var textInput = d3.select('#textInput').property('value')
    console.log(parseInt(textInput))
    //d3.select('#chart').remove()
    //d3.select('.demo-container').append('div').attr('id', 'chart').attr('dx-chart', 'chartOptions')
    buildChart(parseInt(textInput))
});

    // buttonGroup = d3.select('#rangeInput')
    // .on('change', function(){
    //     var selectedValue = d3.select(this).attr('onchange');
    //     filterData(selectedValue);
    //     });

    function filterData(name, season_number) {
        return seasons_elements[season_number].filter(function (item) {
            return item.parentId === name;
        });

        // return seasons_elements[slider_value].filter(function (item) {
        //     return item.parentId === name;
        // });
    }

    // function updateTextInput(val) {

    //     d3.select('#textInput').node()=val;
    //     $scope.dataSource = filterData("",val);

    //   }

    function addPointerCursor(element) {
        element.find("#chart").addClass("pointer-on-bars");
    }

    function removePointerCursor(element) {
        element.find("#chart").removeClass("pointer-on-bars");
    }



});
console.log(d3.select('#textInput').node())

function updateTextInput(val) {
    document.getElementById('textInput').value=val;
  }
