<script language="JavaScript">
    var iceriklerArr = [];
    var instagramLoginURL;
    var instagramResimURLeri='';
    var ins_oncekiURL = [];
    var ins_sayfa_no    =   '0';
    var ins_sonrakiURL;
    $(document).ready(function () {

        iceriklerArr =<?php echo $iceriklerArr;?>;
        if (iceriklerArr != '') {
            $('#kendin-tasarla').show();
            $('#tasarim-onay-alani').show();
            $('#tasarim-onay').prop("checked", false);
            gelenTextleriTemizle();
            ciz();
        }


        $('#instagramdan-yukle').click(function () {
            if(instagramResimURLeri==''){
                window.open(instagramLoginURL,'instagramWindows','width=400, height=300')
            }else{
                alinanResimUrleleriniGoster(instagramResimURLeri);
            }
            //alert(instagramURL)
        })

        //instagram resimlerine tıklanınca
        $('#instagram-resimleri').on('click','.pul_resim', function () {
            hedef_icerik.orjinal_resim_url  = $(this).attr('resim_url');
            $('#orjinal-resim').attr('src',hedef_icerik.orjinal_resim_url);
            $('#loader').show();
            $('#instagram-resimleri').hide();
            var logo = document.getElementById('orjinal-resim');
            logo.onload = function () {
                $('#secim-tuval').show();
                kirpici_obj = $('#secim-tuval').kirpici(hedef_icerik.width, hedef_icerik.height);
                $('#loader').hide();
            };
        })

        $('#instagram-resimleri').on('click','#instagram-sonraki',function () {
            ins_sonrakiURL = instagramResimURLeri['pagination']['next_url'];
            if(typeof ins_sonrakiURL != 'undefined'){
                ins_sayfa_no++;
                instagramResimUrleleriniAl(ins_sonrakiURL);
            }
        })
        $('#instagram-resimleri').on('click','#instagram-onceki',function () {
            ins_sayfa_no-=1;
            instagramResimUrleleriniAl(ins_oncekiURL[ins_sayfa_no]);
        })

        //instagram url sini getir
        getInstagramLoginUrl();
    })

    ///////////------------------DOCUMENT READY SONU ///////////////////////////////////////////////





    function getInstagramLoginUrl(){
        jQuery.ajax({
            url: '?route=tasarim/instagram/getLoginUrl',
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function(data){
                instagramLoginURL = data;
            },
            error: errorHandler = function() {
            }
        });
    }

    function gelenTextleriTemizle() {
        // önce icerikarr içindeki text leri silelim
        for (var k in iceriklerArr) {
            if (iceriklerArr.hasOwnProperty(k)) {
                icerik = iceriklerArr[k];
                icerik.text = '';
            }
        }
    }

    function instagramResimUrleleriniAl(resimlerUrlsi){
        ins_oncekiURL[ins_sayfa_no]=resimlerUrlsi;
        $('#loader').show();
        var data = new FormData();
        data.append('resimlerUrlsi', resimlerUrlsi);
        jQuery.ajax({
            url: '?route=tasarim/instagram/getResimler',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function(Data){
                instagramResimURLeri = Data;
                alinanResimUrleleriniGoster(instagramResimURLeri)
                $('#loader').hide();
            },
            error: errorHandler = function() {
                alert("İnstagram resimleri yüklenemedi");
            }
        });
    }

    function alinanResimUrleleriniGoster(instagramResimURLeri){

        //resim tuvalini gizleyelim
        $('#secim-tuval').hide();
        $('#instagram-resimleri').show();
        $('#instagram-resimleri').empty();
        $.each( instagramResimURLeri.data, function( key, value ) {
            var pul_resmi_url,resim_url;
            pul_resmi_url   = value.images.thumbnail.url;
            resim_url       = value.images.standard_resolution.url;
            $('#instagram-resimleri').append('<div resim_url="'+resim_url+'"  class="pul_resim">' +
                    '<img src="'+pul_resmi_url+'">'+
                    '</div>');
        });
        $('#instagram-resimleri').append('<nav>'+
                                           '<ul class=\"pager\">'+
                                                '<li><a id="instagram-onceki">Önceki</a></li>'+
                                                '<li><a id="instagram-sonraki">Sonraki</a></li>'+
                                            '</ul>'+
                                        '</nav>');
    }


   /* function instagramResmiSunucyaGonder(){
        if(typeof kirpici_obj!='undefined' ){
            kirpici_obj.secimAlaniniSil();
            kirpici_obj.result=null;
        }
        var data = new FormData();
        jQuery.each(jQuery('#file')[0].files, function(i, file) {
            data.append('file-'+i, file);
            data.append('rasgele_sayi',Math.floor((Math.random() * 100) + 1))
            data.append('ilgili_kutu', hedef_icerik.id);

        });
        jQuery.ajax({
            url: '?route=tasarim/upload/saveFile',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function(data){
                if(data['hata']){
                    $('#loader').hide();
                    alert(data['hata']);
                }
                if(data['url_konum']){
                    hedef_icerik.orjinal_resim_url=data['url_konum'];
                    $('#orjinal-resim').attr('src',hedef_icerik.orjinal_resim_url);
                    var logo = document.getElementById('orjinal-resim');
                    logo.onload = function () {
                        //$('#secim-icin-dokun').show('slow');
                        kirpici_obj = $('#secim-tuval').kirpici(hedef_icerik.width, hedef_icerik.height);
                        $('#loader').hide();
                    };

                }
            },
            error: errorHandler = function() {
                $('#loader').hide();
                alert("Dosya gönderilemedi");
            }
        });
    }*/

