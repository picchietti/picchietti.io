window.addEventListener('load', function(){
  hearSkillsToggle();
  hearExperiencesToggle();
  hearAnchorClicks();
  hearStageBackClick();
}, false);

function hearSkillsToggle(){
  $('toggle-skills').addEventListener('click', function(){
    Loader.load("/scripts/snippets/toggle.js", function(){
      Toggle.display('other-skills');

      var button = $('toggle-skills');
      var box = $('other-skills');
      if(box.style.display != 'none')
        button.innerHTML = '(4) Less';
      else
        button.innerHTML = '(4) More';
    });
  }, false);
}

function hearExperiencesToggle(){
  $('toggle-experiences').addEventListener('click', function(){
    Loader.load("/scripts/snippets/toggle.js", function(){
      Toggle.display('other-experiences');

      var button = $('toggle-experiences');
      var box = $('other-experiences');
      if(box.style.display != 'none')
        button.innerHTML = '(2) Less';
      else
        button.innerHTML = '(2) More';
    });
  }, false);
}

function hearAnchorClicks(){
  var anchors = document.getElementsByClassName('popup');
  for(var i=0, y=anchors.length;i<y;i++){
    anchors[i].addEventListener('click', function(e){
      e.preventDefault();
      Stage.toggle();
      Stage.load(this.href);
    }, false);
  }
}

var Stage = {
  toggle: function(){
    if($('paper').style.display != 'none')
      Stage.show();
    else
      Stage.hide();
  },
  show: function(){
    $('stage').style.display = 'block';
    $('paper').style.display = 'none';
  },
  hide: function(){
    $('paper').style.display = 'block';

    var stage = $('stage');
    stage.style.display = 'none';

    var item = stage.getElementsByClassName('item')[0];
    if(item != null)
      item.innerHTML = '';

    if(history.replaceState)
      history.replaceState('', document.title, window.location.pathname);
    else
      location.hash = '';
  },
  load: function(href){
    var ext = href.substring(href.lastIndexOf('.') + 1);
    var stage_item = $('stage').getElementsByClassName('item')[0];
    switch(ext){
      case 'png': case 'svg': case 'jpg': case 'gif':
        var image = document.createElement('img');
        image.src = href;
        stage_item.appendChild(image);
      break;
      case 'pdf':
        var pdf = document.createElement('iframe');
        pdf.src = href;
        stage_item.appendChild(pdf);
      break;
    }

    location.hash = href.replace(location.origin + '/', '');
  }
};

function hearStageBackClick(){
  $('stage').getElementsByClassName('back')[0].addEventListener('click', Stage.toggle, false);
}
