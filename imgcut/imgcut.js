/**
 * Created by AKS on 7/23/2016.
 */
$.widget("custom.imgcut", {

    options: {
        dragAndDrop: false,
        initialWidth: 200,
        initialHeight: 200,

        // max size of the outer container
        maxHeight: 400,
        maxWidth: 400,
        // ajax options
        urlToConvert: "http://localhost/dev/imgcut/php/generate_url.php",
        urlToCrop: "http://localhost/dev/imgcut/php/crop.php",
        urlToSave: "http://localhost/dev/imgcut/php/save.php",
        // Resizer options
        handles: "se",
        aspectRatio: true,
        maxResizeHeight: 400,
        maxResizeWidth: 400,
        minResizeHeight: 200,
        minResizeWidth: 200
    },
    _create: function () {

        _this = this;

        this._initializeOptions();

        this._initializeWorkspace();

        this._initializeImageDropDiv();


        //this._initializeToolbar();

        /*
         this._updateCoordinates();

         this._attachAjaxForm();
         */
        /*this.element.change(function () {

         _this._uploadToServer();

         });
         */

    },
    _initializeWorkspace: function () {

        // get wrapper
        this.wrap = $(imgCutWrapper);
        // wrap the field
        this.element.wrap(this.wrap);
        // add dragAnddrop div after control
        this.imageDropDiv = $(imageDropDiv);
        this.element.after(this.imageDropDiv);
        this.element.hide();


    },
    _initializeImageDropDiv: function () {

        _this = this;
        $(this.imageDropDiv).on({
            dragover: function (event) {
                event.stopPropagation();
                event.preventDefault();
            },
            drop: function (event) {

                event.stopPropagation();
                event.preventDefault();

                console.log(event);

                var file = event.originalEvent.dataTransfer.files[0];
                if (file != undefined) {
                    var reader = new FileReader();
                    reader.onload = function (event) {

                        // TODO : Check type
                        // TODO : Check size
                        // var image = new Image();
                        // image.src = event.target.result;

                        var canvas = $("<canvas/>");

                        $("body").append(canvas);

                        var ctx = canvas.get(0).getContext("2d");

                        var image = new Image();
                        image.src = event.target.result;

                        image.onload = function () {
                            // ctx.clearRect(0, 0, canvas.width, canvas.height);
                            ctx.canvas.width = parseInt(image.width);
                            ctx.canvas.height = parseInt(image.height);
                            ctx.drawImage(image, 0, 0, image.width, image.height);

                            $(_this.imageDropDiv).append(canvas);
                        };

                        //  _this._sendToServerAndGetJPG(event.target.result);

                    };

                    reader.readAsDataURL(file);
                }

            }
        });

        /*
         this.imageDropDiv.scroll(function () {
         if (_this.doScroll == true)
         _this._updateCropBoxParentPosition();
         });
         this.image = this.imageDropDiv.find('img');

         this.imageDropDiv.appendTo(this.wrap);
         this.overlayParent = $("<div/>").addClass("cl-imgcut-crop-overlay-parent");
         this.overlayParent.appendTo(this.imageDropDiv);

         // add the overlay
         this.overlay = $("<div/>").addClass("cl-imgcut-crop-overlay");
         // attach overlay
         this.overlay.appendTo(this.overlayParent);
         // make overlay resizeable
         this.overlay.resizable({
         resize: function (event, ui) {
         _this._updateCoordinates();
         },
         handles: this.options.handles,
         aspectRatio: this.options.aspectRatio,
         maxHeight: this.options.maxResizeHeight,
         maxWidth: this.options.maxResizeWidth,
         minHeight: this.options.minResizeHeight,
         mubWidth: this.options.minResizeWidth
         });

         var overlayWidth = this.overlay.width();
         var overlayHeight = this.overlay.height();
         console.log("OverlayParent top");
         // set it draggable
         this.overlay.draggable(
         {
         drag: function (event, ui) {
         _this.doScroll = false;
         _this._updateCoordinates();

         },
         stop: function (event, ui) {

         _this.doScroll = true;
         },
         containment: [0, 0, 400 - overlayWidth, 400 - overlayHeight]
         }
         );
         */
    },
    _initializeOptions: function () {
        this.doScroll = true;
        this.zoomFactor = 1;
        this.maxZoomFactor = 5;

    },
    _initializeToolbar: function () {

        // create toolbar
        this.toolbar = $(toolBarHtml);

        // attach events
        this.toolbar.find(".cl-imgcut-toolbar-button-crop").on("click", function () {
            _this._cropButtonPressed();
        });
        this.toolbar.find(".cl-imgcut-toolbar-button-undo").on("click", function () {
            _this._undoButtonPressed();
        });
        this.toolbar.find(".cl-imgcut-toolbar-button-zoom-plus").on("click", function () {
            _this._zoomPlusButtonPressed();
        });
        this.toolbar.find(".cl-imgcut-toolbar-button-zoom-minus").on("click", function () {
            _this._zoomMinusButtonPressed();
        });
        this.toolbar.find(".cl-imgcut-toolbar-button-save").on("click", function () {
            _this._saveButtonPressed();
        });

        this.imageDropDiv.before(this.toolbar);

    },
    _attachAjaxForm: function () {

        this.ajaxUploadForm = $(ajaxUploadForm);
        this.ajaxUploadForm.appendTo(this.wrap);

    },
    _sendToServerAndGetJPG: function (dataUrl) {

        $.post(
            this.options.urlToConvert,
            {dataUrl: dataUrl},
            function (response) {

                alert(response);
            }
        );

    },

    _uploadToServer: function () {

        _this = this;
        // get the parent
        this.parent = this.element.parent();

        this.element.appendTo(this.ajaxUploadForm);


        $.ajax({
            url: this.options.urlToSave,
            data: new FormData(this.ajaxUploadForm[0]),
            context: document.body,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST'
        }).always(function (data) {
            _this.parent.append(_this.element);
            _this.image.attr('src', data);
        });

    },
    _cropButtonPressed: function () {
        this._crop();
    },
    _undoButtonPressed: function () {
        this._undo();
    },
    _saveButtonPressed: function () {
        this._save();
    },
    _updateCoordinates: function () {

        var x1 = this.overlay.offset().left;
        var y1 = this.overlay.offset().top;
        var x2 = this.overlay.offset().left + this.overlay.width();
        var y2 = this.overlay.offset().top + this.overlay.height();

        this.toolbar.find(".cl-imgcut-toolbar-crop-box-input-x1").val(x1);
        this.toolbar.find(".cl-imgcut-toolbar-crop-box-input-x2").val(x2);
        this.toolbar.find(".cl-imgcut-toolbar-crop-box-input-y1").val(y1);
        this.toolbar.find(".cl-imgcut-toolbar-crop-box-input-y2").val(y2);

        this.toolbar.find(".cl-imgcut-toolbar-crop-box-input-height").val(y2 - y1);
        this.toolbar.find(".cl-imgcut-toolbar-crop-box-input-width").val(x2 - x1);
    },
    _crop: function () {

        var form = $("#id-form");


    },
    _undo: function () {

    },
    _save: function () {

    },
    _updateCropBoxParentPosition: function () {
        var scrollTop = this.imageDropDiv.scrollTop();
        var scrollLeft = this.imageDropDiv.scrollLeft();

        var dragAndDropDivTop = this.imageDropDiv.offset().top;
        var dragAndDropDivLeft = this.imageDropDiv.offset().left;


        console.log("scrollTop=" + scrollTop);
        console.log("scrollLeft=" + scrollLeft);

        console.log("dragDivTop=" + dragAndDropDivTop);
        console.log("dragDivLeft=" + dragAndDropDivLeft);


        this.overlayParent.css({top: scrollTop, left: scrollLeft});

        var top = scrollTop;
        var left = scrollLeft;

        this.overlay.draggable({containment: "parent", scroll: false});
    },
    _zoomPlusButtonPressed: function () {

        if (this.zoomFactor >= this.maxZoomFactor)
            return;

        var width = $(this.image).width();
        var height = $(this.image).height();


        var newWidth = ( width * (this.zoomFactor + 0.5) ) / this.zoomFactor;
        var newHeight = ( height * (this.zoomFactor + 0.5) ) / this.zoomFactor;

        $(this.image).width(newWidth);
        $(this.image).height(newHeight);

        console.log("Original Width = " + width);
        console.log("Original Height = " + height);
        console.log("Original Zoom = " + this.zoomFactor);

        console.log("New Width = " + newWidth);
        console.log("New Height = " + newHeight);

        this.zoomFactor = this.zoomFactor + 0.5;
        console.log("New Zoom = " + this.zoomFactor);

        this.toolbar.find(".cl-imgcut-toolbar-source-input-zoomed-height").val(this.image.height());
        this.toolbar.find(".cl-imgcut-toolbar-source-input-zoomed-width").val(this.image.width());

    },
    _zoomMinusButtonPressed: function () {


        if (this.zoomFactor <= 1)
            return;

        var width = $(this.image).width();
        var height = $(this.image).height();

        var newWidth = ( width * (this.zoomFactor - 0.5) ) / this.zoomFactor;
        var newHeight = ( height * (this.zoomFactor - 0.5) ) / this.zoomFactor;

        $(this.image).width(newWidth);
        $(this.image).height(newHeight);

        console.log("Original Width = " + width);
        console.log("Original Height = " + height);
        console.log("Original Zoom = " + this.zoomFactor);

        console.log("New Width = " + newWidth);
        console.log("New Height = " + newHeight);

        this.zoomFactor = this.zoomFactor - 0.5;
        console.log("New Zoom = " + this.zoomFactor);

        $(".cl-imgcut-toolbar-source-input-zoomed-height").val(this.image.height());
        $(".cl-imgcut-toolbar-source-input-zoomed-width").val(this.image.width());

    }

});

