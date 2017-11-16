window.addEventListener('load', function(){
  hearSkillsToggle();
  hearExperiencesToggle();
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
