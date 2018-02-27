<script language="JavaScript">
    $(document).ready(function() {
        iceriklerArr = <?php if(isset($iceriklerArr)){echo $iceriklerArr;}else{echo "[]";}?>;
        cizilen_oge_sayaci = iceriklerArr.length;
        draw(iceriklerArr);
        $( '#arac-tablosu .btn' ).tooltip_tasarim({
            show: {
                effect: "slideDown",
                delay: 1
            }
        });
    });
</script>

<div class="tab-pane" id="tab-tasarim-secenekleri">
    <div class="kendin-tasarlar table-responsive">
        <table class="table table-striped table-bordered table-hover" id="tasarim-tablosu">
            <tr>
                <!--   ------------------------------------TUVAL --->
                <td id="sol-bolum">
                    <div id="tuval">
                        <!-- -------------------- tuval alanı ------------------------- -->
                    </div>
                </td>
                <!--   ------------------------------------ARAÇLAR --->
                <td id="sag-bolum">
                    <!--   ------------------------------------PANEL --->
                    <div class="bs-example">
                        <ul class="nav nav-tabs">
                            <li class="active"><a data-toggle="tab" href="#sectionA">Ekle</a></li>
                            <li><a data-toggle="tab" href="#sectionB">Düzenle</a></li>
                        </ul>
                        <!--   ------------------------------------PANEL 1  --->
                        <div class="tab-content">
                            <div id="sectionA" class="tab-pane fade in active">
                                <table id="arac-tablosu">
                                    <tr>
                                        <td class="kucuk-iconlar-satiri">
                                            <input type='file' id="imgInp" style="display: none"/>
                                            <div class="btn btn-primary btn-lg dugme"
                                                 id="resim-ekle"  title="Tasarım Resmi Ekle">
                                                <i class="fa fa-picture-o icon-picture"></i>
                                            </div>

                                            <div class="btn btn-primary btn-lg dugme"
                                                 id="resim-cercevesi-ekle"  title="Müşteri Resim Alanı">
                                                <i class="fa fa-th-large"></i>
                                            </div>

                                            <div class="btn btn-primary btn-lg dugme"
                                                 id="txt-kutu-ekle" title="Yazı Ekle">
                                                <i class="fa fa-font icon-font"></i>
                                            </div>

                                            <div class="btn btn-primary btn-lg dugme"
                                                 id="cs-txt-kutu-ekle" title="Çoksatırlı Yazı Ekle">
                                                <i class="fa  fa-ioxhost"></i>
                                            </div>

                                            <div class="btn btn-primary btn-lg dugme"
                                                 id="filigran-ekle" title="Filigran">
                                                <i class="fa fa-bookmark"></i>
                                            </div>

                                            <div class="btn btn-primary btn-lg dugme"
                                                 id="nesne-sil"  title="Sil">
                                                <i class="fa fa-trash-o"></i>
                                            </div>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="btn btn-primary btn-lg dugme kategori_logolari"
                                                 kategori_logosu="tasarim_musteri_resimleri/kategor1.png"
                                                 id="kategori-logo-ekle"
                                                 title="Kategori_adi_buraya_gelecek">
                                                <i class="fa fa-bookmark"></i> Kategori_adi Logosu
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <div class="input-group">
                                                <input type="text" id="urun-kodu" style="font-size: 16px;" class="form-control" placeholder="Ürün kodunu girin">
                                                <span class="input-group-btn">
                                                    <button id="tasarimi-getir" class="btn btn-secondary" type="button">Getir</button>
                                                </span>
                                            </div>
                                            <div class="label label-warning" style="font-size: 12px!important;width: 100px;display: none" id="arama-sonucu">

                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <!--   ------------------------------------PANEL 2  --->
                            <div id="sectionB" class="tab-pane fade">
                                <table class="table">
                                    <tr>
                                        <td>
                                            <div class="btn btn-primary btn-xs dugme"
                                                 id="txt-sola-hizala">
                                                <i class="fa fa-align-left icon-align-left"></i>
                                            </div>
                                            <div class="btn btn-primary  btn-xs dugme"
                                                 id="txt-ortaya-hizala">
                                                <i class="fa fa-align-center icon-align-center"></i>
                                            </div>
                                            <div class="btn btn-primary btn-xs dugme"
                                                 id="txt-saga-hizala">
                                                <i class="fa fa-align-right icon-align-right"></i>
                                            </div>
                                            <div class="btn btn-primary btn-xs dugme"
                                                 id="txt-font_style">
                                                <i class="fa  fa-italic"></i>
                                            </div>
                                            <div class="btn btn-primary btn-xs dugme"
                                                 id="txt-bold">
                                                <i class="fa  fa-bold"></i>
                                            </div>
                                            <div style="display: none" class="btn btn-primary btn-xs dugme"
                                                 id="txt-underline">
                                                <i class="fa  fa-underline"></i>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td id="zemin_ayar_td">
                                            <input type="checkbox"
                                                   id ="zeminin_ustunde_olsun"
                                                   value="zeminin_ustunde_olsun">
                                            <label for="zeminin_ustunde_olsun">Zeminin üstünde olsun</label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="checkbox" class="txt-araci"
                                                   id ="dairesel_yazi_olsun"
                                                   value="dairesel_text"> <span class="txt-araci">Dairesel yazı olsun</span>
                                            <table class="table txt-araci" id="dairesel_yazi_parametreleri" style="display: none">
                                                <tr>
                                                    <td>
                                                        Başlangıç açısı
                                                    </td>
                                                    <td width="100">
                                                        <input type="number" id="baslangic_acisi" class="form-control " value="0">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Dış Yüz
                                                    </td>
                                                    <td>
                                                        <input type="checkbox" id="halkanin_icine_yaz" class="form-control" checked>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <div class="input-group input-group-sm txt-araci">
                                                <span class="input-group-addon" id="sizing-addon3">Karater Limiti</span>
                                                <input type="number"
                                                       value="50"
                                                       id="karakter-limiti"
                                                       class="form-control">
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <div class="input-group input-group-sm txt-araci">
                                                <span class="input-group-addon" id="sizing-addon3">Font Türü</span>
                                                <select class="form-control input-sm" id="font-listesi">


												<option value="ALLEGRON" style="font-family: ALLEGRON;">ALLEGRON</option>
