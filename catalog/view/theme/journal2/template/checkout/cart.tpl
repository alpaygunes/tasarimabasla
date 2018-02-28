<?php echo $header; ?>
<div id="container" class="container j-container">
  <ul class="breadcrumb">
    <?php foreach ($breadcrumbs as $breadcrumb) { ?>
    <li><a href="<?php echo $breadcrumb['href']; ?>"><?php echo $breadcrumb['text']; ?></a></li>
    <?php } ?>
  </ul>
  <?php if ($attention) { ?>
  <div class="alert alert-info information"><i class="fa fa-info-circle"></i> <?php echo $attention; ?>
    <button type="button" class="close" data-dismiss="alert">&times;</button>
  </div>
  <?php } ?>
  <?php if ($success) { ?>
  <div class="alert alert-success success"><i class="fa fa-check-circle"></i> <?php echo $success; ?>
    <button type="button" class="close" data-dismiss="alert">&times;</button>
  </div>
  <?php } ?>
  <?php if ($error_warning) { ?>
  <div class="alert alert-danger warning"><i class="fa fa-exclamation-circle"></i> <?php echo $error_warning; ?>
    <button type="button" class="close" data-dismiss="alert">&times;</button>
  </div>
  <?php } ?>
  <div class="row"><?php echo $column_left; ?><?php echo $column_right; ?>
    <?php if ($column_left && $column_right) { ?>
    <?php $class = 'col-sm-6'; ?>
    <?php } elseif ($column_left || $column_right) { ?>
    <?php $class = 'col-sm-9'; ?>
    <?php } else { ?>
    <?php $class = 'col-sm-12'; ?>
    <?php } ?>
    <div id="content" class="<?php echo $class; ?> sc-page">
      <h1 class="heading-title"><?php echo $heading_title; ?>
        <?php if ($weight) { ?>
        &nbsp;(<?php echo $weight; ?>)
        <?php } ?>
      </h1>
      <?php echo $content_top; ?>
      <form action="<?php echo $action; ?>" method="post" enctype="multipart/form-data">
        <div class="table-responsive cart-info">
          <table class="table table-bordered">
            <thead>
              <tr>
                <td class="text-center image"><?php echo $column_image; ?></td>
                <td class="text-left name"><?php echo $column_name; ?></td>
                <td class="text-left model"><?php echo $column_model; ?></td>
                <td class="text-left quantity"><?php echo $column_quantity; ?></td>
                <td class="text-right price"><?php echo $column_price; ?></td>
                <td class="text-right total"><?php echo $column_total; ?></td>
              </tr>
            </thead>
            <tbody>
              <?php foreach ($products as $product) { ?>
              <tr>
                <!--          -------------------- alpaygunes ---------
                              aşağıdaki satıra sadece eklendi ---->
                <td class="text-center tasarim-onizleme"
                    orjinal_adres="<?php echo $product['href']; ?>"
                    onizleme_link="<?php echo $product['onizleme_href'];?>"><?php if ($product['thumb']) { ?>
                  <a href="<?php echo $product['href']; ?>"><img src="<?php echo $product['thumb']; ?>" alt="<?php echo $product['name']; ?>" title="<?php echo $product['name']; ?>" class="img-thumbnail" /></a>
                  <?php } ?></td>
                <td class="text-left name"><a href="<?php echo $product['href']; ?>"><?php echo $product['name']; ?></a>
                  <?php if (!$product['stock']) { ?>
                  <span class="text-danger">***</span>
                  <?php } ?>
                  <?php if ($product['option']) { ?>
                  <?php foreach ($product['option'] as $option) { ?>
                  <br />
                  <small><?php echo $option['name']; ?>: <?php echo $option['value']; ?></small>
                  <?php } ?>
                  <?php } ?>
                  <?php if ($product['reward']) { ?>
                  <br />
                  <small><?php echo $product['reward']; ?></small>
                  <?php } ?>
                  <?php if ($product['recurring']) { ?>
                  <br />
                  <span class="label label-info"><?php echo $text_recurring_item; ?></span> <small><?php echo $product['recurring']; ?></small>
                  <?php } ?></td>
                <td class="text-left model"><?php echo $product['model']; ?></td>
                <td class="text-left quantity"><div class="input-group btn-block" style="max-width: 200px;">
                    <input type="text" name="quantity[<?php echo $product[version_compare(VERSION, '2.1', '<') ? 'key' : 'cart_id']; ?>]" value="<?php echo $product['quantity']; ?>" size="1" class="form-control" />
                    <span class="input-group-btn">
                    <button type="submit" data-toggle="tooltip" title="<?php echo $button_update; ?>" class="btn btn-primary"><i class="fa fa-refresh"></i></button>
                    <button type="button" data-toggle="tooltip" title="<?php echo $button_remove; ?>" class="btn btn-danger" onclick="cart.remove('<?php echo $product[version_compare(VERSION, '2.1', '<') ? 'key' : 'cart_id']; ?>');"><i class="fa fa-times-circle"></i></button></span></div></td>
                <td class="text-right price"><?php echo $product['price']; ?></td>
                <td class="text-right total"><?php echo $product['total']; ?></td>
              </tr>
              <?php } ?>
              <?php foreach ($vouchers as $vouchers) { ?>
              <tr>
                <td></td>
                <td class="text-left"><?php echo $vouchers['description']; ?></td>
                <td class="text-left"></td>
                <td class="text-left"><div class="input-group btn-block" style="max-width: 200px;">
                    <input type="text" name="" value="1" size="1" disabled="disabled" class="form-control" />
                    <span class="input-group-btn"><button type="button" data-toggle="tooltip" title="<?php echo $button_remove; ?>" class="btn btn-danger" onclick="voucher.remove('<?php echo $vouchers[version_compare(VERSION, '2.1', '<') ? 'key' : 'cart_id']; ?>]; ?>');"><i class="fa fa-times-circle"></i></button></span></div></td>
                <td class="text-right"><?php echo $vouchers['amount']; ?></td>
                <td class="text-right"><?php echo $vouchers['amount']; ?></td>
              </tr>
              <?php } ?>
            </tbody>
          </table>
        </div>
      </form>
      <?php if ($coupon || $voucher || $reward || $shipping) { ?>
      <div class="action-area">
        <h3><?php echo $text_next; ?></h3>
        <p><?php echo $text_next_choice; ?></p>
        <div class="panel-group" id="accordion"><?php echo $coupon; ?><?php echo $voucher; ?><?php echo $reward; ?><?php echo $shipping; ?></div>
        <?php } ?>
        <div class="row">
          <div class="col-sm-4 col-sm-offset-8 cart-total">
            <table class="table table-bordered" id="total">
              <?php foreach ($totals as $total) { ?>
              <tr>
                <td class="text-right right"><strong><?php echo $total['title']; ?>:</strong></td>
                <td class="text-right right"><?php echo $total['text']; ?></td>
              </tr>
              <?php } ?>
            </table>
          </div>
        </div>
        <div class="buttons">
          <div class="pull-left"><a href="<?php echo $continue; ?>" class="btn btn-default button"><?php echo $button_shopping; ?></a></div>
          <div class="pull-right"><a href="<?php echo $checkout; ?>" class="btn btn-primary button"><?php echo $button_checkout; ?></a></div>
        </div>
      </div>
      <?php echo $content_bottom; ?></div>
    </div>
