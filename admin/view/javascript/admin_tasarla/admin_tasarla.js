/**
 * Created by alpay on 11.02.2016.
 */
var iceriklerArr = [];
var seciliOge;
var cizilen_oge_sayaci =0;
$( document ).ready(function() {
    cizilen_oge_sayaci = iceriklerArr.length+1// eğer tüzenleme için açılmışsa 0 dan başlamamalı
    tuval  = $("#tuval");
    //$( "#tabs" ).tabs();
    $('#zemin_ayar_td').hide();

    //$("#tuval").append(getCircularText("ROUNDED TEXT LOOKS BEST IN CAPS!", 200, 0, "center", false, true, "Arial", "18pt", 2));
    //alert("dfdsf");


//------------------------------------------ ZEMİN RESMİ EKLEME  --------------------------------------
    $("#resim-ekle").click(function () {
        $('#imgInp').trigger('click');
        function dataOku(input) {
            var $id         = "zemin"+cizilen_oge_sayaci;
            var imageData       = '' ;
            if (input.files && input.files[0]) {
                var okuyucu     = new FileReader();
                okuyucu.onload  = function (e) {
                    imageData   = e.target.result;
                    var myImage = new Image();
                    myImage.onload = function () {
                        nitelikler  = { tur:"zemin",
                            type:"img",
                            width:myImage.width,
                            height:myImage.height,
                            src:imageData,
                            id:$id};
                        iceriklerArr[0]=nitelikler;
                        draw();
                    }
                    myImage.src = imageData;
                }
                okuyucu.readAsDataURL(input.files[0]);
            }
        }
        $("#imgInp").change(function(){
            dataOku(this);
        });
    })
//------------------------------------------ END



//-------------------------------------------------------------FİLİGRAN EKLE
    $("#filigran-ekle").click(function () {
        $id         = "filigran"+cizilen_oge_sayaci;
        nitelikler  = { tur:"filigran",
            tag:"div",
            width:300,
            height:120,
            left:"0",
            top:"0",
            rotation:"0",
            zeminin_ustunde:0,
            url:'/tasarim_musteri_resimleri/filigran.png',
            id:$id};
        cizilen_oge_sayaci++;
        iceriklerArr.push (nitelikler);
        draw();
        secimiKaldir(seciliOge);
        seciliOge = $('#'+$id);
        seciliNesneyiBelirle();
    })
//----------------------------------------------END

//-------------------------------------------------------------KATEGORİ LOGO EKLE
    $("#kategori-logo-ekle").click(function () {
        $('#modal_kategori_logolari').modal('show');
        secilen_kategori_iconun_urlsi='';
    });
    // modalda tamam denilince
    $("#moda-kategori-logosu-tamam").click(function () {
        if(secilen_kategori_iconun_urlsi.length>0){
            $id         = "kategori_logo"+cizilen_oge_sayaci;
            $url        = secilen_kategori_iconun_urlsi.substring(2,secilen_kategori_iconun_urlsi.length)
            nitelikler  = { tur:"kategori_logo",
                tag:"div",
                left:"0",
                width:75,
                height:75,
                top:"0",
                rotation:"0",
                zeminin_ustunde:0,
                url:$url,
                id:$id};
            cizilen_oge_sayaci++;
            iceriklerArr.push (nitelikler);
            draw();
            secimiKaldir(seciliOge);
            seciliOge = $('#'+$id);
            seciliNesneyiBelirle();
        }
        $('#modal_kategori_logolari').modal('hide');
    })

    var secilen_kategori_iconun_urlsi=''
    $('.kategori-logo-icon').click(function () {
        $('.kategori-logo-icon').css('border',"none")
        $(this).css('border',"1px solid #ccc")
        secilen_kategori_iconun_urlsi =$(this).attr('src');
    })
    $('#tuval').on('mouseup','.kategori-logo',function () {
        $id             = $(this).attr('id');
        for (var nesne in iceriklerArr){
            if (iceriklerArr.hasOwnProperty(nesne)) {
                icerik = iceriklerArr[nesne];
                if(icerik.id==$id){
                    icerik.width = $(this).width();
                    icerik.height = $(this).height();
                }
            }
        }
    })
//----------------------------------------------END



//------------------------------------------ RESMİ YER TUTUCU EKLE   --------------------------------------
    $("#resim-cercevesi-ekle").click(function () {
        $id         = "resim_yer_tutucu"+cizilen_oge_sayaci;
        nitelikler  = { tur:"resim_yer_tutucu",
                        tag:"div",
                        width:300,
                        height:300,
                        left:"0",
                        top:"0",
                        rotation:"0",
                        zeminin_ustunde:0,
                        id:$id};
        cizilen_oge_sayaci++;
        iceriklerArr.push (nitelikler);
        draw();
        secimiKaldir(seciliOge);
        seciliOge = $('#'+$id);
        seciliNesneyiBelirle();
    })
//------------------------------------------ END


//------------------------------------------ YAZI ALANI EKLEME  --------------------------------------
    $("#txt-kutu-ekle").click(function () {
        $('#baslangic_acisi').val(0);
        $id         = "txt_kutu"+cizilen_oge_sayaci;
        var crvParams                   = {};
        crvParams.inwardFacing       = true;
        crvParams.baslangic_acisi   = 0;
        nitelikler  = { tur:"txt_kutu",
                        bicim:"duz",
                        text:"yazı"+cizilen_oge_sayaci,
                        tag:"div",
                        width:250,
                        height:30,
                        left:"0",
                        top:"0",
                        font_family:"Arial",
                        font_size:20,
                        color:"#000000",
                        rotation:"0",
                        text_align:"center",
                        stroke_size:"0",
                        stroke_color:"#000000",
                        golge_stili:"",
                        crvParams:crvParams,
                        karakter_limiti:50,
                        font_style:"normal",
                        text_decoration:"normal",
                        font_weight:'normal',
                        id:$id};
        cizilen_oge_sayaci++;
        iceriklerArr.push (nitelikler);
        draw();
        secimiKaldir(seciliOge);
        seciliOge = $('#'+$id);
        seciliNesneyiBelirle();
    })

    $("#cs-txt-kutu-ekle").click(function () {
        $('#baslangic_acisi').val(0);
        $id         = "cs_txt_kutu"+cizilen_oge_sayaci;
        var crvParams                   = {};
        crvParams.inwardFacing       = true;
        crvParams.baslangic_acisi   = 0;
        nitelikler  = { tur:"cs_txt_kutu",
            bicim:"duz",
            text:"cs_yazı"+cizilen_oge_sayaci,
            tag:"div",
            width:250,
            height:250,
            left:"0",
            top:"0",
            font_family:"Arial",
            font_size:20,
            color:"#000000",
            rotation:"0",
            text_align:"center",
            stroke_size:"0",
            stroke_color:"#000000",
            golge_stili:"",
            crvParams:crvParams,
            karakter_limiti:50,
            font_style:"normal",
            text_decoration:"normal",
            font_weight:'normal',
            id:$id};
        cizilen_oge_sayaci++;
        iceriklerArr.push (nitelikler);
        draw();
        secimiKaldir(seciliOge);
        seciliOge = $('#'+$id);
        seciliNesneyiBelirle();
    })
//------------------------------------------ END



    $("#nesne-sil").click(function () {
        $id = $(seciliOge).attr('id');
        for (var nesne in iceriklerArr){
            if (iceriklerArr.hasOwnProperty(nesne)) {
                icerik = iceriklerArr[nesne];
                if(icerik.id==$id){
                    iceriklerArr.splice(nesne, 1);
                }
            }
        }
        draw();
    })


    $("#txt-sola-hizala").click(function () {
        $id             = $(seciliOge).attr('id');
        for (var nesne in iceriklerArr){
            if (iceriklerArr.hasOwnProperty(nesne)) {
                icerik = iceriklerArr[nesne];
                if(icerik.id==$id){
                    icerik.text_align = "left";
                }
            }
        }
        draw();

    })

    $("#txt-saga-hizala").click(function () {
        $id             = $(seciliOge).attr('id');
        for (var nesne in iceriklerArr){
            if (iceriklerArr.hasOwnProperty(nesne)) {
                icerik = iceriklerArr[nesne];
                if(icerik.id==$id){
                    icerik.text_align = "right";
                }
            }
        }
        draw();
    })

    $("#txt-ortaya-hizala").click(function () {
        $id             = $(seciliOge).attr('id');
        for (var nesne in iceriklerArr){
            if (iceriklerArr.hasOwnProperty(nesne)) {
                icerik = iceriklerArr[nesne];
                if(icerik.id==$id){
                    icerik.text_align = "center";
                }
            }
        }
        draw();
    })


// -----------------------------   -----------------------   FONT SEÇİNCE
    $("#font-listesi").change(function () {
        $id             = $(seciliOge).attr('id');
        for (var nesne in iceriklerArr){
            if (iceriklerArr.hasOwnProperty(nesne)) {
                icerik = iceriklerArr[nesne];
                if(icerik.id==$id){
                    icerik.font_family = $(this).val();
                }
            }
        }
        draw();
    })
//------------------------------------------ END


// -----------------------------   -----------------------   FONT BOYUTU SEÇİLİNCE
    $("#font-boyutu").change(function () {
        $id             = $(seciliOge).attr('id');
        for (var nesne in iceriklerArr){
            if (iceriklerArr.hasOwnProperty(nesne)) {
                icerik = iceriklerArr[nesne];
                if(icerik.id==$id){
                    icerik.font_size = $(this).val();
                }
            }
        }
        draw();
    })
//------------------------------------------ END

// -----------------------------------------------------   STROKE BOYUTU SEÇİLİNCE
    $("#stroke-boyutu").change(function () {
        $id     = $(seciliOge).attr('id');
        for (var nesne in iceriklerArr){
            if (iceriklerArr.hasOwnProperty(nesne)) {
                icerik = iceriklerArr[nesne];
                if(icerik.id==$id){
                    icerik.stroke_size = $(this).val();
                }
            }
        }
        draw();
    })
//------------------------------------------ END

//---------------------------------------------gölge ayarını alalım
    $('#golge_stili').change(function () {
        $id     = $(seciliOge).attr('id');
        for (var nesne in iceriklerArr){
            if (iceriklerArr.hasOwnProperty(nesne)) {
                icerik = iceriklerArr[nesne];
                if(icerik.id==$id){
                    icerik.golge_stili = $(this).val();
                }
            }
        }
        draw();
    })
//---------------------------------------------gölge  END



//--------------------------------------------dairesel yazı olsun
    $('#dairesel_yazi_olsun').change(function () {
        dairesel_yazi_olsun = $(this).is(':checked');
        if(dairesel_yazi_olsun){
            $('#dairesel_yazi_parametreleri').show('slow')
            // burda kaldın dairesel yapınca uzamıyor bir tanesi
            icerik.rotation=0;
            $('#golge_stili').trigger('change');
        }else{
            $('#dairesel_yazi_parametreleri').hide('slow')
        }

        $id                                     = $(seciliOge).attr('id');
        for (var nesne in iceriklerArr){
            if (iceriklerArr.hasOwnProperty(nesne)) {
                icerik                          = iceriklerArr[nesne];
                if(icerik.id==$id){
                    if(!dairesel_yazi_olsun){
                        icerik.bicim='duz';
                    }else{
                        icerik.bicim = "dairesel";
                        icerik.height = icerik.width;
                    }
                }
            }
        }
        draw();
    })
//-------------------------------------------------END


// resim kutusu zeminin üstünde olsun
    $('#zeminin_ustunde_olsun').change(function () {
        zeminin_ustunde_olsun = $(this).is(':checked');
        $id                   = $(seciliOge).attr('id');
        for (var nesne in iceriklerArr){
            if (iceriklerArr.hasOwnProperty(nesne)) {
                icerik                          = iceriklerArr[nesne];
                if(icerik.id==$id){
                    if(zeminin_ustunde_olsun){
                        icerik.zeminin_ustunde= 1;
                    }else{
                        icerik.zeminin_ustunde = 0;
                    }
                }
            }
        }
        draw();
    })



// daire sel yazı için başlangıç çapı
    $('#baslangic_acisi').focusout(function () {
        $id     = $(seciliOge).attr('id');
        for (var nesne in iceriklerArr){
            if (iceriklerArr.hasOwnProperty(nesne)) {
                icerik = iceriklerArr[nesne];
                if(icerik.id==$id){
                    icerik.crvParams.baslangic_acisi = $('#baslangic_acisi').val();
                }
            }
        }
        draw();
    })
//----------------------------------------------------END



// ----------------------------------------------------HALKANIN İÇİNE YAZ

    $('#halkanin_icine_yaz').change(function () {
        inwardFacing = $(this).is(':checked');
        $id     = $(seciliOge).attr('id');
        for (var nesne in iceriklerArr){
            if (iceriklerArr.hasOwnProperty(nesne)) {
                icerik = iceriklerArr[nesne];
                if(icerik.id==$id){
                    icerik.crvParams.inwardFacing= inwardFacing;
                }
            }
        }
        draw();
    })

// ----------------------------------------------------END

// -------------------------------------------TIKLANAN NESNEYİ SEÇİM DEĞİŞKENİNE ALALIM
    $('#tuval').on('mousedown','.tuval-ogesi',function () {
        id = $(seciliOge).attr('id');
        $('#'+id).css("border-color","rgba(0, 0, 0, 1)")
        seciliOge = $(this);
        $(seciliOge).css("border-color","rgba(255, 0, 0, 1)")
        // seçilen nesenenin özeliklerine göre açalar durum değiştirisn
        $id     = $(seciliOge).attr('id');
        for (var nesne in iceriklerArr){
            if (iceriklerArr.hasOwnProperty(nesne)) {
                icerik = iceriklerArr[nesne];
                if(icerik.id==$id){
                     if(icerik.bicim=='dairesel'){
                         $('#dairesel_yazi_olsun').prop('checked', true);
                     }else{
                         $('#dairesel_yazi_olsun').prop('checked', false);
                     }

                    if( typeof icerik.zeminin_ustunde!="undefined"){
                        if(icerik.zeminin_ustunde){
                            $('#zeminin_ustunde_olsun').prop('checked', true);
                        }else{
                            $('#zeminin_ustunde_olsun').prop('checked', false);
                        }
                    }

                    if(icerik.tur =="resim_yer_tutucu"){
                        $('#zemin_ayar_td').show();
                        $('.txt-araci').hide();
                    }else{
                        $('#zemin_ayar_td').hide();
                    }


                    if(icerik.tur =="txt_kutu"){
                        $('#karakter-limiti').val(icerik.karakter_limiti);
                        $('.txt-araci').show();

                    }

                    if(icerik.tur =="cs_txt_kutu"){
                        $('#karakter-limiti').val(icerik.karakter_limiti);
                        $('.txt-araci').show();

                    }
                    //alert(icerik.karakter_limiti);

                    $('#font-listesi').val(icerik.font_family);
                    $('#font-boyutu').val(icerik.font_size);
                    $('#font_rengi').val(icerik.color);
                    $('#font_rengi').css('background-color',icerik.color);
                    $('#stroke-boyutu').val(icerik.stroke_size);
                    $('#stroke_rengi').val(icerik.stroke_color);
                    $('#stroke_rengi').css('background-color',icerik.stroke_color);
                    if(icerik.bicim=='dairesel'){
                        $('#baslangic_acisi').val(icerik.crvParams.baslangic_acisi);
                    }
                }
            }
        }
    })


//-----------------------------------italik ----------------------------
    $('#txt-font_style').click(function () {
        $id             = $(seciliOge).attr('id');
        for (var nesne in iceriklerArr){
            if (iceriklerArr.hasOwnProperty(nesne)) {
                icerik = iceriklerArr[nesne];
                if(icerik.id==$id){
                    icerik.font_style = icerik.font_style=='italic'?'normal':'italic';
                }
            }
        }
        draw();
    })
//-----------------------------------bold ----------------------------
    $('#txt-bold').click(function () {
        $id             = $(seciliOge).attr('id');
        for (var nesne in iceriklerArr){
            if (iceriklerArr.hasOwnProperty(nesne)) {
                icerik = iceriklerArr[nesne];
                if(icerik.id==$id){
                    icerik.font_weight = icerik.font_weight=='bold'?'normal':'bold';
                }
            }
        }
        draw();
    })
//-----------------------------------underline ----------------------------
    $('#txt-underline').click(function () {
        $id             = $(seciliOge).attr('id');
        for (var nesne in iceriklerArr){
            if (iceriklerArr.hasOwnProperty(nesne)) {
                icerik = iceriklerArr[nesne];
                if(icerik.id==$id){
                    icerik.text_decoration = icerik.text_decoration=='underline'?'normal':'underline';
                }
            }
        }
        draw();
    })
//-----------------------------------karakter limiti ----------------------------
    $('#karakter-limiti').change(function () {
        $id             = $(seciliOge).attr('id');
        for (var nesne in iceriklerArr){
            if (iceriklerArr.hasOwnProperty(nesne)) {
                icerik = iceriklerArr[nesne];
                if(icerik.id==$id){
                    icerik.karakter_limiti = $(this).val();
                }
            }
        }
        draw();
    })

//---------------------altagörderme ye tıklanınca
    $('#tuval').on('click','#alta-gonder-btn', function () {
        var sira = $(this).attr('sira');
        var guncel_icerik = iceriklerArr[sira];// tıklanan
        delete iceriklerArr[sira];
        var yeniDuzenliIcerik = [];

        var sayac =0;
        for (var i=0;i<iceriklerArr.length;i++){
            if(iceriklerArr[i]){
                yeniDuzenliIcerik[sayac] = iceriklerArr[i];
                sayac++;
            }
        }

        // kenara aldığımız tıklanan iceriyi 1 e alalım
        var yeniDuzenliIcerik_ = [];
        yeniDuzenliIcerik_[0] = yeniDuzenliIcerik[0];
        yeniDuzenliIcerik_[1] = guncel_icerik;
        for (var i=2;i<=yeniDuzenliIcerik.length;i++){
                yeniDuzenliIcerik_[i] = yeniDuzenliIcerik[i-1];
        }


        iceriklerArr = yeniDuzenliIcerik_;
        draw();
    })



//----------------------------------------------------------renk seçici

    renk_call_back ='';
    $('.renk_call_back').focusin(function () {
        jQuery.farbtastic('#colorpicker').linkTo('#'+$(this).attr('id'));
        renk_call_back = $(this);
        $(this).change(function () {
            $id     = $(seciliOge).attr('id');
            for (var nesne in iceriklerArr){
                if (iceriklerArr.hasOwnProperty(nesne)) {
                    icerik = iceriklerArr[nesne];
                    if(icerik.id==$id){
                        if($(this).attr('id')=='stroke_rengi'){
                            icerik.stroke_color = $(this).val();
                        }else if($(this).attr('id')=='font_rengi'){
                            icerik.color = $(this).val();
                        }
                    }
                }
            }
            draw();
        })
    })

    $('#colorpicker').mouseup(function () {
        $id         = $(seciliOge).attr('id');
        for (var nesne in iceriklerArr){
            if (iceriklerArr.hasOwnProperty(nesne)) {
                icerik = iceriklerArr[nesne];
                if(icerik.id==$id){
                    if(renk_call_back.attr('id')=='stroke_rengi'){
                        icerik.stroke_color = renk_call_back.val();
                    }else if(renk_call_back.attr('id')=='font_rengi'){
                        icerik.color = renk_call_back.val();
                    }
                }
            }
        }
        draw();
    })
// --------------------------   RENK İŞLERİNİN SONU

//------------------------------- ürün koduna göre tasarımı geitr
    $('#tasarimi-getir').click(function () {
        $("#arama-sonucu").hide();
        urun_kodu = $("#urun-kodu").val();
        jQuery.ajax({
            url: '../index.php?route=tasarim/icerikver/getsablonbyurunkodu&urun_kodu='+urun_kodu,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function(data){
                if(!data['hata']){
                    iceriklerArr = JSON.parse(data);
                    draw();
                }else{
                    $("#arama-sonucu").show();
                    $("#arama-sonucu").html(data['hata']);
                }
            },
            error: errorHandler = function() {
                alert("Tasarım getirilirken hata oluştu");
            }
        });
    })
});