<option value="Oregano-Regular" style="font-family: Oregano-Regular;">Oregano-Regular</option>
												<option value="Oregano-Italic" style="font-family: Oregano-Italic;">Oregano-Italic</option>
												<option value="strawberry" style="font-family: strawberry;">strawberry</option>
<option value="BAZOOKA" style="font-family: BAZOOKA;">BAZOOKA</option>
<option value="Lobster" style="font-family: Lobster;">Lobster</option>
<option value="aa00912" style="font-family: aa00912;">aa00912</option>
<option value="aa00815" style="font-family: aa00815;">aa00815</option>
<option value="aa00619" style="font-family: aa00619;">aa00619</option>
<option value="aa00526" style="font-family: aa00526;">aa00526</option>
<option value="aa00616" style="font-family: aa00616;">00616</option>
<option value="taget" style="font-family: taget;">taget</option>
<option value="shyln" style="font-family: shyln;">shyln</option>
<option value="sagina" style="font-family: sagina;">sagina</option>
<option value="rakon" style="font-family: rakon;">rakon</option>
<option value="pirane" style="font-family: pirane;">pirane</option>
<option value="peheyele" style="font-family: peheyele;">peheyele</option>
<option value="pasion" style="font-family: pasion;">pasion</option>
<option value="nuptu" style="font-family: nuptu;">nuptu</option>
<option value="mury" style="font-family: mury;">mury</option>
<option value="lucian" style="font-family: lucian;">lucian</option>
<option value="linus" style="font-family: linus;">linus</option>
<option value="juliet" style="font-family: juliet;">juliet</option>
<option value="Jellyka" style="font-family: Jellyka;">Jellyka</option>
<option value="Gravura" style="font-family: Gravura;">Gravura</option>
<option value="flems" style="font-family: flems;">flems</option>
<option value="Filxgirl" style="font-family: Filxgirl;">Filxgirl</option>
<option value="Expo" style="font-family: Expo;">Expo</option>
<option value="Enviro" style="font-family: Enviro;">Enviro</option>
<option value="Brush455BT" style="font-family: Brush455BT;">Brush455BT</option>
<option value="BrockScript" style="font-family: BrockScript;">BrockScript</option>
<option value="blackjar" style="font-family: blackjar;">blackjar</option>
<option value="amozon" style="font-family: amozon;">amozon</option>
<option value="adine" style="font-family: adine;">adine</option>
<option value="Shojumaru-Regular" style="font-family: Shojumaru-Regular;">Shojumaru-Regular</option>
<option value="Blazed" style="font-family: Blazed;">Blazed</option>
<option value="AveFedan" style="font-family: AveFedan;">AveFedan</option>
<option value="Bloody-Stump" style="font-family: Bloody-Stump;">Bloody-Stump</option>
<option value="CapricaSansItalicPersonalUse" style="font-family: CapricaSansItalicPersonalUse;">CapricaSansItalicPersonalUse</option>
<option value="carolingia" style="font-family: carolingia;">carolingia</option>
<option value="segoepr" style="font-family: segoepr;">segoepr</option>
<option value="segoeprb" style="font-family: segoeprb;">segoeprb</option>
<option value="Snap" style="font-family: Snap;">Snap</option>
<option value="wds011402" style="font-family: wds011402;">wds011402</option>
<option value="ChokoPlain" style="font-family: ChokoPlain;">ChokoPlain</option>
<option value="KaushanScript-Regular" style="font-family: KaushanScript-Regular;">KaushanScript-Regular</option>
<option value="VictorianD" style="font-family: VictorianD;">VICTORIAND</option>
<option value="Gabrielle" style="font-family: Gabrielle;">Gabrielle</option>
<option value="AGENTORANGE" style="font-family: AGENTORANGE;">AGENTORANGE</option>
<option value="AKADORA" style="font-family: AKADORA;">AKADORA</option>
<option value="akaDylanCollage" style="font-family: akaDylanCollage;">akaDylanCollage</option>
 <option value="akaDylanOpen" style="font-family: akaDylanOpen;">akaDylanOpen</option>