var toolBarHtml = "<div class='cl-imgcut-toolbar'>" +
    "<form enctype='multipart/form-data' name='coordinates' class='cl-imgcut-toolbar-coord-form'>" +
    "<label>Absolute Cropbox x1</label>" +
    "<input readonly name= 'crop_box_input_x1' type='text' class='cl-imgcut-toolbar-crop-box-input-x1'>" +
    "<label>Absolute Cropbox y1</label>" +
    "<input readonly name='crop_box_input_y1' type='text' class='cl-imgcut-toolbar-crop-box-input-y1'>" +
    "<label>Absolute Cropbox x2</label>" +
    "<input readonly name='crop_box_input_x2' type='text' class='cl-imgcut-toolbar-crop-box-input-x2'>" +
    "<label>Absolute Cropbox y2</label>" +
    "<input readonly name='crop_box_input_y2' type='text' class='cl-imgcut-toolbar-crop-box-input-y2'>" +
    "<label>Cropbox height</label>" +
    "<input readonly name='crop_box_input_height' type='text'  class='cl-imgcut-toolbar-crop-box-input-height'>" +
    "<label>Cropbox width</label>" +
    "<input readonly name='crop_box_input_width' type='text' class='cl-imgcut-toolbar-crop-box-input-width'>" +
    "<label>Source Data</label>" +
    "<input readonly name='source_image_data_string' type='text' class='cl-imgcut-toolbar-input-file-in-string'>" +
    "<label>Source Height</label>" +
    "<input readonly name='source_image_input_height' type='text'  class='cl-imgcut-toolbar-source-input-height'>" +
    "<label>Source Width</label>" +
    "<input readonly name='source_image_input_width' type='text' class='cl-imgcut-toolbar-source-input-width'>" +
    "<label>Source Zoomed Height</label>" +
    "<input readonly name='source_image_input_zoomed_height' type='text'  class='cl-imgcut-toolbar-source-input-zoomed-height'>" +
    "<label>Source Width</label>" +
    "<input readonly name='source_image_input_zoomed_width' type='text' class='cl-imgcut-toolbar-source-input-zoomed-width'>" +
    "</form>" +
    "<div class='cl-imgcut-toolbar-buttons'>" +
    "<button name='button_crop' class='cl-imgcut-toolbar-button-crop' >Crop</button>" +
    "<button name='button_undo' class='cl-imgcut-toolbar-button-undo' >Undo</button>" +
    "<button name='button_zoom' class='cl-imgcut-toolbar-button-zoom-plus' >+</button>" +
    "<button name='button_zoom' class='cl-imgcut-toolbar-button-zoom-minus' >-</button>" +
    "<button name='button_save' class='cl-imgcut-toolbar-button-save' >Save</button>" +
    "</div>" +
    "<canvas class='cl-canvas'></canvas>" +
    "</div>";
var imageDropDiv = "<div class='cl-imgcut-drag-and-drop-div'></div>"
var imgCutWrapper = "<div class='cl-imgcut-wrapper-div'></div>";
var imgSrcTag = "<img class='cl-imgcut-image-div'/>";
var ajaxUploadForm = "<form class='cl-imgcut-ajax-upload-form'></form>";