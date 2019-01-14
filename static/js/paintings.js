elementsURL = "/element-data"
paintingsURL = "/painting-data"

//CREATE PAINTING DATA ARRAY
//##################################################
var dataArray = [];

d3.json(paintingsURL).then(function(paintingData){
    Object.values(paintingData.episode_id).forEach(function(value){
        var episode_data = {'episode_id': value};
        dataArray.push(episode_data);
    });

    Object.entries(paintingData.episode_name).forEach(function([key, value]){
        dataArray[key].episode_name = value;
    });

    Object.entries(paintingData.img_url).forEach(function([key, value]){
        dataArray[key].img_url = value;
    });

    Object.entries(paintingData.video_url).forEach(function([key, value]){
        dataArray[key].video_url = value;
    });
});

//FILTER DATA ARRAY AND POPULATE IMAGES
//##################################################
function filterData(filterValue){
    episodeArr = [];
    episodeIndices = [];

    d3.json(elementsURL).then(function(elementData){
        if (filterValue == 'ALL'){
            Object.values(elementData.EPISODE).forEach(function(value){
                episodeArr.push(value);
            })
        }
        else {
            Object.entries(elementData).forEach(function([columnName, columnData]){
                if (columnName == filterValue){
                    Object.entries(columnData).forEach(function([episodeIndex, elementFlag]){
                        if (elementFlag == 1){
                            episodeIndices.push(episodeIndex);
                        }
                    })
                }
            })

            Object.entries(elementData.EPISODE).forEach(function([episodeIndex, episodeID]){
                if (episodeIndices.includes(episodeIndex)){
                    episodeArr.push(episodeID);
                }
            })
        }

        function getFilteredData(episode){
            return episodeArr.includes(episode.episode_id)
        }

        var finalArray = dataArray.filter(getFilteredData);

        //IMAGES
        //##################################################
        var selection = d3.select('.putstuffhere').select('.row').selectAll('div')

        var thumbnails = selection.data(finalArray)
            .enter()
            .append('div')
            .classed('col-xs-6 col-md-2', true)
            .append('a')
            .classed('thumbnail', true)
            .attr('href', d=>d.video_url)
        
        thumbnails.append('img')
            .classed('image', true)
            .attr('src', d=>d.img_url)
            .attr('alt', d=>d.episode_name);
        
        thumbnails.append('div')
            .classed('caption', true)
            .append('h4')
            .classed('text', true)
            .html(d=> `${d.episode_id}:<br>${d.episode_name}`);
    })
}

//INITIALIZE PAGE WITH ALL PAINTINGS
//##################################################
filterData('ALL');

//CHANGE PAINTINGS BASED ON USER FILTER SELECTION
//##################################################
buttonGroup = d3.select('.btn-group')

buttonGroup.selectAll('button')
    .on('click', function(){
        var selectedValue = d3.select(this).attr('value');

        d3.selectAll('.putstuffhere > .row > *').remove();

        filterData(selectedValue);
    })














