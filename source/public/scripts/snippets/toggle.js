var Toggle = {
  height: function(id, handler){
    var ele = $(id);

    if(ele.style.height != auto)
      ele.style.height = 'auto';
    else
      ele.style.height = '0px';

    handler && handler.call()
  },

  display: function(id, handler, display){
    var ele = $(id);
    var display = display || 'block';

    if(ele.style.display != display)
      ele.style.display = display;
    else
      ele.style.display = 'none';

    handler && handler.call()
  }
};
