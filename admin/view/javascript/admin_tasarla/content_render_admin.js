// tıklanan resim kutusundaki hede ettr bu içeriklerArr içindeki kayıdı gösteriri
var hedef_icerik;
var onizlemeIceriklerArr;
var olcekleme_orani =1;


var TopFarki=0;
var LeftFarki;
var duzenleme_penceresi_oran_w = 0;
var duzenleme_penceresi_oran_h = 0;


$(document).ready(function() {


    // bu metoto admin tasarımın altındaki ön izleme için
    $('#onizleme').click(function () {
        onizlemeIceriklerArr = JSON.parse(JSON.stringify(iceriklerArr));
        // ilk çizimde goster anahtarı ekleyip true yapalımki görünsz
        for (var k in onizlemeIceriklerArr) {
            if (onizlemeIceriklerArr.hasOwnProperty(k)) {
                icerik              = onizlemeIceriklerArr[k];
                icerik.istemiyorum_chck       = "checked";
            }
        }
        ciz();
    })


    $('#etiketler').on('change','.etiket-alani',function () {
        $id = $(this).attr('hedef');
        for (var k in onizlemeIceriklerArr) {
            if (onizlemeIceriklerArr.hasOwnProperty(k)) {
                icerik              = onizlemeIceriklerArr[k];
                if(icerik.id==$id){
                    icerik.text     = $(this).val();
                    ciz();
                }
            }
        }
    })


    $('#olcekle').click(function () {
        olcekleme_orani = $("#olcekle option:selected").val();
        ciz();
    })

    $('#canvasi-indir').click(function () {
        var canvas = document.getElementById('CursorLayer')
        var images = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");;
        var imageObj = new Image();
        var obj= this;
        imageObj.onload=function () {
            obj.href = images;
            obj.download = "Tasarim.png";
        }
        imageObj.src = images;
    })

    $('#etiketler').on('click','.yazi-eklemek-istemiyorum',function () {
        var hedef = $(this).attr('hedef');
        for (var k in onizlemeIceriklerArr) {
            if (onizlemeIceriklerArr.hasOwnProperty(k)) {
                icerik              = onizlemeIceriklerArr[k];
                if(icerik.id==hedef){
                    if($(this).is(':checked')){
                        $('#etiket'+hedef).val('');
                        icerik.istemiyorum_chck = "checked";
                    }else{
                        delete icerik.istemiyorum_chck;
                    }
                }
            }
        }
        ciz();
    })

    $('#etiketler').on('click','.resim-eklemek-istemiyorum',function () {
        var hedef = $(this).attr('hedef');
        for (var k in onizlemeIceriklerArr) {
            if (onizlemeIceriklerArr.hasOwnProperty(k)) {
                icerik              = onizlemeIceriklerArr[k];
                if(icerik.id==hedef){
                    if($(this).is(':checked')){
                        icerik.istemiyorum_chck = "checked";
                    }else{
                        $('#resimbtn'+hedef).removeAttr('disabled')
                        delete icerik.istemiyorum_chck;
                    }
                }
            }
        }
        ciz();
    })


    $('.kontroller').on('click','.gizle-goster-check',function () {
        var hedef_id =  $(this).attr("hedef");
        for (var k in onizlemeIceriklerArr) {
            if (onizlemeIceriklerArr.hasOwnProperty(k)) {
                icerik              = onizlemeIceriklerArr[k];
                if(icerik.id==hedef_id){
                    if($(this).is(':checked')){
                        icerik.istemiyorum_chck = "checked";
                    }else{
                        delete icerik.istemiyorum_chck;
                    }
                }
            }
        }
        ciz();
    })

    $('#etiketler').on('click','.txt_duzenle',function () {
        var hedef_id =  $(this).attr("hedef");
        for (var k in onizlemeIceriklerArr) {
            if (onizlemeIceriklerArr.hasOwnProperty(k)) {
                icerik              = onizlemeIceriklerArr[k];
                if(icerik.id==hedef_id){
                    // değişken diğer js dosyasında işlenecek
                    duzenlenecek_icerik = icerik;
                    $('#tab-duzenle').show();
                    $('#tab-duzenle a').trigger('click')
                    kayitliAyarlariAl()// bu diğer dosyada
                }
            }
        }

    })

    $('#tab-duzenle').hide();
    $('#tab-ekle a').click(function () {
        $('#tab-duzenle').hide();
    })



});

function ciz(){
    etiketAlaniniOlustur(onizlemeIceriklerArr,'etiketler');
    resimEklemeDugmeleriniOlustur(onizlemeIceriklerArr,'etiketler');
    $('#cnv_container').empty();
    $('#cnv_container').append(canvasRender(onizlemeIceriklerArr,$('#tuval').width(),$('#tuval').height()));
    resimEklemeDugmelerineTiklaninca();
}

function fontBoyuntunuHesapla(icerik){

    /* DİKKAT  if İPTAL EDİLDİ. SADECE SİPARİŞ DÜZEÜNLEME İÇİN
    if(icerik.orjinal_font_size!=undefined){
        icerik.font_size = icerik.orjinal_font_size;
    }else{
        icerik.orjinal_font_size = icerik.font_size;
        icerik.orjinal_top = icerik.top;
        icerik.orjinal_height = icerik.height;
    }
    min_size = 23;


    degistir=true;
    yeni_font_size = icerik.font_size;


    if(icerik.text_uzun_hali!=undefined){
        icerik.text     = icerik.text_uzun_hali;
    }


    while(degistir){
        $('body #meassure').remove();
        this.item = $('<span id="meassure">'+ icerik.text+'</span>');
        this.item.css({
            position: 'absolute',
            left: '-1000px',
            fontSize:yeni_font_size+'px',
            fontFamily:icerik.font_family,
            top: '-1000px'
        });
        $('body').append(this.item);
        mesure_genisligi = $(this.item).width();
        if(mesure_genisligi>icerik.width){
            //alert("Küçülmesi lazım");
            if(min_size<yeni_font_size){
                yeni_font_size--;
            }else{
                // eğer font minimum seviyedeyse fakat karakter sayısı sınırları aşıyorsa falalığı kırpalım
                karakter_sayisi     = icerik.text.length;
                karakter_genisligi  = mesure_genisligi / karakter_sayisi;
                sigabilecek_kar_sayisi = Math.floor(icerik.width/karakter_genisligi)
                icerik.text = icerik.text.slice(0,sigabilecek_kar_sayisi)
                yeni_font_size++;
            }

            icerik.font_size = yeni_font_size;
        }else{
            degistir        = false;
        }
    }
     */

}

function daireselYaziIcinfontBoyuntunuHesapla(icerik){
    $yari_cap           = icerik.width/2;
    //çevresi 2 x π x r
    $dairenin_cevresi   = 2*Math.PI*$yari_cap*0.6;

    if(icerik.orjinal_font_size!=undefined){
        icerik.width                = icerik.orjinal_width;
        icerik.font_size            = icerik.orjinal_font_size;
    }else{
        icerik.orjinal_font_size    = icerik.font_size;
        icerik.orjinal_width        = icerik.width;
    }


    min_size        = 20;

    degistir        = true;
    yeni_font_size  = icerik.font_size;
    while(degistir){
        $('body #meassure').remove();
        this.item = $('<span id="meassure">'+icerik.text+'</span>');
        this.item.css({
            position: 'absolute',
            left: '-1000px',
            fontSize:yeni_font_size+'px',
            fontFamily:icerik.font_family,
            top: '-1000px'
        });
        $('body').append(this.item);
        mesure_genisligi = $(this.item).width();
        if(mesure_genisligi>$dairenin_cevresi){
            //alert("Küçülmesi lazım");
            if(min_size<yeni_font_size){
                yeni_font_size--;
            }else{
                // eğer font minimum seviyedeyse fakat karakter sayısı sınırları aşıyorsa falalığı kırpalım
                karakter_sayisi     = icerik.text.length;
                karakter_genisligi  = mesure_genisligi / karakter_sayisi;
                sigabilecek_kar_sayisi = Math.floor($dairenin_cevresi/karakter_genisligi)
                icerik.text = icerik.text.slice(0,sigabilecek_kar_sayisi)
            }
            icerik.font_size = yeni_font_size;
            icerik.width     = icerik.width + (icerik.orjinal_font_size-icerik.font_size)*0.5
        }else{
            degistir = false;
        }
    }
}