</div>


<!-------------------------------------------alpaygunes ---------------------------------->
<!--------------------------- müşteri tasarımıyla ilgili tüm js kodları bu sayfada --------------->
<style>
  #tasarim-onizleme a{
    cursor: pointer!important;
  }
</style>

<script language="JavaScript">
  var onizleme_link;
  $(document).ready(function () {
    //hersatırda gözüken küçük thumnail resimleri derler
    kucukResimleriDerle();

    $('.tasarim-onizleme a').removeAttr('href');
    $('.tasarim-onizleme').click(function () {
      onizleme_link = $(this).attr('onizleme_link');
      $('#onizleme-modal').modal('show');
      $('#loader').show();
      $('#onilzeme-body').empty();
      var obj = $(this);
      $.ajax({
        type: "POST",
        url: onizleme_link,
        success: function(msg) {
           
          if(msg!=null){
            var iceriklerArr = JSON.parse(msg);
            if(iceriklerArr.length){
              resmiDerle(iceriklerArr);
            }else{
              $('#onizleme-modal').modal('toggle');
              window.location.href = obj.attr("orjinal_adres");
            }
          }else{
            $('#onizleme-modal').modal('toggle');
            window.location.href = obj.attr("orjinal_adres");
          }

        },
        error: function(msg) {
          $('#onizleme-modal').modal('toggle');
          window.location.href = obj.attr("orjinal_adres");
        }
      });
    })
  })

  function resmiDerle(iceriklerArr){
    $('#onilzeme-body').empty();
    $('#onilzeme-body').append(canvasRender(iceriklerArr,$('#onilzeme-body').width(),$('#onilzeme-body').height(),sepet_icin=1));
    $('#loader').hide();
    $('#onilzeme-body').find('canvas').css('width','95%')
  }

  function kucukResimleriDerle(){
    $('.tasarim-onizleme').each(function (index) {
      var onizleme_link = $(this).attr('onizleme_link');
      var kucukresim_a = $(this).find('a');
      kucukresim_a.append('<i class=\"fa fa-spinner fa-pulse fa-5x fa-fw\"></i>')
      $.ajax({
        type: "POST",
        url: onizleme_link,
        success: function(msg) {
          try{
            var iceriklerArr = JSON.parse(msg);
            if(iceriklerArr.length){
              kucukResimeYerlestir(iceriklerArr,kucukresim_a);
            }else{
              kucukresim_a.find('i').remove();
            }
          }catch(err){
            kucukresim_a.find('i').remove();
          }

        },
        error: function(msg) {
          kucukresim_a.find('.fa-spinner').remove();
        }
      });
    })
  }

  function kucukResimeYerlestir(iceriklerArr,kucukresim_a){
    var canvas      = canvasRender(iceriklerArr,0,0,sepet_icin=1)
    kucukresim_a.empty();
    kucukresim_a.append(canvas)
    kucukresim_a.find('canvas').css('width','50px')
  }
</script>










<div class="modal fade" tabindex="-1" role="dialog" id="onizleme-modal" aria-labelledby="gridSystemModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content" style="width: 90%; max-width: 450px;min-height: 300px">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="gridSystemModalLabel">TASARIMINIZ BU ŞEKİLDE GÖZÜKECEK</h4>
      </div>

      <div id="loader" style="display: none;
                              width: 200px;
                              height: 150px;
                              top:30%;
                              left: 25%;
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
                >İşlem devam <br> ediyor</div>
        <i class="fa fa-spinner fa-pulse fa-5x fa-fw"
           style="
                     font-size: 150px!important;
                     position: absolute">
        </i>
      </div>


      <div class="modal-body" id="onilzeme-body">
        <br><br><br><br><br><br><br><br>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Kapat</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->


<?php echo $footer; ?>

<style>


  #onilzeme-body{
    display: block;
    text-align:padding:0!important;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }


</style>