////////////////////////////////////////////////////document ready sonu //////////////////////////////





// sürüklenen öğe bırakılınca içerik arr güncellenmeli
function iceriklerArrGuncelleDragDropIcin(nesne,$top_ilk,$left_ilk,$kayitli_top,$kayitli_left){
    $id             = $(nesne).attr('id');
    var p           = $(nesne);
    var position    = p.position();
    $top            = parseInt($kayitli_top)+position.top-$top_ilk;
    $left           = parseInt($kayitli_left)+position.left-$left_ilk;
    $height         = $(nesne).height()+2;
    $width          = $(nesne).width()+2;
    $rotation       = getCurrentRotation($id);
    for (var nesne in iceriklerArr){
        if (iceriklerArr.hasOwnProperty(nesne)) {
            icerik = iceriklerArr[nesne];
            if(icerik.id==$id){
                icerik.top          = $top
                icerik.left         = $left
                icerik.height       = $height
                icerik.width        = $width
                icerik.rotation     = $rotation
            }
        }
    }
    draw();
}





// rotate biraz cins olduğundan özel fonskyon yazım. left ve right burda yok
function iceriklerArrGuncelleRotateIcin(nesne){
    $id             = $(nesne).attr('id');
    $height         = $(nesne).height()+2;
    $width          = $(nesne).width()+2;
    $rotation       = getCurrentRotation($id);
    for (var nesne in iceriklerArr){
        if (iceriklerArr.hasOwnProperty(nesne)) {
            icerik = iceriklerArr[nesne];
            if(icerik.id==$id){
                icerik.height   = $height
                icerik.width    = $width
                icerik.rotation = $rotation
            }
            if(icerik.bicim=='dairesel'){
                icerik.height = $width;
                icerik.rotation = 0;
            }
        }
    }
    draw();
}