<option value="akaDylanPlain" style="font-family: akaDylanPlain;">akaDylanPlain</option>
<option value="Androgyne_TB" style="font-family: Androgyne_TB;">Androgyne_TB</option>
<option value="arial" style="font-family: arial;">arial</option>
<option value="BairamIt" style="font-family: BairamIt;">BairamIt</option>
<option value="banffn" style="font-family: banffn;">banffn</option>
<option value="Beckasin" style="font-family: Beckasin;">Beckasin</option>
<option value="Bira_PERSONAL_USE_ONLY" style="font-family: Bira_PERSONAL_USE_ONLY;">Bira_PERSONAL_USE_ONLY</option>
<option value="Blazed" style="font-family: Blazed;">Blazed</option>
<option value="BlueStone" style="font-family: BlueStone;">BlueStone</option>
<option value="BRUSHSCN" style="font-family: BRUSHSCN;">BRUSHSCN</option>
<option value="CACTUS" style="font-family: CACTUS;">CACTUS</option>
<option value="Chunky" style="font-family: Chunky;">Chunky</option>
<option value="comic" style="font-family: comic;">comic</option>
<option value="cour" style="font-family: cour;">cour</option>
<option value="crashtestshadow" style="font-family: crashtestshadow;">crashtestshadow</option>
<option value="Chunky" style="font-family: Chunky;">DEFECAFO</option>
<option value="DorovarCarolus" style="font-family: DorovarCarolus;">DorovarCarolus</option>
<option value="DuvallTR" style="font-family: DuvallTR;">DuvallTR</option>
<option value="FAFERS" style="font-family: FAFERS;">FAFERS</option>
<option value="floralie" style="font-family: floralie;">floralie</option>
<option value="GeorginasHandTürkceFont" style="font-family: GeorginasHandTürkceFont;">GeorginasHandTürkceFont</option>
<option value="impact" style="font-family: impact;">impact</option>
<option value="JandaManateeBubble" style="font-family: JandaManateeBubble;">JandaManateeBubble</option>
<option value="KingthingsLupine" style="font-family: KingthingsLupine;">KingthingsLupine</option>
<option value="MISTRAL" style="font-family: MISTRAL;">MISTRAL</option>
<option value="mtcorsva" style="font-family: mtcorsva;">mtcorsva</option>
<option value="OndineD" style="font-family: OndineD;">OndineD</option>
<option value="PoetsenOne-Regular" style="font-family: PoetsenOne-Regular;">PoetsenOne-Regular</option>
<option value="tt0351m_" style="font-family: tt0351m_;">tt0351m_</option>
<option value="RoteFlora" style="font-family: RoteFlora;">RoteFlora</option>
<option value="ScriptMTBold" style="font-family: ScriptMTBold;">ScriptMTBold</option>
<option value="segoepr" style="font-family: segoepr;">segoepr</option>
<option value="SketchRockwell-Bold_TR_cok_AZ" style="font-family: SketchRockwell-Bold_TR_cok_AZ;">SketchRockwell-Bold_TR_cok_AZ</option>
<option value="TACOBOX" style="font-family: TACOBOX;">TACOBOX</option>
<option value="tahoma" style="font-family: tahoma;">tahoma</option>
<option value="THfontNormal" style="font-family: THfontNormal;">THfontNormal</option>
<option value="times" style="font-family: times;">times</option>
<option value="tt0037m_" style="font-family: tt0037m_;">tt0037m_</option>
<option value="verdana" style="font-family: verdana;">verdana</option>