function resimEklemeDugmeleriniOlustur( onizlemeIceriklerArr,etiketler ){
    sayac=0;
    for (var k in onizlemeIceriklerArr) {
        icerik = onizlemeIceriklerArr[k];
        if (icerik) {
            if (icerik.tur == "resim_yer_tutucu") {
                sayac++;
                $etiket = "Resim"+sayac;
                $tr = "<tr>" +
                    "<td>" +
                    "<div type=\"text\" style=\"margin-right:20px\" hedef=\""+icerik.id+"\" " +
                    ackapaAyarla(icerik.istemiyorum_chck) +
                    " class=\"resim-btn btn btn-primary\" id=\"resimbtn"+icerik.id+"\" >"
                    + $etiket
                    +  "</div> " +
                    "</td>" +
                    "<td colspan='2'>" +
                    "<input type=\"checkbox\" "+ icerik.istemiyorum_chck +"  id=\"chckbox"+icerik.id+"\" hedef=\""+icerik.id+"\" class=\"resim-eklemek-istemiyorum\" >" +
                    "<label for=\"chckbox"+icerik.id+"\">Gizle / Göster</lable>"+
                    "</td>" +
                    "</tr>";
                $('#'+etiketler).append($tr);
            }
        }
    }

    function ackapaAyarla(durum){
        if(typeof durum=="undefined"){
            return "disabled";
        }
        return "";
    }
}