function iceriklerArrGuncelleResizeablekIcin(nesne){
    $id             = $(nesne).attr('id');
    $height         = $(nesne).height()+2;
    $width          = $(nesne).width()+2;
    $rotation       = getCurrentRotation($id);
    for (var nesne in iceriklerArr){
        if (iceriklerArr.hasOwnProperty(nesne)) {
            icerik = iceriklerArr[nesne];
            if(icerik.id==$id){
                icerik.height = $height;
                icerik.width = $width;
                icerik.rotation = $rotation;

                if(icerik.tur=="resim_yer_tutucu"){

                }

                if(icerik.tur=="txt_kutu"){
                    if(icerik.bicim=="dairesel"){
                        icerik.height = $width;
                    }else{
                        //icerik.height = (parseInt(icerik.font_size)+10);
                    }
                }


                if(icerik.tur=="txt_kutu"){
                    icerik.height = $height;
                }


            }

        }
    }
    draw();
}






//-------------------------------------NESNENİN  GÜNCEL AÇISINI ALALIM
function getCurrentRotation( elid ) {
    var el = document.getElementById(elid);
    var st = window.getComputedStyle(el, null);
    var tr = st.getPropertyValue("-webkit-transform") ||
        st.getPropertyValue("-moz-transform") ||
        st.getPropertyValue("-ms-transform") ||
        st.getPropertyValue("-o-transform") ||
        st.getPropertyValue("transform") ||
        "fail...";

    if( tr !== "none") {
        var values = tr.split('(')[1];
        values = values.split(')')[0];
        values = values.split(',');
        var a = values[0];
        var b = values[1];
        var c = values[2];
        var d = values[3];

        var scale = Math.sqrt(a*a + b*b);

        // arc sin, convert from radians to degrees, round
        /** /
         var sin = b/scale;
         var angle = Math.round(Math.asin(sin) * (180/Math.PI));
         /*/
        var radians = Math.atan2(b, a);
        if ( radians < 0 ) {
            radians += (2 * Math.PI);
        }
        var angle = Math.round( radians * (180/Math.PI));
        /**/

    } else {
        var angle = 0;
    }

    // works!
    return radians;
}






