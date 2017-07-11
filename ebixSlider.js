/**
 * 
 * @authors kent
 * @date    2017-07-11 10:11:12
 * @version 0.0.1
 */
$.fn.ebixSlider = function() {
    this.sliderData;
    this.createSlider = function(dataID) {
        var html;
        var sliderData = this.sliderData;
        var itemData = sliderData[dataID];

        if (!itemData) {return;}

        var imgInfo =itemData['imgInfo'];
        for (var i in imgInfo) {
            html += '<div class="rsContent"> <img class="rsImg" src="' + imgInfo[i]["url"] + '" /> <img class="rsTmb" src="' + imgInfo[i]["url"] + '" /> </div>';
        }

        var royalSlider = $(".royalSlider");
        var imgSlider = $(".imgSlider");
        var itemNo =imgSlider.find(".itemNo");
        itemNo.html(itemData['itemNo']);
        var itemName =imgSlider.find(".itemName");
        itemName.html(itemData['itemName']);

        royalSlider.append(html);
        $('#full-width-slider').royalSlider({
            fullscreen: {
                // enabled: true,
                // nativeFS: true
            },
            controlNavigation: 'thumbnails',
            autoScaleSlider: true,
            autoScaleSliderWidth: "100%",
            autoScaleSliderHeight: "100%",
            loop: true,
            autoPlay: {
                // autoplay options go gere
                enabled: true,
                pauseOnHover: true,
                stopAtAction: false,
                delay: 1000
            },
            imageScaleMode: 'fit-if-smaller',
            navigateByClick: true,
            numImagesToPreload: 2,
            arrowsNav: true,
            arrowsNavAutoHide: true,
            arrowsNavHideOnTouch: true,
            keyboardNavEnabled: true,
            fadeinLoadedSlide: true,
            // globalCaption: true,
            globalCaptionInside: false,
            thumbs: {
                appendSpan: true,
                firstMargin: true,
                paddingBottom: 4,
                fitInViewport: true,
                autoCenter: false,
            },
            //     visibleNearby: {
            //     enabled: true,
            //     centerArea: 0.5,
            //     center: true,
            //     breakpoint: 650,
            //     breakpointCenterArea: 0.64,
            //     navigateByCenterClick: true
            // }
        });
    }
    this.init = function(data) {
        this.sliderData = data;
        var itemNo ='项目主编码';
        var itemName ='项目主名称';
        var table = '<table> <tr> <th>'+itemNo+':</th> <td class="itemNo">Pro12314464</td> </tr> <tr> <th>'+itemName+':</th> <td class="itemName">苹果8</td> </tr> </table>';
        var tplStr = '<div id="sliderModal" class="modal extended-modal fade no-display imgSlider" data-backdrop="static" tabindex="-1" data-width="1000" aria-hidden="false"> <div class="panel panel-white"> <div class="panel-tools"> <span class="close" data-dismiss="modal" type="button">×</span> </div> <div class="panel-body"> <div class="row"> <div class="col-lg-9"> <div class="sliderbox"> <div id="full-width-slider" class="royalSlider heroSlider rsMinW rsHor rsWithThumbs rsWithThumbsHor"></div> <i class="fa fa-pause fa-2x btn-lunposwitch"></i> </div> </div> <div class="col-lg-3">'+table+'</div> </div> </div> </div> </div>';
        var isExit = $(".imgSlider").length;
        var createSlider = this.createSlider;
        if (!isExit) {
            $('body').append(tplStr);

            $("body").on('click', '[data-toggle="sliderModal"]', function(event) {
            	var dataID =event.currentTarget.id;
            	var itemData = data[dataID];
            	if (itemData != undefined) {
            		$("#sliderModal").attr('dataID', dataID);
            		$("#sliderModal").modal('show');
            	}
            });

            $('body').on('shown.bs.modal', '#sliderModal', function() {
                console.log('模态框打开后...');
                var dataID = $("#sliderModal").attr('dataID');
                createSlider(dataID);
            });
            $("body").on('click', '.bt_switch', function(event) {
                event.preventDefault();
                var slider = $("#full-width-slider").data('royalSlider');
                slider.toggleAutoPlay();
            });

            $("body").on("click", ".btn-lunposwitch", function(e) {
                var slider = $("#full-width-slider").data('royalSlider');
                if ($(this).hasClass('fa-pause')) {
                    $(this).removeClass('fa-pause');
                    $(this).addClass('fa-play');
                    slider.stopAutoPlay();
                } else {
                    $(this).removeClass('fa-play');
                    $(this).addClass('fa-pause');
                    slider.startAutoPlay();
                }
            });

            $('body').on('hidden.bs.modal', '#sliderModal', function() {
                var slider = $("#full-width-slider").data('royalSlider');
                if (slider != undefined) {
                	slider.destroy();
                	$(".royalSlider").empty();
                	var imgSlider = $(".imgSlider");
                	var itemNo =imgSlider.find(".itemNo");
                	itemNo.html("");
                	var itemName =imgSlider.find(".itemName");
                	itemName.html("");
                }
            });

        }
    }

    return this;
}