function etiketAlaniniOlustur(onizlemeIceriklerArr,etiketler) {
    $('#'+etiketler).empty();
    sayac =0;
    for (var k in onizlemeIceriklerArr) {
        icerik = onizlemeIceriklerArr[k];
        if (icerik) {
            if (icerik.tur == "txt_kutu") {
                $etiket = "Etiket Alanı "+k;
                sayac++;
                $tr = "<tr>" +
                    "<td style='position: relative'>" +
                    "<span>" + sayac + " " +icerik.karakter_limiti + " karakter</span>"+
                    "<input type=\"text\" hedef=\""+icerik.id+"\" " + " value= \"" + tirnakVbSorunlar(icerik.text) + "\"" + "id=\"etiket"+icerik.id+"\""+
                    ackapaAyarla(icerik.istemiyorum_chck) +
                    " class=\"etiket-alani form-control\" maxlength =\"" + icerik.karakter_limiti + "\" placeholder=\"\">" +
                    "</td>" +
                    "<td>" +
                    "<input type=\"checkbox\" "+  icerik.istemiyorum_chck  +" id=\"chckbox"+icerik.id+"\" hedef=\""+icerik.id+"\" class=\"yazi-eklemek-istemiyorum\" >" +
                    "<label for=\"chckbox"+icerik.id+"\">Gizle / Göster</lable>"+
                    "</td>" +
                    "<td>" +
                        "<div class='btn btn-primary txt_duzenle' hedef='"+icerik.id+"'>" +
                            "<i class=\"fa fa-pencil-square-o fa-2x \">" +
                            "</i>" +
                        "</div>" +
                    "</td>"+
                    "</tr>";
                $('#'+etiketler).append($tr);
            }

            if (icerik.tur == "cs_txt_kutu") {
                $etiket = "Etiket Alanı "+k;
                sayac++;
                text_align = "text-align: center";
                $tr = "<tr>" +
                    "<td>" +
                    "<div style=\"border: 1px solid #ccc;box-shadow: 1px solid #ccc;text-align:"+icerik.text_align+"\">"+
                    "<textarea type=\"text\" style=\"border: none;" +
                    "box-shadow: none;" +
                    "text-align: "+icerik.text_align+";" +
                    "font-size: "+(icerik.font_size*.80)+"px;" +
                    "font-family: "+icerik.font_family+";" +
                    "width: "+icerik.width+"px;" +
                    "\"" +
                    "hedef=\""+icerik.id+"\" id=\"etiket"+icerik.id+"\""+
                    ackapaAyarla(icerik.istemiyorum_chck) +
                    " class=\"etiket-alani form-control\" placeholder=\" Yazı " + sayac + "\">"
                    + csTirnakVbSorunlar(icerik) +
                    "</textarea>" +
                    "</div>"+
                    "</td>"+
                    "<td>" +
                    "<div class='onaylama-yeri'><i class=\"fa fa-check-square fa-2\"></i></div>"+
                    "</td>"+
                    "</tr>"+
                    "<tr >" +
                    "<td colspan='3'>" +
                    "<input type=\"checkbox\" "+  icerik.istemiyorum_chck  +" id=\"chckbox"+icerik.id+"\" hedef=\""+icerik.id+"\" class=\"yazi-eklemek-istemiyorum\" >" +
                    "<label  for=\"chckbox"+icerik.id+"\">Yazı eklemek istemiyorum</lable>"+
                    "</td>"
                "</tr>";
                $('#'+etiketler).append($tr);


            }

            if (icerik.tur == "zemin") {
                $tr = "<tr>" +
                    "<td colspan='3'>" +
                    "<input hedef=\""+icerik.id+"\" " +
                    "class=\"gizle-goster-check\" " +
                    "type=\"checkbox\"" + gizleGosterAyarla(icerik.istemiyorum_chck) + "> Zemini gizle/göster"+
                    "</td>"+
                    "</tr>";
                $('#'+etiketler).append($tr);
            }
        }
    }


    function csTirnakVbSorunlar(icerik) {
        text = icerik.text_uzun_hali
        if(text!=undefined){
            newTemp = text.replace(/"/g, "&quot;");
        }

        if(icerik.text!=undefined){
            newTemp = icerik.text.replace(/"/g, "&quot;");
        }

        // tırnak temizlendikten sonra
        // yazının genişliğini ölçmek için div ekleyelim
        $("#container").prepend("<div id='Wolcum' style=\"z-index: 9999; position: fixed;top:200px;left:10px;border: 5px solid #ccc\"></div>")
        $("#Wolcum").css('font-family',icerik.font_family)
        $("#Wolcum").css('font-size',icerik.font_size+"px")
        $("#Wolcum").empty();

        var satirlar = newTemp.split('\n');
        var yeni_satirlar = ['']
        yeni_Satir_no =0;
        $.each(satirlar, function( index, value ) {
            if(value.length==0 && index<satirlar.length-1){
                yeni_satirlar[yeni_Satir_no]='';
                yeni_Satir_no++;
            }
            for(var i = 0;i<value.length;i++){
                $("#Wolcum").html($("#Wolcum").html()+value.charAt(i))
                yeni_satirlar[yeni_Satir_no] = $("#Wolcum").html();
                if($("#Wolcum").innerWidth()>icerik.width){
                    $("#Wolcum").empty();
                    if(i==value.length-1){
                        continue;
                    }
                    yeni_Satir_no++;
                    if( yeni_satirlar[yeni_Satir_no]!=undefined){
                        yeni_satirlar[yeni_Satir_no] =  value.charAt(i) + yeni_satirlar[yeni_Satir_no]
                    }else {
                        yeni_satirlar[yeni_Satir_no] =  value.charAt(i)
                    }
                }
            }
            $("#Wolcum").empty()
            if(value.length>0){
                yeni_Satir_no++;
            }
        });

        console.log(yeni_satirlar)
        newTemp='';
        $.each(yeni_satirlar, function( index, value ) {
            value = value.replace(/\n/g,'');
            value = value.replace(/\r/g,'');
            newTemp += value+'\r\n';
        })



        icerik.text=newTemp;
        return newTemp;
    }



    function tirnakVbSorunlar(text) {
        newTemp = text.replace(/"/g, "&quot;");
        return newTemp;
    }


    function ackapaAyarla(durum){
        if(typeof durum=="undefined"){
            return "disabled";
        }
        return "";
    }
}

function gizleGosterAyarla(durum){
    if(typeof durum!="undefined"){
        return "checked ";
    }else{
        return ;
    }
}

function resimTutucularaTiklaninca(){
    $('.tuval-ogesi').click(function () {
        var hedef_id =  $(this).attr('id');
        $('.resim-btn').each(function () {
            if( $(this).attr('hedef') == hedef_id){
                $(this).trigger("click");
            }
        })
    })
}

function resimEklemeDugmelerineTiklaninca(){
    // belirtece tıklanınca input açılsın
    $('.resim-btn').click(function () {
        if($(this).attr('disabled')!='disabled'){
            resim_kutu_hedef_id  = $(this).attr('hedef')
            for (var k in onizlemeIceriklerArr) {
                if (onizlemeIceriklerArr.hasOwnProperty(k)) {
                    var icerik              = onizlemeIceriklerArr[k];
                    if(icerik.id==resim_kutu_hedef_id){
                        hedef_icerik = icerik;
                    }
                }
            }
            resimEkle(); // harici js dosyasında
        }
    })
}

function belirteclereTiklanincaGirisYapilsin(){
    // belirtece tıklanınca input açılsın
    $('.tuval-ogesi').click(function () {
        var hedef_id =  $(this).attr('id');
        $('.etiket-alani').each(function () {
            if( $(this).attr('hedef') == hedef_id){
                // girilen metnin karakter limiti için iligli içeriği bulalım
                for (var k in onizlemeIceriklerArr) {
                    if (onizlemeIceriklerArr.hasOwnProperty(k)) {
                        var icerik              = onizlemeIceriklerArr[k];
                        if(icerik.id==hedef_id){
                            hedef_icerik = icerik;
                        }
                    }
                }
                //-------------------

                //var etiket = prompt();
                var etiket=''
                var obj= $(this);
                $('#dialog-girdi').val(' ');
                if(typeof hedef_icerik.karakter_limiti!='undefined'){
                    $('#dialog-metin').html("İstediğiniz metni yazın. (" + hedef_icerik.karakter_limiti+ " karakter)  ")
                    $( "#dialog" ).dialog();
                    $('#dialog-girdi').attr("maxlength",hedef_icerik.karakter_limiti);
                    $('#dialog-girdi').val(hedef_icerik.text);
                    $('#dialog-tamam').click(function () {
                        etiket = $('#dialog-girdi').val();
                        if(etiket.length>hedef_icerik.karakter_limiti){
                            etiket = etiket.substring(0,hedef_icerik.karakter_limiti);
                        }
                        obj.val(etiket);
                        obj.trigger('change');
                        $( "#dialog" ).dialog("close");
                    })
                }


            }
        })
    })
}

function etiketBelirtecleriniOlustur(iceriklerArr,tuval){
    var CursorLayer_w_attr   = $(tuval).find('#CursorLayer').attr('width');
    var canvas_genisligi     = $(tuval).find('#CursorLayer').width();
    var oran_w               =  canvas_genisligi/CursorLayer_w_attr
    var CursorLayer_h_attr   = $(tuval).find('#CursorLayer').attr('height');
    var canvas_yuksekligi    = $(tuval).find('#CursorLayer').height();
    var oran_h               = canvas_yuksekligi/CursorLayer_h_attr

    for (var k in iceriklerArr){
        if (iceriklerArr.hasOwnProperty(k)) {
            //alert("Key is " + k + ", value is" + iceriklerArr[k]);
            icerik = iceriklerArr[k];
            if(icerik.tur=='zemin'){
                // zemin zaten tuvalde olacak dic olarak eklenemeli ön yüze
            }
            if(icerik.tur=="resim_yer_tutucu"){
                $(tuval).append('<div style ="position: absolute;transform:rotate('+icerik.rotation+'rad);width:'+
                    icerik.width*oran_w+'px;height:'+
                    icerik.height*oran_h+'px;left:'+
                    icerik.left*oran_w+'px;top:'+
                    icerik.top*oran_h+'px" id="'+
                    icerik.id+'" ' +
                    'class="resim_yer_tutucu tuval-ogesi" >' +
                    '<i class="fa fa-camera fa-4x"></i></div>')
            }
            if(icerik.tur=="txt_kutu"){
                $(tuval).append('<div  style ="position: absolute;transform:rotate('+icerik.rotation+'rad);width:'+
                    icerik.width*oran_w+'px;height:'+
                    fontYuksekliginiHesapla(icerik)*oran_h+'px;left:'+
                    icerik.left*oran_w+'px;color:'+
                    icerik.color+';font-size:'+
                    icerik.font_size+'px;font-family:'+
                    icerik.font_family+';text-align:' +
                    icerik.text_align+';'+icerik.golge_stili+';color:' +
                    icerik.color+';top:'+
                    icerik.top_yeni_top*oran_h+'px'+ '" id="'+
                    icerik.id+'" ' + //txtGizleGoster(icerik.istemiyorum_chck) +
                    'class="'+classAyarla(icerik)+'">'
                    +
                    '</div>')
            }

            if(icerik.tur=="cs_txt_kutu"){
                $(tuval).append('<div  style ="position: absolute;transform:rotate('+icerik.rotation+'rad);width:'+
                    icerik.width*oran_w+'px;height:'+
                    icerik.height*oran_h+'px;left:'+
                    icerik.left*oran_w+'px;color:'+
                    icerik.color+';font-size:'+
                    icerik.font_size+'px;font-family:'+
                    icerik.font_family+';text-align:' +
                    icerik.text_align+';'+icerik.golge_stili+';color:' +
                    icerik.color+';top:'+
                    icerik.top*oran_h+'px'+ '" id="'+
                    icerik.id+'" ' + txtGizleGoster(icerik.istemiyorum_chck) +
                    'class="'+classAyarla(icerik)+'">'
                    +
                    '<div id="kose_tutucu"></div></div>')
            }
        }
    }
    $('.tuval-ogesi').hide();
    //$('.tuval-ogesi').css('border','#000 solid 1px')
}

function classAyarla(){
    if(icerik.bicim=='dairesel'){
        return " txt_kutu tuval-ogesi txt_kutu-dairesel";
    }else if(icerik.bicim=='txt_kutu'){
        return "txt_kutu tuval-ogesi txt_kutu-tek-satir";
    }else if(icerik.tur=='cs_txt_kutu'){
        return "txt_kutu tuval-ogesi txt_kutu-tek-satir";
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////  RENDER ///////////////////////////////////////

function canvasRender(onizlemeIceriklerArr,genislik,yukseklik){
    var canvas = document.createElement('canvas');
    canvas.id     = "CursorLayer";
    if(onizlemeIceriklerArr[0].tur=='zemin'){
        canvas.width  = onizlemeIceriklerArr[0].width*olcekleme_orani;
        canvas.height = onizlemeIceriklerArr[0].height*olcekleme_orani;
    }else{
        canvas.width  = genislik*olcekleme_orani;
        canvas.height = yukseklik*olcekleme_orani;
    }

    var ctx = canvas.getContext("2d");
    ctx.setTransform(olcekleme_orani, 0, 0, olcekleme_orani, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // zeminden önce çizilmesi gereken varmı
    var zeminden_onceki_dolu_item_sayisi =0;
    var zeminden_sonraki_dolu_item_sayisi =0;
    for (var z_o_kontrol in onizlemeIceriklerArr){
        if (onizlemeIceriklerArr.hasOwnProperty(z_o_kontrol)) {
            var icerik = onizlemeIceriklerArr[z_o_kontrol];
            if (icerik.tur == "resim_yer_tutucu") {
                if (typeof icerik.zeminin_ustunde != 'undefined') {
                    if (icerik.zeminin_ustunde == 0) {
                        if(typeof  icerik.src!= 'undefined'){
                            zeminden_onceki_dolu_item_sayisi++;
                        }
                    }else{
                        if(typeof icerik.src!= 'undefined'){
                            zeminden_sonraki_dolu_item_sayisi++;
                        }
                    }
                }
            }
        }
    }




    // -------------------------------------------ZEMİNDEN (altıntakiler) öncekileri çizilecek resim tutucular

    for (var z_o in onizlemeIceriklerArr){
        if (onizlemeIceriklerArr.hasOwnProperty(z_o)) {
            var icerik = onizlemeIceriklerArr[z_o];
            if (icerik.tur == "resim_yer_tutucu") {
                if(typeof icerik.istemiyorum_chck!='undefined'){
                    if (typeof icerik.zeminin_ustunde != 'undefined') {
                        if (icerik.zeminin_ustunde == 0) {
                            var imageObj = new Image();
                            imageObj.onload = function (data) {
                                ctx.setTransform(olcekleme_orani, 0, 0, olcekleme_orani, 0, 0);;
                                ctx.save();
                                ctx.translate(data.target.icerik.left + data.target.icerik.width * .5, data.target.icerik.top + data.target.icerik.height * .5);
                                ctx.rotate(data.target.icerik.rotation);
                                ctx.drawImage(data.target, -data.target.icerik.width * .5, -data.target.icerik.height * .5);
                                console.log("Öncekiler yüklendi")
                                zeminiYukle();
                            }
                            imageObj.src = icerik.src;
                            imageObj.icerik = icerik;
                        }
                    }
                }else{
                    zeminiYukle();
                }
            }
        }
    }
    //---------------------------------------------------------

    // -------------------------------------------------------- ----------  ZEMİN
    var zemin_yuklendi = false;
    function zeminiYukle(){
        var icerik              = onizlemeIceriklerArr[0];
        if(icerik.tur=='zemin'){
            if(typeof icerik.istemiyorum_chck!='undefined'){
                var imageObj        = new Image();
                imageObj.onload     = function (data) {
                    ctx.setTransform(olcekleme_orani, 0, 0, olcekleme_orani, 0, 0);
                    ctx.save();
                    ctx.drawImage(data.target, 0, 0);
                    zemin_yuklendi = true;
                    console.log("Zemin Yüklendi")
                    zemindenSonrakiResimleriYukle();

                    //eğer resimdek sonra dolu item yoksa textkutyazdir fonsiyonu çağrılmaz
                    // o yüzden item yoksa çalışmalı
                    if(zeminden_sonraki_dolu_item_sayisi==0){
                        txtKutulariyazalim();
                    }
                }
                imageObj.src = icerik.src;
                imageObj.icerik= icerik;
            }else{
                if(zeminden_sonraki_dolu_item_sayisi==0){
                    txtKutulariyazalim();
                }
            }
        }
    }
    //alert(zeminden_onceki_item_sayisi)
    if(zeminden_onceki_dolu_item_sayisi==0){
        zeminiYukle();
    }
    //-----------------------------------------



    // ------------------------------------------------------ ZEMİNDEN (üstündekiler) sonra çizilecek resim tutucular
    function zemindenSonrakiResimleriYukle(){
        var sayac =0;
        var imgArray = new Array();
        for (var z_s in onizlemeIceriklerArr){
            if (onizlemeIceriklerArr.hasOwnProperty(z_s)) {
                var icerik = onizlemeIceriklerArr[z_s];
                if(typeof icerik.istemiyorum_chck!='undefined'){
                    if (icerik.tur == "resim_yer_tutucu") {
                        if (typeof icerik.zeminin_ustunde != 'undefined') {
                            if (icerik.zeminin_ustunde == 1) {
                                imgArray[sayac] = new Image();
                                imgArray[sayac].onload = function (data) {
                                    ctx.setTransform(olcekleme_orani, 0, 0, olcekleme_orani, 0, 0);
                                    ctx.save();
                                    ctx.translate(data.target.icerik.left + data.target.icerik.width * .5, data.target.icerik.top + data.target.icerik.height * .5);
                                    ctx.rotate(data.target.icerik.rotation);
                                    ctx.drawImage(data.target, -data.target.icerik.width * .5, -data.target.icerik.height * .5);
                                    console.log("Sonrakiler yüklendi")
                                    txtKutulariyazalim();
                                }
                                imgArray[sayac].src = icerik.src;
                                imgArray[sayac].icerik = icerik;
                                sayac++;
                            }
                        }
                    }
                }else{
                    txtKutulariyazalim();
                }
            }
        }
    }
    //---------------------------------------------------------




    // ---------------------yazıları yazalım --------------------------
    function  txtKutulariyazalim(){
        for (var k in onizlemeIceriklerArr){
            ctx.setTransform(olcekleme_orani, 0, 0, olcekleme_orani, 0, 0);
            ctx.save();
            if (onizlemeIceriklerArr.hasOwnProperty(k)) {
                var icerik = onizlemeIceriklerArr[k];
                if(typeof icerik.istemiyorum_chck!='undefined'){
                    delete golgeParam;
                    if(icerik.golge_stili){
                        golgeParam = cssParseEt(icerik.golge_stili);
                    }
                    if(icerik.tur=="txt_kutu"){
                        if(icerik.bicim=='duz'){
                            var $x              = 0;
                            var $y              = 0;
                            var font_style = icerik.font_style=='italic'?'italic':'';
                            var font_weight = icerik.font_weight=='bold'?'bold':'';
                            //var text_decoration = icerik.text_decoration=='underline'?'underline':'';
                            ctx.font            = font_style+' '+font_weight+' '+icerik.font_size+"px " + icerik.font_family;
                            hizalama_payi       = 0;
                            if(icerik.text_align=='center'){
                                ctx.textAlign   = icerik.text_align;
                                $x              = 0;
                                $y              = -icerik.font_size*.22;
                                hizalama_payi   =icerik.width *.5;
                                ctx.translate(icerik.left+hizalama_payi,icerik.top);
                            }else if(icerik.text_align=='left'){
                                ctx.textAlign   = icerik.text_align;
                                $x              = -icerik.width*0.5;
                                $y              = -icerik.font_size*.22;
                                hizalama_payi   = icerik.width *.5;
                                ctx.translate(icerik.left+hizalama_payi,icerik.top);
                            }else if(icerik.text_align=='right'){
                                ctx.textAlign   = icerik.text_align;
                                $x              = icerik.width*0.5;
                                $y              = -icerik.font_size*.22;
                                hizalama_payi   = icerik.width *.5;
                                ctx.translate(icerik.left+hizalama_payi,icerik.top);
                            }
                            ctx.rotate(icerik.rotation);
                            ctx.lineWidth =0.01;
                            ctx.strokeStyle ='';
                            ctx.lineJoin="round";
                            if(icerik.stroke_size>0){
                                ctx.lineWidth   = icerik.stroke_size;
                                ctx.strokeStyle = icerik.stroke_color;
                            }
                            ctx.strokeText(icerik.text,$x,($y+parseInt(icerik.font_size)));
                            if(typeof golgeParam!=="undefined"){
                                ctx.shadowOffsetY   =
                                    golgeParam[0]*Math.sin(icerik.rotation) + golgeParam[1]*Math.cos(icerik.rotation);
                                ctx.shadowOffsetX   =
                                    golgeParam[0]*Math.cos(icerik.rotation) - golgeParam[1]*Math.sin(icerik.rotation);
                                ctx.shadowBlur      = golgeParam[2];
                                ctx.shadowColor     = golgeParam[3];
                            }
                            ctx.fillStyle           = icerik.color;
                            ctx.fillText(icerik.text,$x,($y+parseInt(icerik.font_size)));
                        }else{
                            // ----------------------------------------------------------DAİRESEL ETİkET KUTULARI
                            var img                 = getCircularText(icerik);
                            ctx.drawImage(img,icerik.left,icerik.top);
                        }
                    }


                    if(icerik.tur=="cs_txt_kutu"){

                        var CursorLayer_w_attr   = $('#cnv_container').find('#CursorLayer').attr('width');
                        var canvas_genisligi     = $('#cnv_container').find('#CursorLayer').width();
                        var oran_w               =  canvas_genisligi/CursorLayer_w_attr
                        var CursorLayer_h_attr   = $('#cnv_container').find('#CursorLayer').attr('height');
                        var canvas_yuksekligi    = $('#cnv_container').find('#CursorLayer').height();
                        var oran_h               = canvas_yuksekligi/CursorLayer_h_attr

                        if(TopFarki==0 || TopFarki=='sifirla'){
                            $('.tuval-ogesi').show();
                            TopFarki  =  Math.abs($('#kose_tutucu').parent().parent().offset().top - $('#kose_tutucu').offset().top);
                            LeftFarki =  Math.abs($('#kose_tutucu').parent().parent().offset().left - $('#kose_tutucu').offset().left);
                            console.log("$(this).offset().top   " + $('#kose_tutucu').offset().top);
                            console.log("$(this).parent().left   " + $('#kose_tutucu').offset().left);
                            console.log("TopFarki    " + TopFarki);
                            console.log("LeftFarki    " + LeftFarki);
                            if(TopFarki==0){
                                $('.tuval-ogesi').hide();
                            }
                        }

                        if(duzenleme_penceresi_oran_w!=0){
                            oran_h = duzenleme_penceresi_oran_h;
                            oran_w = duzenleme_penceresi_oran_w;
                        }


                        icerik.text = (icerik.text==undefined?'':icerik.text)
                        var lines = icerik.text.split('\n');
                        for(var i = 0;i < lines.length;i++){
                            ctx.setTransform(1, 0, 0, 1, 0, 0);
                            icerik_text = lines[i];
                            var $x              = 0;
                            var $y              = 0;
                            var font_style = icerik.font_style=='italic'?'italic':'';
                            var font_weight = icerik.font_weight=='bold'?'bold':'';
                            //var text_decoration = icerik.text_decoration=='underline'?'underline':'';
                            ctx.font            = font_style+' '+font_weight+' '+icerik.font_size+"px " + icerik.font_family;
                            hizalama_payi       = 0;

                            if(icerik.text_align=='center'){
                                ctx.textAlign   = icerik.text_align;
                                $x              = icerik.width*.5;
                                $y              = icerik.font_size*(i+1);
                                $y              = parseInt($y) + parseInt(icerik.font_height)*(i+1)
                                ctx.translate(LeftFarki/oran_w , TopFarki/oran_h);
                            }else if(icerik.text_align=='left'){
                                ctx.textAlign   = icerik.text_align;
                                $x              = 0;
                                $y              = icerik.font_size*(i+1);
                                $y              = parseInt($y) + parseInt(icerik.font_height)*(i+1)
                                ctx.translate(LeftFarki/oran_w , TopFarki/oran_h);
                            }else if(icerik.text_align=='right'){
                                ctx.textAlign   = icerik.text_align;
                                $x              = icerik.width;
                                $y              = icerik.font_size*(i+1);
                                $y              = parseInt($y) + parseInt(icerik.font_height)*(i+1)
                                ctx.translate(LeftFarki/oran_w , TopFarki/oran_h);
                            }

                            ctx.rotate(icerik.rotation);
                            ctx.lineWidth =0.01;
                            ctx.strokeStyle ='';
                            ctx.lineJoin="round";
                            if(icerik.stroke_size>0){
                                ctx.lineWidth   = icerik.stroke_size;
                                ctx.strokeStyle = icerik.stroke_color;
                            }
                            ctx.strokeText(icerik.text,$x,($y+parseInt(icerik.font_size)));
                            if(typeof golgeParam!=="undefined"){
                                ctx.shadowOffsetY   =
                                    golgeParam[0]*Math.sin(icerik.rotation) + golgeParam[1]*Math.cos(icerik.rotation);
                                ctx.shadowOffsetX   =
                                    golgeParam[0]*Math.cos(icerik.rotation) - golgeParam[1]*Math.sin(icerik.rotation);
                                ctx.shadowBlur      = golgeParam[2];
                                ctx.shadowColor     = golgeParam[3];
                            }
                            ctx.fillStyle           = icerik.color;
                            ctx.fillText(icerik_text,$x,$y);
                        }

                    }

                }
            }
            ctx.restore();
        }
    }
    // ---------------------yazıları yazalım --SON------------------------
    return canvas;
}

function cssParseEt(golge_stili){
    //    text-shadow: 18px 18px 14px rgba(150, 150, 150, 1);
    var res = golge_stili.match(/[0-9]*px/g);
    for (var index = 0; index < res.length; index++) {
        res[index] =  res[index].replace("px", "");
    }

    var result = golge_stili.replace(/ /g, "");
    var partsRGBA = result.match(/rgba\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(\2)\s*,\s*(-?\d+)(\2)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/);
    return res.concat(partsRGBA);
}

function fontYuksekliginiHesapla(icerik){
    //ilk girişte ilk renderde test olmadığına göre
    if(icerik.text.length==0){
        icerik.top_yeni_top = icerik.top
        return icerik.font_size*0.9
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
    //if(kiminicin=='editor'){
    //icerik.top_yeni_top = icerik.top
    //kiminicin='';// editordeki sürükle bıraktan sonra  bu çalışmamalı çünkü fark yok icerik.top-fark/2
    //}else{
    icerik.top_yeni_top = icerik.top-fark/2
    icerik.fark         = (fark/2)*1.2;
    //}

    //console.log(size,icerik.font_size,fark)
    return size*0.8
}

///////////////////////////    ÖNYÜZDEKİ FONT RENK KONUM DEĞİŞTRME EKRANI İÇİN   //////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

var editorIceriklerArr  = new Array();
var editor_hedef_txt_id;// düzenleme düğmesine tıklalan text kutunun id si
var intervalID ;
var konum_degisti;//herhangi bir nesnenin konumu değişirse mouseout un işlmeisi için.. Yoksa sürekli işliyor
$(document).ready(function() {
    // Editör ekranını modal olarak açalım
    $('#duzenle').click(function(){
        $('#txtFontRenkKonumModal').modal('show');
        jQuery.each( onizlemeIceriklerArr, function( i, val ) {
            editorIceriklerArr[i] = jQuery.extend(true,{}, val);
        });
        editor_hedef_txt_id = $(this).attr('hedef_txt_kutu');
        $('#txtFontRenkKonumModal').on('shown.bs.modal', function() {
            editorTuvalineCiz(editorIceriklerArr);
            $('#editor-canvas #'+editor_hedef_txt_id).css('border','#00FF00 solid 1px');
        })
        fontListesiniYenidenAnlandir();
        hedefKutUdakiYaziyaGoreFontKutusunuYenile();
    })
    //tıklanan öğenin borderlerini yeşille
    $('#editor-canvas').on('mousedown','.tuval-ogesi', function () {
        kiminicin = 'editor'
        if(!$(this).hasClass('resim_yer_tutucu')) {
            $('#editor-canvas .tuval-ogesi').css('border', 'rgba(254, 254, 254, 0.31) solid 1px')
            $('#editor-canvas .tuval-ogesi').css("zIndex", 10)
            $(this).css('border', '#00FF00 solid 1px');
            $('#editor-canvas .resim_yer_tutucu').css('border', 'none')
            editor_hedef_txt_id = $(this).attr('id');
            $(this).css("zIndex", 99)
            hedefKutUdakiYaziyaGoreFontKutusunuYenile();
            //çılı kutuları taşırken kayma oluyor biraz düzeltelim
            if ($(this).css('transform') != 'undefinet') {
                function getRotationDegrees(obj) {
                    var matrix = obj.css("-webkit-transform") ||
                        obj.css("-moz-transform") ||
                        obj.css("-ms-transform") ||
                        obj.css("-o-transform") ||
                        obj.css("transform");
                    if (matrix !== 'none') {
                        var values = matrix.split('(')[1].split(')')[0].split(',');
                        var a = values[0];
                        var b = values[1];
                        var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
                    } else {
                        var angle = 0;
                    }
                    return (angle < 0) ? angle + 360 : angle;
                }

                angle1 = getRotationDegrees($(this));
                dik_top = parseInt($(this).css("top").replace('px', ''));
                genislik = $(this).height();
                yeni_top = dik_top - genislik * Math.tan(angle1 * Math.PI / 180);
                $(this).css("top", yeni_top + 'px')
            }
        }
    })

    // tuvalin üstüne gelince öğeler belirginleşsin
    $('#editor-canvas').mouseover(function () {
        $('#editor-canvas .tuval-ogesi').each(function (index) {
            if($(this).attr('id')!=editor_hedef_txt_id){
                if(!$(this).hasClass('resim_yer_tutucu')){
                    $(this).css('border','rgba(254, 254, 254, 0.31) solid 1px')
                }
            }
        })
    })



    // FONT SEÇİLDİYSE FONTU DEĞİŞTİR
    $('#editor-araclar').on('change','#editor-font-listesi',function () {
        $id = editor_hedef_txt_id;
        for (var k in editorIceriklerArr) {
            if (editorIceriklerArr.hasOwnProperty(k)) {
                icerik              = editorIceriklerArr[k];
                if(icerik.id==$id){
                    icerik.font_family     = $( "#editor-font-listesi option:selected" ).val();
                    if(icerik.bicim == 'duz'){
                        fontBoyuntunuHesapla(icerik);
                    }else{
                        daireselYaziIcinfontBoyuntunuHesapla(icerik);
                    }
                    //hedefKutUdakiYaziyaGoreFontKutusunuYenile(icerik.text)
                    editorTuvalineCiz(editorIceriklerArr);
                    $('#editor-canvas #'+editor_hedef_txt_id).css('border','#00FF00 solid 1px');
                }
            }
        }
        //$('#editor-font-listesi').css('font-family',$( "#editor-font-listesi option:selected" ).val())
    })

    // RENK SEÇİLDİYSE FONTU DEĞİŞTİR
    $('#editor-araclar').on('click','.renk_kutusu',function () {
        renk_kodu = $(this).attr('reng_kodu');
        $id = editor_hedef_txt_id;
        for (var k in editorIceriklerArr) {
            if (editorIceriklerArr.hasOwnProperty(k)) {
                icerik              = editorIceriklerArr[k];
                if(icerik.id==$id){
                    icerik.color     = renk_kodu;
                    if(icerik.bicim == 'duz'){
                        fontBoyuntunuHesapla(icerik);
                    }else{
                        daireselYaziIcinfontBoyuntunuHesapla(icerik);
                    }
                    editorTuvalineCiz(editorIceriklerArr);
                    $('#editor-canvas #'+editor_hedef_txt_id).css('border','#00FF00 solid 1px');
                }
            }
        }
    })

    //KONUM DÜĞMELERİNE TIKLANINCA
    var kaydirma_zamani = 100;
    $('#editor-araclar').on('mousedown','.yon-dugmeleri',function () {
        konum_degisti = 1
        yatay = parseInt($(this).attr('yatay'));
        dikey = parseInt($(this).attr('dikey'));
        intervalID = setInterval(function(){
            dik_top =$('#editor-canvas #'+editor_hedef_txt_id).css('top');
            dik_top = parseInt(dik_top.replace('px',''));
            yat_left =$('#editor-canvas #'+editor_hedef_txt_id).css('left');
            yat_left = parseInt(yat_left.replace('px',''));
            if(dik_top>-1 ){
                if(dikey!=0){
                    $('#editor-canvas #'+editor_hedef_txt_id).css('top',dik_top+dikey);
                }
            }else{
                $('#editor-canvas #'+editor_hedef_txt_id).css('top',0);
            }
            if(yat_left>-1){
                $('#editor-canvas #'+editor_hedef_txt_id).css('left',yat_left+yatay);
            }else{
                $('#editor-canvas #'+editor_hedef_txt_id).css('left',0);
            }

        }, kaydirma_zamani);
    })

    //fare up olunca
    $('#editor-araclar').on('mouseup','.yon-dugmeleri',function () {
        window.clearInterval(intervalID);
        yeniKonumuKaydet();
        intervalID=0;
        konum_degisti = 0;
    })

    $('#editor-araclar').on('mouseout','.yon-dugmeleri',function () {
        if(intervalID>0){
            window.clearInterval(intervalID);
            yeniKonumuKaydet();
        }
        intervalID==0;
        konum_degisti = 0;
    })

    function yeniKonumuKaydet(){
        //orjinal içerikteki oranalr varklı tersine çevirelim
        tuval = '#editor-canvas';
        var CursorLayer_w_attr   = $(tuval).find('#CursorLayer').attr('width');
        var canvas_genisligi     = $(tuval).find('#CursorLayer').width();
        var oran_w               =  canvas_genisligi/CursorLayer_w_attr
        var CursorLayer_h_attr   = $(tuval).find('#CursorLayer').attr('height');
        var canvas_yuksekligi    = $(tuval).find('#CursorLayer').height();
        var oran_h               = canvas_yuksekligi/CursorLayer_h_attr
        //-----------------
        dik_top =$('#editor-canvas #'+editor_hedef_txt_id).css('top');
        dik_top = parseInt(dik_top.replace('px',''));
        yat_left =$('#editor-canvas #'+editor_hedef_txt_id).css('left');
        yat_left = parseInt(yat_left.replace('px',''));
        for (var k in editorIceriklerArr) {
            if (editorIceriklerArr.hasOwnProperty(k)) {
                icerik              = editorIceriklerArr[k];
                if(icerik.id==editor_hedef_txt_id){
                    if(icerik.bicim == 'duz'){
                        fontBoyuntunuHesapla(icerik);
                        if(icerik.fark!=undefined){
                            dik_top         = dik_top+icerik.fark/2
                        }
                        icerik.top      = dik_top/oran_h;
                        icerik.left     = yat_left/oran_w;
                    }else{
                        daireselYaziIcinfontBoyuntunuHesapla(icerik);
                        icerik.top     = dik_top/oran_h;
                        icerik.left    = yat_left/oran_w;
                    }
                }
            }
        }

        editorTuvalineCiz(editorIceriklerArr);
        $('#editor-canvas #'+editor_hedef_txt_id).css('border','#00FF00 solid 1px');
    }


    $('#editor-canvas').on('mouseup','.tuval-ogesi', function () {
        yeniKonumuKaydet();
    })
    $('#editor-canvas').on('mouseout','.tuval-ogesi', function () {
        if(konum_degisti){
            yeniKonumuKaydet();
        }
        konum_degisti = 0;
    })


    $('.editor-sifirla').click(function () {
        jQuery.each( onizlemeIceriklerArr, function( i, val ) {
            editorIceriklerArr[i] = jQuery.extend(true,{}, val);
        });
        editorTuvalineCiz(editorIceriklerArr);
    });

    $('.editor-kaydet').click(function () {
        onizlemeIceriklerArr = editorIceriklerArr.slice()
        for (var k in onizlemeIceriklerArr) {
            if (onizlemeIceriklerArr.hasOwnProperty(k)) {
                icerik              = onizlemeIceriklerArr[k];
                icerik.istemiyorum_chck       = "checked";
                //break;
            }
        }
        ciz();
    });


    //önceki ve sonraki font
    $('#editor-font-onceki').click(function () {
        aktif_font_index = $('#editor-font-listesi').prop('selectedIndex')
        if(aktif_font_index>0){
            $('#editor-font-listesi').prop('selectedIndex',aktif_font_index-1)
            $('#editor-font-listesi').trigger('change')
        }
    })

    $('#editor-font-sonraki').click(function () {
        font_sayisi = $('#editor-font-listesi > option').length;
        aktif_font_index = $('#editor-font-listesi').prop('selectedIndex')
        if(aktif_font_index<font_sayisi-1) {
            $('#editor-font-listesi').prop('selectedIndex', aktif_font_index + 1)
            $('#editor-font-listesi').trigger('change')
        }
    })

});

function editorTuvalineCiz(editorIceriklerArr){
    $('#editor-canvas').empty();
    $('#editor-canvas').append(canvasRender_onyuz(editorIceriklerArr,$('#tuval').width(),$('#tuval').height()));//burdaki tuvaller gereksiz gibi
    etiketBelirtecleriniOlustur(editorIceriklerArr,$('#editor-canvas'));
    $('#editor-canvas .tuval-ogesi').show();
    $('#editor-canvas .tuval-ogesi').draggable({
        containment: "#editor-canvas",
        scroll: false
    })
    $('#editor-canvas .resim_yer_tutucu').draggable('disable')
}

function hedefKutUdakiYaziyaGoreFontKutusunuYenile(icerik_text){
    $.each( editorIceriklerArr, function( key, value ) {
        if(value['id']==editor_hedef_txt_id){
            if(value['text'].length>0){
                /*if(icerik_text!=undefined){
                 $('#editor-font-listesi option').text(icerik_text)
                 }else{
                 $('#editor-font-listesi option').text(value['text'])
                 }*/
                $('#editor-font-listesi option[value='+ value['font_family'] +' ]').prop('selected', true)
                //$('#editor-font-listesi').css('font-family',value['font_family'])
            }
        }
    });
}

function fontListesiniYenidenAnlandir(){
    $('body .font_onyukleme').remove();
    $( "#editor-font-listesi option").each(function(index) {
        $( this ).text("Font - "+ index);
        // fontların önceden kullnılması iyi olur. yoksa etikleme gerekiyor
        this.item = $('<span class="font_onyukleme">font ailesi yükleme</span>');
        this.item.css({
            position: 'absolute',
            left: '-500px',
            fontSize:'20px',
            fontFamily:$( this ).css('font-family'),
            top: (25*index)+'px'
        });
        $('body').append(this.item);
        $( this ).css('font-family','')
    });
}

////////////////////////////////////////////////////// ÖNYÜZDEEEİ RNDER BURAYA TAŞINDAI BURDAKİ OLMUYOR RENDER ///////////////////////////////////////
function canvasRender_onyuz(iceriklerArr,genislik,yukseklik){
    var canvas = document.createElement('canvas');
    canvas.id     = "CursorLayer";
    if(iceriklerArr[0].tur=='zemin'){
        canvas.width  = iceriklerArr[0].width;
        canvas.height = iceriklerArr[0].height;
    }else{
        canvas.width  = genislik;
        canvas.height = yukseklik;
    }

    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // zeminden önce çizilmesi gereken varmı
    var zeminden_onceki_dolu_item_sayisi =0;
    var zeminden_sonraki_dolu_item_sayisi =0;
    for (var z_o_kontrol in iceriklerArr){
        if (iceriklerArr.hasOwnProperty(z_o_kontrol)) {
            var icerik = iceriklerArr[z_o_kontrol];
            if (icerik.tur == "resim_yer_tutucu") {
                if (typeof icerik.zeminin_ustunde != 'undefined') {
                    if (icerik.zeminin_ustunde == 0) {
                        if(typeof  icerik.src!= 'undefined'){
                            zeminden_onceki_dolu_item_sayisi++;
                        }
                    }else{
                        if(typeof icerik.src!= 'undefined'){
                            zeminden_sonraki_dolu_item_sayisi++;
                        }
                    }
                }
            }
        }
    }




    // -------------------------------------------ZEMİNDEN (altıntakiler) öncekileri çizilecek resim tutucular

    for (var z_o in iceriklerArr){
        if (iceriklerArr.hasOwnProperty(z_o)) {
            var icerik = iceriklerArr[z_o];
            if (icerik.tur == "resim_yer_tutucu") {
                if (typeof icerik.zeminin_ustunde != 'undefined') {
                    if (icerik.zeminin_ustunde == 0) {
                        var imageObj = new Image();
                        imageObj.onload = function (data) {
                            ctx.setTransform(1, 0, 0, 1, 0, 0);
                            ctx.save();
                            ctx.translate(data.target.icerik.left + data.target.icerik.width * .5, data.target.icerik.top + data.target.icerik.height * .5);
                            ctx.rotate(data.target.icerik.rotation);
                            ctx.drawImage(data.target, -data.target.icerik.width * .5, -data.target.icerik.height * .5);
                            console.log("Öncekiler yüklendi")
                            zeminiYukle();

                        }
                        imageObj.src = icerik.src;
                        imageObj.icerik = icerik;
                    }
                }
            }
        }
    }
    //---------------------------------------------------------

    // -------------------------------------------------------- ----------  ZEMİN
    var zemin_yuklendi = false;
    function zeminiYukle(){
        var icerik              = iceriklerArr[0];
        if(icerik.tur=='zemin'){
            var imageObj        = new Image();
            imageObj.onload     = function (data) {
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.save();
                ctx.drawImage(data.target, 0, 0);
                zemin_yuklendi = true;
                console.log("Zemin Yüklendi")
                zemindenSonrakiResimleriYukle();

                //eğer resimdek sonra dolu item yoksa textkutyazdir fonsiyonu çağrılmaz
                // o yüzden item yoksa çalışmalı
                if(zeminden_sonraki_dolu_item_sayisi==0){
                    txtKutulariyazalim();
                }
            }
            imageObj.src = icerik.src;
            imageObj.icerik= icerik;
        }
    }
    //alert(zeminden_onceki_item_sayisi)
    if(zeminden_onceki_dolu_item_sayisi==0){
        zeminiYukle();
    }
    //-----------------------------------------



    // ------------------------------------------------------ ZEMİNDEN (üstündekiler) sonra çizilecek resim tutucular
    function zemindenSonrakiResimleriYukle(){
        var sayac =0;
        var imgArray = new Array();
        for (var z_s in iceriklerArr){
            if (iceriklerArr.hasOwnProperty(z_s)) {
                var icerik = iceriklerArr[z_s];
                if (icerik.tur == "resim_yer_tutucu") {
                    if (typeof icerik.zeminin_ustunde != 'undefined') {
                        if (icerik.zeminin_ustunde == 1) {
                            imgArray[sayac] = new Image();
                            imgArray[sayac].onload = function (data) {
                                ctx.setTransform(1, 0, 0, 1, 0, 0);
                                ctx.save();
                                ctx.translate(data.target.icerik.left + data.target.icerik.width * .5, data.target.icerik.top + data.target.icerik.height * .5);
                                ctx.rotate(data.target.icerik.rotation);
                                ctx.drawImage(data.target, -data.target.icerik.width * .5, -data.target.icerik.height * .5);
                                console.log("Sonrakiler yüklendi")
                                txtKutulariyazalim();
                            }
                            imgArray[sayac].src = icerik.src;
                            imgArray[sayac].icerik = icerik;
                            sayac++;
                        }
                    }
                }
            }
        }
    }
    //---------------------------------------------------------




    // ---------------------yazıları yazalım --------------------------
    function  txtKutulariyazalim(){
        for (var k in iceriklerArr){
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.save();
            if (iceriklerArr.hasOwnProperty(k)) {
                var icerik = iceriklerArr[k];
                delete golgeParam;
                if(icerik.golge_stili){
                    golgeParam = cssParseEt(icerik.golge_stili);
                }
                if(icerik.tur=="txt_kutu"){
                    if(icerik.bicim=='duz'){
                        var $x              = 0;
                        var $y              = 0;
                        var font_style = icerik.font_style=='italic'?'italic':'';
                        var font_weight = icerik.font_weight=='bold'?'bold':'';
                        //var text_decoration = icerik.text_decoration=='underline'?'underline':'';
                        ctx.font            = font_style+' '+font_weight+' '+icerik.font_size+"px " + icerik.font_family;
                        hizalama_payi       = 0;
                        if(icerik.text_align=='center'){
                            ctx.textAlign   = icerik.text_align;
                            $x              = 0;
                            $y              = -icerik.font_size*.22;
                            hizalama_payi   =icerik.width *.5;
                            ctx.translate(icerik.left+hizalama_payi,icerik.top);
                        }else if(icerik.text_align=='left'){
                            ctx.textAlign   = icerik.text_align;
                            $x              = -icerik.width*0.5;
                            $y              = -icerik.font_size*.22;
                            hizalama_payi   = icerik.width *.5;
                            ctx.translate(icerik.left+hizalama_payi,icerik.top);
                        }else if(icerik.text_align=='right'){
                            ctx.textAlign   = icerik.text_align;
                            $x              = icerik.width*0.5;
                            $y              = -icerik.font_size*.22;
                            hizalama_payi   = icerik.width *.5;
                            ctx.translate(icerik.left+hizalama_payi,icerik.top);
                        }
                        ctx.rotate(icerik.rotation);
                        ctx.lineWidth =0.01;
                        ctx.strokeStyle ='';
                        ctx.lineJoin="round";
                        if(icerik.stroke_size>0){
                            ctx.lineWidth   = icerik.stroke_size;
                            ctx.strokeStyle = icerik.stroke_color;
                        }
                        ctx.strokeText(icerik.text,$x,($y+parseInt(icerik.font_size)));
                        if(typeof golgeParam!=="undefined"){
                            ctx.shadowOffsetY   =
                                golgeParam[0]*Math.sin(icerik.rotation) + golgeParam[1]*Math.cos(icerik.rotation);
                            ctx.shadowOffsetX   =
                                golgeParam[0]*Math.cos(icerik.rotation) - golgeParam[1]*Math.sin(icerik.rotation);
                            ctx.shadowBlur      = golgeParam[2];
                            ctx.shadowColor     = golgeParam[3];
                        }
                        ctx.fillStyle           = icerik.color;
                        ctx.fillText(icerik.text,$x,($y+parseInt(icerik.font_size)));
                    }else{
                        // ----------------------------------------------------------DAİRESEL ETİkET KUTULARI
                        var img                 = getCircularText(icerik);
                        ctx.drawImage(img,icerik.left,icerik.top);
                    }
                }
            }
            ctx.restore();
        }
        filigranlariOlustur();
    }
    // ---------------------yazıları yazalım --SON------------------------



    //---------------------------------------FİLİGRANLARI OLUŞTUR --------------------
    function filigranlariOlustur(){
        var sayac =0;
        var imgArray = new Array();
        for (var z_s in iceriklerArr){
            if (iceriklerArr.hasOwnProperty(z_s)) {
                var icerik = iceriklerArr[z_s];
                if (icerik.tur == "filigran") {
                    imgArray[sayac] = new Image();
                    imgArray[sayac].onload = function (data) {
                        ctx.setTransform(1, 0, 0, 1, 0, 0);
                        ctx.save();
                        ctx.translate(data.target.icerik.left + data.target.icerik.width * .5, data.target.icerik.top + data.target.icerik.height * .5);
                        ctx.rotate(data.target.icerik.rotation);
                        ctx.drawImage(data.target, -data.target.icerik.width * .5, -data.target.icerik.height * .5);
                        console.log("filigran yüklendi")
                    }
                    imgArray[sayac].src = 'http://tasarimabasla.com'+icerik.url;
                    imgArray[sayac].icerik = icerik;
                    sayac++;
                }

                if (iceriklerArr.hasOwnProperty(z_s)) {
                    var icerik = iceriklerArr[z_s];
                    if (icerik.tur == "kategori_logo") {
                        imgArray[sayac] = new Image();
                        imgArray[sayac].onload = function (data) {
                            ctx.setTransform(1, 0, 0, 1, 0, 0);
                            ctx.save();
                            ctx.translate(data.target.icerik.left + data.target.icerik.width * .5, data.target.icerik.top + data.target.icerik.height * .5);
                            ctx.rotate(data.target.icerik.rotation);
                            ctx.drawImage(data.target, -data.target.icerik.width * .5, -data.target.icerik.height * .5,icerik.width,icerik.height);
                            console.log("kategori_logo yüklendi")
                        }
                        imgArray[sayac].src = 'http://tasarimabasla.com'+icerik.url;
                        imgArray[sayac].icerik = icerik;
                        sayac++;
                    }
                }
            }
        }
    }





    return canvas;
}