// --------------------------------------------- DRAW --render dilecek etiketler array biçiminde olacak
function draw(dbDenGelen){
    if(dbDenGelen){
        iceriklerArr =  dbDenGelen;
    }
    // post edilmek için iceriklerArr hiden alanını güncelle . bu alan kendin_tasarla_admin.tpl içinde
    $('#iceriklerArr').val(JSON.stringify(iceriklerArr));
    //  ------  tuvali temizle
    $(tuval).empty();
    for (var k in iceriklerArr){
        if (iceriklerArr.hasOwnProperty(k)) {
            //alert("Key is " + k + ", value is" + iceriklerArr[k]);
            icerik = iceriklerArr[k];
            if(icerik.tur=='zemin'){
                $(tuval).prepend('<img style ="position:absolute;top:0;left:0" ' +
                    'id="zemin_resmi" ' +
                    'src="'+icerik.src+'"/>')
                $(tuval).css('width',icerik.width);
                $(tuval).css('height',icerik.height);
            }
            if(icerik.tur=="resim_yer_tutucu"){
                $(tuval).append('<div style ="position: absolute;transform:rotate('+icerik.rotation+'rad);width:'+
                    icerik.width+'px;height:'+
                    icerik.height+'px;left:'+
                    icerik.left+'px;top:'+
                    icerik.top+'px" id="'+
                    icerik.id+'" ' +
                    'class="resim_yer_tutucu tuval-ogesi" >' +
                    '<i class="fa fa-camera"></i>' +
                    '<div id="alta-gonder-btn" sira="'+k+'" title="Yazı Ekle" >'+k+'</div>' +
                    '</div>')
            }
            if(icerik.tur=="txt_kutu"){
                $(tuval).append('<div  style ="position: absolute;transform:rotate('+icerik.rotation+'rad);width:'+
                    icerik.width+'px;height:'+
                    icerik.font_size*0.89+'px;line-height:'+
                    icerik.font_size *0.77+'px;left:'+
                    icerik.left+'px;font-style:'+
                    icerik.font_style+'; font-weight:'+
                    icerik.font_weight+'; text-decoration:'+
                    icerik.text_decoration+'; color:'+
                    icerik.color+';font-size:'+
                    icerik.font_size+'px;font-family:'+
                    icerik.font_family+';text-align:' +
                    icerik.text_align+';'+icerik.golge_stili+';color:' +
                    icerik.color+';top:'+
                    icerik.top+'px;' +
                    strokeAyarla(icerik.stroke_size)+'" id="'+
                    icerik.id+'" ' +
                    'class="txt_kutu tuval-ogesi ' + classAyarla(icerik)+'">'
                    + icerik.text +
                    '<div id="alta-gonder-btn" sira="'+k+'" title="Alta gönder">'+k+'</div>'+
                    '</div>')
                if(icerik.bicim=='dairesel'){
                    $('#'+icerik.id).empty();
                    cnvs = curveYaziyaDonustur(icerik);
                    $('#'+icerik.id).append(cnvs);
                    $('#'+icerik.id).append('<div id="alta-gonder-btn" sira="'+k+'" title="Alta gönder"></div>');
                }

            }
            if(icerik.tur=="cs_txt_kutu"){
                $(tuval).append('<div  style ="position: absolute;transform:rotate('+icerik.rotation+'rad);width:'+
                    icerik.width+'px;height:'+
                    icerik.height+'px;line-height:'+
                    icerik.font_size *0.77+'px;left:'+
                    icerik.left+'px;font-style:'+
                    icerik.font_style+'; font-weight:'+
                    icerik.font_weight+'; text-decoration:'+
                    icerik.text_decoration+'; color:'+
                    icerik.color+';font-size:'+
                    icerik.font_size+'px;font-family:'+
                    icerik.font_family+';text-align:' +
                    icerik.text_align+';'+icerik.golge_stili+';color:' +
                    icerik.color+';top:'+
                    icerik.top+'px;' +
                    strokeAyarla(icerik.stroke_size)+'" id="'+
                    icerik.id+'" ' +
                    'class="txt_kutu tuval-ogesi ' + classAyarla(icerik)+'">'
                    + icerik.text +
                    '<div id="alta-gonder-btn" sira="'+k+'" title="Alta gönder">'+k+'</div>'+
                    '</div>')

            }
            if(icerik.tur=='filigran'){
                $(tuval).append('<div style ="position: absolute;transform:rotate('+icerik.rotation+'rad);width:'+
                    icerik.width+'px;height:'+
                    icerik.height+'px;left:'+
                    icerik.left+'px;top:'+
                    icerik.top+'px" id="'+
                    icerik.id+'" ' +
                    'class="resim_yer_tutucu tuval-ogesi" >' +
                    '<img src=\"..'+icerik.url+'\">' +
                    '</div>')
            }
            if(icerik.tur=='kategori_logo'){
                $(tuval).append('<div style ="position: absolute;display:table-cell;transform:rotate('+
                    icerik.rotation+'rad);width:'+
                    icerik.width+'px;height:'+
                    icerik.height+'px;left:'+
                    icerik.left+'px;top:'+
                    icerik.top+'px" id="'+
                    icerik.id+'" ' +
                    'class="resim_yer_tutucu tuval-ogesi kategori-logo" >' +
                    '<img width="100%" height="100%" src=\"..'+icerik.url+'\">' +
                    '</div>')
            }

        }
    }


    function fontYuksekliginiHesapla(icerik,kimin_icin){
        if(icerik.text.length==0){
            return 1
        }
        var div = document.createElement('DIV');
        div.innerHTML = icerik.text;
        div.style.position = 'absolute';
        div.style.top = '100px';
        div.style.left = '100px';
        div.style.fontFamily = icerik.font_family;
        //div.style.fontWeight = bold ? 'bold' : 'normal';
        div.style.fontSize = icerik.font_size + 'px';
        document.body.appendChild(div);

        var size = div.offsetHeight;

        document.body.removeChild(div);
        fark = size-icerik.font_size
        if(kimin_icin=='div'){
            return size/icerik.font_size
        }else{
            return fark
        }
    }


    function classAyarla(icerik){
        if(icerik.bicim=='dairesel'){
            return "txt_kutu-dairesel";
        }else{
            return "txt_kutu-tek-satir";
        }
    }


    // eğer curve parametreleri varsa dairesel yazıya dönustur
    function curveYaziyaDonustur(icerik){
        $("#"+icerik.id).empty();
        $("#"+icerik.id).append(getCircularText(icerik));
    }


    // eğer stroke değer varsa yazıya kenarliık eklenmeli
    function strokeAyarla(){
        if(icerik.stroke_size){
            return "-webkit-text-stroke-width: "+icerik.stroke_size+"px;" +
                "-webkit-text-stroke-color: "+icerik.stroke_color+";";
        }
        return;
    }





// --------------------------------------------  nesnelere SÜRÜKLENME  özeliği verelim
    $('.tuval-ogesi').draggable({
        cursor: "move",
        start: function() {
            var p           = $(this);
            var position    = p.position();
            $top_ilk        = position.top;
            $left_ilk       = position.left;
        },
        drag: function() {

        },
        stop: function() {
            //icerikArr dizisindeki kayıtlı top left i alıp son konumdaki kaymayı hesaplayalım
            $id = $(this).attr('id');
            for (var k in iceriklerArr) {
                if (iceriklerArr.hasOwnProperty(k)) {
                    //alert("Key is " + k + ", value is" + iceriklerArr[k]);
                    icerik = iceriklerArr[k];
                    if(icerik.id==$id){
                        $kayitli_top = icerik.top;
                        $kayitli_left = icerik.left;
                    }
                }
            }
            iceriklerArrGuncelleDragDropIcin(this,$top_ilk,$left_ilk,$kayitli_top,$kayitli_left);
        }
    });

// --------------------------------------------  nesnelere  BOYUTLANA BİLME
    $('.tuval-ogesi').resizable({
        handles: "n, e, s, w, ne, se, sw, nw",
        stop: function () {
            iceriklerArrGuncelleResizeablekIcin(this);
        }
    });
// --------------------------------------------  nesnelere DÖNDERİLME
    $('.tuval-ogesi').rotatable({
        wheelRotate: false,
        start: function() {
            //kayıtlı açıyı alalım
            $id = $(this).attr('id');
            for (var k in iceriklerArr) {
                if (iceriklerArr.hasOwnProperty(k)) {
                    //alert("Key is " + k + ", value is" + iceriklerArr[k]);
                    icerik = iceriklerArr[k];
                    if(icerik.id==$id){
                        $kayitli_aci = icerik.rotation;
                        $(this).css("transform","rotate("+$kayitli_aci+"rad)")
                    }
                }
            }
        },
        stop: function(event,ui) {
            iceriklerArrGuncelleRotateIcin(this);
            var p           = $(this);
            var position    = p.position();
            $top            = position.top;
            $left           = position.left;
        },
        rotate: function() {

        }
    });

    seciliNesneyiBelirle();
}

// --------------------------------------------- DRAW --END



//-------------------------------seçili nesneyi işaretle
function seciliNesneyiBelirle() {
    if (seciliOge) {
        id           = $(seciliOge).attr('id');
        $('#' + id).css("border-color", "rgba(255, 0, 0, 1)");
    }
}
function secimiKaldir(oncekiSeciliNesne){
    id= $(oncekiSeciliNesne).attr('id');
    $('#'+id).css("border-color", "rgba(0, 0, 0, 1)");
}