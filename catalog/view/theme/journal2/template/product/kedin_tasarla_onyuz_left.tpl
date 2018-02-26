<!--  alpaygunes.com  --------------------------------------------------------- -->
<div id="tasarim-alani" style="overflow: auto;width: 100%">
    <fieldset class="alanseti">
        <legend>
            Tasarim Alanı
        </legend>
        <div class="table table-bordered">
            <div id="tasarim-loader"
                 style="display: none;
                                width: 200px;
                                height: 150px;
                                top:10%;
                                left: 20%;
                                z-index: 99;
                                position: absolute">
                <div style="
                                margin-top: 0px;
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
                   style="font-size: 150px!important">
                </i>
            </div>
            <div id="cnv_container">

            </div>
        </div>
    </fieldset>
</div>


<style>
    #CursorLayer{
        width: 100%;
    }
</style>


<!-- ---------------------------------------------------Modal---------------------------- -->

<div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content" style="min-width: 300px;max-width: 500px;width: 90%">
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
                                                        height: 90px;
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
                            <div class="btn btn-primary" id="resmi-sola-cevir"><i class="fa fa-rotate-left"></i></div>
                            <div class="btn btn-primary" id="resmi-saga-cevir"><i class="fa fa-rotate-right"></i></div>
                            <div class="btn btn-primary" id="resim-yukle">Resim Yükle</div>
                            <div id="resim-secimi-tamam" class="btn btn-primary " data-dismiss="modal">Tamam</div>
                            <div class="btn btn-primary" id="instagramdan-yukle">İnstagramdan Yükle</div>
                            <div id="resim-secimi-vazgec" class="btn btn-cancel " data-dismiss="modal">Vazgeç</div>
                            <input type="file" id="file" style="display: none">
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center">

                            <div id="secim-tuval"
                                 style="max-width: 470px;position: relative;display: none">
                                <img crossOrigin="Anonymous"
                                     id="orjinal-resim"
                                     style="width: 100%;">
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
                </table>
                <img id="onizleme">

            </div>
        </div>

    </div>
</div>


<!-- --------------------------------alpaygunes jqueryui dialog -->
<div id="dialog" title="Metin girişi" class="tasarim-dialog" style="display: none">
    <p id="dialog-metin"></p>
    <input id="dialog-girdi" type="text" class="form-control" value="ddd ">
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

<script language="JavaScript">
    var iceriklerArr            = [];
    var instagramLoginURL;
    var instagramResimURLeri    ='';
    var ins_oncekiURL           = [];
    var ins_sayfa_no            = '0';
    var ins_sonrakiURL;
    $(document).ready(function () {
        //şablondaki orjinal alanı kapatalım
        $('#tasarim-loader').show();
        $('#urun-resim-alani').hide();
        $('#instagramdan-yukle').hide();

        product_id      =<?php echo $product_id;?>;
        var data = new FormData();
        data.append('product_id', product_id);
        jQuery.ajax({
            url: '?route=tasarim/icerikver/getIceriklerArr',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function(data){
                try{
                    // eğer onbellekten geldiyse baında ve sonunda ikitane çift
                    // tırkan vardır onların temizlenip tek e indirilmesi gerekli
                    var res = data.substring(0,1);
                    if(res=='"'){
                        data = data.substring(1,data.length-1);
                    }
                    iceriklerArr = JSON.parse(data);
                    if (iceriklerArr!='') {
                        $('#urun-resim-alani').hide();
                        $('#tasarim-loader').hide();
                        $('#tasarim-alani').show();
                        //$('#tasarim-onay-alani').show();
                        //$('#tasarim-onay').prop("checked", false);
                        gelenTextleriTemizle();
                        ciz();
                        sepeteEkleyiTasi();
                    }else{
                        $('#tasarim-alani').hide();
                        $('#urun-resim-alani').show();
                        $('#tasarim-loader').hide();
                        $('.alanseti').hide();

                    }
                }catch(e){
                    $('#tasarim-alani').hide();
                    $('#urun-resim-alani').show();
                    $('#tasarim-loader').hide();
                    $('.alanseti').hide();
                }
            },
            error: errorHandler = function(xhr, status, error) {
                $('#tasarim-alani').hide();
                $('#urun-resim-alani').show();
                $('#tasarim-loader').hide();
                alert(error)
            }
        });



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


    // orjinal şablondaki sepete ekleme yerini bneim tasarım tablosuna alalım
    function sepeteEkleyiTasi(){
        //iceriklerARrnin de produc kimliğinin içinde olması lazım. post edilmesi için
        var icerikler   = $('#iceriklerArr').detach();
        $('#product').append(icerikler);
        var element = $('#product').detach();
        $('#sablondan-yapistirma-yeri').append(element);
        $('#sablondan-yapistirma-yeri').addClass('right');
    }



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

</script>