</script>

<!--  alpaygunes.com  ------------------------------------------------------ -->
<div id="tasarim-alani" style="display: none;overflow: auto" class="col-sm-12">
    <table class="table table-bordered">
        <tr>
            <td style="text-align: center">
                <div id="cnv_container"></div>
            </td>
        </tr>
        <tr>
            <td>
                <table class="table table-bordered" id="etiketler">

                </table>
            </td>
        </tr>
    </table>
</div>





<!-- ---------------------------------------------------Modal---------------------------- -->

<div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content" style="max-width: 300px">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Fotoğraf seçimi...</h4>
            </div>
            <div class="modal-body">
                <div id="loader" style="display: none;
                                                        width: 200px;
                                                        height: 150px;
                                                        top:10%;
                                                        left: 20%;
                                                        z-index: 99;
                                                        position: absolute">
                    <div style="    margin-top: 0px;
                                                        margin-left: 22px;
                                                        width: 150px;
                                                        height: 150px;
                                                        text-align: center;
                                                        background-color: #fff;
                                                        border-radius: 100px;
                                                        position: absolute;
                                                        padding-top: 60px;"
                            >İşlem devam <br> ediyor
                    </div>
                    <i class="fa fa-spinner fa-pulse fa-5x fa-fw"
                       style="
                                                                   font-size: 150px!important;
                                                                   position: absolute">
                    </i>
                </div>
                <table class="table table-bordered" style="width: 100%;" align="center">
                    <tr>
                        <td>

                            <div id="secim-tuval"
                                 style="max-width: 270px;float: left;position: relative;
                                                                        display: none">
                                <img crossOrigin="Anonymous"
                                        id="orjinal-resim"
                                        style="
                                                                        max-width: 100%;max-height: 200px">
                            </div>

                            <div id="instagram-resimleri"
                                 style="
                                        text-align: center;
                                         overflow: auto;
                                         width: 100%;
                                         height: 250px;
                                         float: left;
                                         position: relative;
                                         display: none" >
                                 İnstagram resimleri
                            </div>


                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="btn btn-primary" id="resmi-sola-cevir"><i class="fa fa-rotate-left"></i></div>
                            <div class="btn btn-primary" id="resmi-saga-cevir"><i class="fa fa-rotate-right"></i></div>
                            <div class="btn btn-primary" id="resim-yukle">Bilgisayarımdan Yükle</div>
                            <div class="btn btn-primary" id="instagramdan-yukle">İnstagramdan Yükle</div>
                            <div id="resim-secimi-tamam" class="btn btn-primary " data-dismiss="modal">Tamam</div>
                            <div id="resim-secimi-vazgec" class="btn btn-cancel " data-dismiss="modal">Vazgeç</div>
                            <input type="file" id="file" style="visibility: hidden">


                        </td>
                    </tr>
                </table>
                <img id="onizleme">

            </div>
        </div>

    </div>
</div>


<!-- --------------------------------alpaygunes jqueryui dialog -->
<div id="dialog" title="Metin girişi" class="tasarim-dialog" style="display: none;padding: 0px!important;">
    <p id="dialog-metin"></p>
    <input id="dialog-girdi" type="text" class="form-control" value=" ">
    <textarea id="dialog-girdi-cs"  class="form-control" rows="10"></textarea>
    <br>

    <div id="dialog-tamam" class="btn btn-primary pull-right">Tamam</div>
</div>

<div id="dialog1" title="Formu kontrol ediniz!" class="tasarim-dialog" style="display: none">
    <p id="bos-uyari-metin"></p>
    <br>

    <div id="dialog1-tamam" class="btn btn-primary pull-right">Tamam</div>
</div>

<!--  alpaygunes.com  ------------------------------------------------------ -->