</select>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>

                                            <div class="input-group input-group-sm txt-araci">
                                                <span class="input-group-addon" id="sizing-addon3">Font Boyutu</span>
                                                <select class="form-control input-sm" id="font-boyutu">
                                                    <option value="Times New Roman"
                                                            style="font-family: Times New Roman;">Font Boyutu
                                                    </option>
                                                    <?php
                                                        for($i=1;$i<=500;$i++){
                                                            echo  "<option value=\"$i".""."\">".$i."px </option>";
                                                        }
                                                    ?>
                                                </select>
                                            </div>

                                        </td>
                                    </tr>




                                    <tr>
                                        <td>
                                            <div class="input-group input-group-sm txt-araci">
                                                <span class="input-group-addon" id="sizing-addon3">Font Height</span>
                                                <select class="form-control input-sm" id="font-height">
                                                    <option value="Times New Roman"
                                                            style="font-family: Times New Roman;">Font Height
                                                    </option>
                                                    <?php
                                                        for($i=1;$i<=500;$i++){
                                                            echo  "<option value=\"$i".""."\">".$i."px </option>";
                                                    }
                                                    ?>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>






                                    <tr>
                                        <td>
                                            <div class="input-group input-group-sm txt-araci">
                                                <span class="input-group-addon" id="sizing-addon3">Font Rengi</span>
                                                <input type="text"
                                                       value="#000000"
                                                       id="font_rengi"
                                                       class="form-control renk_call_back"
                                                       placeholder="#000000"
                                                       aria-describedby="sizing-addon3">
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="input-group input-group-sm txt-araci">
                                                <span class="input-group-addon" id="sizing-addon3">Stroke Boyutu</span>
                                                <select class="form-control input-sm" id="stroke-boyutu">
                                                    </option>
                                                    <?php
                                                        for($s=0;$s<=10;$s=$s+.1){
                                                            echo  "<option value=\"$s".""."\">".$s."px </option>";
                                                        }
                                                    ?>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <div class="input-group input-group-sm txt-araci">
                                                <span class="input-group-addon" id="sizing-addon3">Stroke Rengi</span>
                                                <input type="text"
                                                       class="form-control renk_call_back"
                                                       id="stroke_rengi"
                                                       value="#ffffff"
                                                       placeholder="#000000" aria-describedby="sizing-addon3">
                                                <span id="cikti"></span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="input-group input-group-sm txt-araci">
                                                <span class="input-group-addon" id="sizing-addon3">Gölge</span>
                                                <input type ="text"
                                                       value="text-shadow: 0px 0px 0px rgba(255, 255, 255, 1);"
                                                       id="golge_stili"
                                                       class="form-control"
                                                       aria-describedby="sizing-addon3">
                                            </div>
                                            <a style="font-size: 9px" href="http://css3gen.com/text-shadow/" target="_blank" class="txt-araci">
                                                Görsel ayar yapmak için tıklayın
                                            </a>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td align="center">
                                            <div id="colorpicker"></div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </table>

<!--   bu değişkene icerikArr dizini atanacak. form produck_rofm.tpl  içinde. post edilince
        bude gönderilecek.
 -->
<input type="hidden" id="iceriklerArr" name="iceriklerArr">
    <div id="onizleme">Önizleme</div>
        <?php include("kendin_tasarla_onizleme.tpl");?>
    </div>
</div>





<!-- ///////////////////////////////////////////KATEGORİ LOGOLARININ SEÇİLECEĞİ///////////////////////////////////
///////////////////////////////////////////// MODAL//////////////////////////////////////////////////////////////// -->
<div class="modal fade" tabindex="-1" role="dialog" id="modal_kategori_logolari">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Logo Seçin</h4>
            </div>
            <div class="modal-body">
                <?php
                    $dizin  = "../tasarim_musteri_resimleri/kategori_logolari";
                    $images = glob($dizin.'/*.{jpeg,gif,png}', GLOB_BRACE);
                    //print_r($images);
                    foreach($images as $key=>$value){
                        $id = "logo"+$key;
                        echo "<img
                        class=\"kategori-logo-icon\"
                        id=\"$id\"
                        src=\"$value\">";
                    }
                ?>
                tıklanan resmin url sini
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Vazgeç</button>
                <button type="button" class="btn btn-primary" id ="moda-kategori-logosu-tamam">Ekle</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
